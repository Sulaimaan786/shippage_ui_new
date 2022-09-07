import { WholesalerMaster } from './../wholesaler-model';
import { WholesalerService } from './../wholesaler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';


@Component({
  selector: 'app-add-wholesaler',
  templateUrl: './add-wholesaler.component.html',
  styleUrls: ['./add-wholesaler.component.sass']
})
export class AddWholesalerComponent implements OnInit {

  submitted: boolean=false;
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  stateList =[];
  wholesalerMaster:WholesalerMaster;
  
  requestId: number;
  edit: boolean=false;
  constructor(private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private wholesalerService:WholesalerService,public commonService:CommonService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      wholesalerCode: [""],
      policyCode: ["", [Validators.required]],
      wholesalerName: ["", [Validators.required]],
      expiryPacket: [""],
       emailID: ["", [Validators.required]],
       allowOverride: [""],
       department: [""],
      street: [""],
      city: [""],
      state: [""],
      zipCode: [""],
      phoneNo: ["", [Validators.required]],
      tollFreeNo: [""],
      fax: [""],
      contact: ["", [Validators.required]],
    //  userName: this.tokenStorage.getUsername()
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
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
  if (this.docForm.valid) {
    this.wholesalerMaster = this.docForm.value;
    console.log(this.wholesalerMaster);
    this.wholesalerService.addWholesalerMaster(this.wholesalerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/wholesaler/ListWholesaler']);
  }
}

  fetchDetails(whoCode: any): void {
    this.httpService.get(this.wholesalerService.editWholesalerMaster+"?wholesalerId="+whoCode).subscribe((res: any)=> {
    

      this.docForm.patchValue({
        'wholesalerCode': res.wholesalerMasterBean.wholesalerCode,
        'policyCode': res.wholesalerMasterBean.policyCode,
        'wholesalerName': res.wholesalerMasterBean.wholesalerName,
        'expiryPacket': res.wholesalerMasterBean.expiryPacket,
        'emailID': res.wholesalerMasterBean.emailID,
        'allowOverride': res.wholesalerMasterBean.allowOverride,
        'department': res.wholesalerMasterBean. department,
        'street': res.wholesalerMasterBean.street,
        'city': res.wholesalerMasterBean.city,
        'state': res.wholesalerMasterBean.state,
        'zipCode': res.wholesalerMasterBean.zipCode,
        'phoneNo': res.wholesalerMasterBean.phoneNo,
        'tollFreeNo': res.wholesalerMasterBean.tollFreeNo,
        'fax': res.wholesalerMasterBean.fax,
        'contact': res.wholesalerMasterBean.contact,

     
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
    this.wholesalerMaster = this.docForm.value;
    this.wholesalerService.WholesalerMasterUpdate(this.wholesalerMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/wholesaler/ListWholesaler']);
    }
  }

  reset(){}

  
  onCancel(){
    this.router.navigate(['/setup/wholesaler/ListWholesaler']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
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
  
  keyContactName(event: any) {
    const pattern = /[A-Za-z ]/;
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
