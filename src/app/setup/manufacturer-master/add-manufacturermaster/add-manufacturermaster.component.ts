import { ManufacturerService } from './../manufacturer.service';
import { ManufacturerMaster } from './../manufacturer-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ManufacturerMasterResultBean } from '../manufacturer-result-bean';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-manufacturermaster',
  templateUrl: './add-manufacturermaster.component.html',
  styleUrls: ['./add-manufacturermaster.component.sass']
})
export class AddManufacturermasterComponent implements OnInit {


  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  stateList =[];
  manufacturerMaster:ManufacturerMaster;
  
  requestId: number;
  message:string;
  edit: boolean=false;
  submitted: boolean=false;
  error = "";
  constructor(private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private manufacturerService:ManufacturerService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute,public commonService:CommonService) {
    this.docForm = this.fb.group({
      manufacturerCode: [""],
      manufacturerName: ["", [Validators.required]],
      linkTo: ["", [Validators.required]],
      billTo: ["", [Validators.required]],
      returnService: ["", [Validators.required]],
      contact: ["", [Validators.required]],
       emailId: ["", [Validators.required]],
       departmentName: [""],
      streetName: [""],
      cityName: [""],
      stateName: [""],
      zipCode:[""],
      phoneNo: ["", [Validators.required]],
      tollFreeNo: [""],
      fax: [""],
      billingPreference: ["", [Validators.required]],
  //    useName: this.tokenStorage.getUsername()
     
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });

     this.httpService.get<any>(this.commonService.getStateDropdownList).subscribe(
      (data) => {
        this.stateList = data;

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

  }

  onSubmit() {
    this.submitted=true;
    
    if(this.docForm.valid){
      this.httpService.post<ManufacturerMasterResultBean>(this.manufacturerService.savemanufacturerMaster, this.docForm.value).subscribe(data => {
        console.log(data);
          if(data.success==true){
            this.showNotification(
              "snackbar-success",
              "User Added",
              "top",
              "right"
            );
            this.router.navigate(['/setup/manufacturer/listManufacturermaster']);

          }else
          {
            data.success===false
            // this.loading = false;
                  this.error = data.message;
                   console.log(data.message); 
            
          }
        },
        (err: HttpErrorResponse) => {
          
      }
      );
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill required details.",
        "top",
        "right"
      );
    }
    

  }


//   onSubmit() {
//   if (this.docForm.valid) {

//     this.manufacturerMaster = this.docForm.value;
//     console.log(this.manufacturerMaster);
//     this.manufacturerService.addmanufacturerMaster(this.manufacturerMaster);
   
//     this.showNotification(
//       "snackbar-success",
//       "Add Record Successfully...!!!",
//       "bottom",
//       "center"
//     );
    
//     this.router.navigate(['/setup/manufacturer/listManufacturermaster']);

//   }
// }

  fetchDetails(whoCode: any): void {
    this.httpService.get(this.manufacturerService.editmanufacturerMaster+"?manufacturerId="+whoCode).subscribe((res: any)=> {
    

      this.docForm.patchValue({
        'manufacturerCode': res.manufacturerMasterBean.manufacturerCode,
        'manufacturerName': res.manufacturerMasterBean.manufacturerName,
        'linkTo': res.manufacturerMasterBean.linkTo,
        'billTo': res.manufacturerMasterBean.billTo,
        'returnService': res.manufacturerMasterBean.returnService,
        'contact': res.manufacturerMasterBean.contact,
        'emailId': res.manufacturerMasterBean.emailId,
        'departmentName': res.manufacturerMasterBean. departmentName,
        'streetName': res.manufacturerMasterBean.streetName,
        'cityName': res.manufacturerMasterBean.cityName,
        'stateName': res.manufacturerMasterBean.stateName,
        'zipCode': res.manufacturerMasterBean.zipCode,
        'phoneNo': res.manufacturerMasterBean.phoneNo,
        'tollFreeNo': res.manufacturerMasterBean.tollFreeNo,
        'fax': res.manufacturerMasterBean.fax,
        'billingPreference': res.manufacturerMasterBean.billingPreference,
       
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){
    this.submitted=true;
    if (this.docForm.valid) {
    this.manufacturerMaster = this.docForm.value;
    this.manufacturerService.manufacturerMasterUpdate(this.manufacturerMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/manufacturer/listManufacturermaster']);

  }
  }
  returnPolicy() {
    this.router.navigate(['/setup/manufacturer/addManufacturerReturnPolicy/',this.requestId]);
  }

  reset(){}

  
  onCancel(){
    this.router.navigate(['/setup/manufacturer/listManufacturermaster']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  
  keyContactName(event: any) {
    const pattern = /[A-Za-z ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 
  
  keyPressEmail(event: any) {
    const pattern = /[A-Z,a-z 0-9. @]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  

  keyPressPhoneNo(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.phoneNo.length==3){
        this.docForm.patchValue({
          'phoneNo': this.docForm.value.phoneNo+'-'
        });
      }
      if(this.docForm.value.phoneNo.length==7){
        this.docForm.patchValue({
          'phoneNo': this.docForm.value.phoneNo+'-'
        });
      }
    }
  }

  keyPressFax(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.fax.length==3){
        this.docForm.patchValue({
          'fax': this.docForm.value.fax+'-'
        });
      }
      if(this.docForm.value.fax.length==7){
        this.docForm.patchValue({
          'fax': this.docForm.value.fax+'-'
        });
      }
    }
  }

}
