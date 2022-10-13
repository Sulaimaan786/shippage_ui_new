import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from "src/app/core/models/user";
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {serverLocations} from './serverLocations'
import { HttpServiceService } from 'src/app/auth/http-service.service';
import {NavItem} from 'src/app/layout/matdynamicmenu/nav-items';
import { map } from "rxjs/operators";
import { UsersMaster } from '../setup/users/users-model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dialogData: any;
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;
  constructor(private http: HttpClient,public serverURL: serverLocations,public httpService: HttpServiceService,) {
      this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

 private userObj = new User();

  loginUrl = `${this.serverURL.apiServerAddress}api/auth/signin`;
  signupUrl = `${this.serverURL.apiServerAddress}api/auth/signup`;
  getUserName = `${this.serverURL.apiServerAddress}api/auth/getUserName`;
  getFormPropertyMenuUrl = `${this.serverURL.apiServerAddress}api/auth/formProperty/getFormProperty`;
  insertCusMaster = `${this.serverURL.apiServerAddress}api/customerMaster/save`;
  validateOtpUrl =  `${this.serverURL.apiServerAddress}api/auth/validateOtp`;
  resendOtpUrl =  `${this.serverURL.apiServerAddress}api/auth/resendOtpvalidate`;
  forgotPasswordUrl =  `${this.serverURL.apiServerAddress}api/auth/forgotPassword`;
  public saveUrl = `${this.serverURL.apiServerAddress}api/auth/app/userMaster/save`;
  public validateUserNameUrl = `${this.serverURL.apiServerAddress}api/auth/app/userMaster/validateUnique`;
  public validateEmailUrl = `${this.serverURL.apiServerAddress}api/auth/app/userMaster/validateUniqueEmail`;

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return  this.http
      .post<JwtResponse>(this.loginUrl, credentials)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user)
          localStorage.setItem("currentUser", JSON.stringify(user));

         // let response ={};
          this.userObj['username'] = user.empId;
          this.userObj['token'] = user.accessToken;
          this.userObj['roles'] = user.roles;
          this.userObj["img"] = this.serverURL.apiServerAddress + user.file;
          this.userObj["defaultRoleId"] = user.defaultRoleId;
          this.userObj["companyCode"] = user.companyCode;
          this.userObj['firstNameLastName'] = user.firstNameLastName;
          this.userObj['pharmaciesType'] = user.pharmaciesType;
          console.log(this.userObj);
          this.currentUserSubject.next(this.userObj);
          return user;
        })
      );
    //return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  getUserName1(emailId : string){
       return this.httpService.get(this.getUserName + '?getUserName=' + emailId);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getFormPropertyMenu(userId: string){
   // return this.http.post<NavItem>(this.getFormPropertyMenuUrl, userInfo);
    return this.httpService.get<NavItem>(this.getFormPropertyMenuUrl + '?roleId=' + userId);
  }

  cusMaster(cusMasterData : any){
    return this.http.post(this.insertCusMaster,cusMasterData, httpOptions);
  }

  // salesCallEntry(salesEntryData : any){
  //   return this.http.post(this.insertSalesEntry,salesEntryData, httpOptions);
  // }

  attemptOtpValidation(otpInfo: AuthLoginInfo): Observable<any> {
    return  this.http.post<any>(this.validateOtpUrl, otpInfo);
  }

  resendOtp(otpInfo: AuthLoginInfo): Observable<any> {
    return  this.http.post<any>(this.resendOtpUrl, otpInfo);
  }

  forgotPasswordService(otpInfo: AuthLoginInfo): Observable<any> {
    return  this.http.post<any>(this.forgotPasswordUrl, otpInfo);
  }
  addCustomerMaster(customerMaster: UsersMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<UsersMaster>(this.saveUrl, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

}

