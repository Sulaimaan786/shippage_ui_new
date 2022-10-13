import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { UsersResultBean } from "src/app/setup/users/users-result-bean";
import { AuthService } from "src/app/auth/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  error = "";
  errorMessage = '';
  isSignUpFailed = false;
  oldPwd:boolean=false;



  // docForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpService: HttpServiceService,public router: Router,private authService: AuthService
  ) {
    this.authForm = this.formBuilder.group({
      firstName: [""],
      emailId: [""],
      mobileNo: [""],
      password: [""]
      
    });
  }
  ngOnInit() {
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }

  validateUserName(event){
    this.httpService.get<any>(this.authService.validateUserNameUrl+ "?tableName=" +"user_details"+"&columnName="+"first_name"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.authForm.controls['firstName'].setErrors({ oldPwd: true });
      }else{
        this.authForm.controls['firstName'].setErrors(null);
      }
    });
  }

  validateEmail(event){
    this.httpService.get<any>(this.authService.validateEmailUrl+ "?tableName=" +"user_details"+"&columnName="+"email_id"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.authForm.controls['emailId'].setErrors({ emailPwd: true });
      }else{
        this.authForm.controls['emailId'].setErrors(null);
      }
    });
  }
  onSubmit() {
    this.submitted=true;
    // console.log("Form Value", this.authForm.value);
    if(this.authForm.valid){
      this.httpService.post<UsersResultBean>(this.authService.saveUrl, this.authForm.value).subscribe(data => {
        console.log(data);
          if(data.success){
            this.router.navigate(['instantRates/shipment-mode']);
          }else{
            this.isSignUpFailed = true;
          }
        },
        (err: HttpErrorResponse) => {
          this.isSignUpFailed = true;
      }
      );
    }else{

      this.error = "Invalid OTP";
    }
    

  }
}
