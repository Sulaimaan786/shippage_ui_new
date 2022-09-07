import { WholesalerService } from './../../wholesaler/wholesaler.service';
import { FileUploadService } from './../../../files/file-upload/file-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CompanyMasterService } from './../company-master.service';
import { CompanyMaster } from './../company-model';

import { TokenStorageService } from 'src/app/auth/token-storage.service';

import { CommonService } from 'src/app/common-service/common.service';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-add-company-master',
  templateUrl: './add-company-master.component.html',
  styleUrls: ['./add-company-master.component.sass']
})
export class AddCompanyMasterComponent implements OnInit {
  // companyAuthorizedClassesForm: FormGroup;
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  stateList =[];
  wholesalerList=[];
  companyFacilityTypeList = [ {id: '1', text: 'Hospital'},{id: '2', text: 'Retail'},{id: '3', text: 'Wholesaler'}];
  invoiceOptionsList = [ {id: 1, text: 'CPP'},{id: 2, text: 'OPP'},{id: 3, text: 'DPP'},{id: 4, text: 'Destruction'}];

  companyMaster:CompanyMaster;
  
  requestId: number;
  edit: boolean=false;
  submitted: boolean=false;
  // constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
  //   private httpService: HttpServiceService
  
  constructor(private wholesalerService:WholesalerService,public datepipe: DatePipe,private fb: FormBuilder,private authService: AuthService,public router: Router,private tokenStorage: TokenStorageService,
    private httpService: HttpServiceService
    ,private snackBar: MatSnackBar, public commonService:CommonService, public route: ActivatedRoute,private companyMasterService:CompanyMasterService) {
    this.docForm = this.fb.group({
      wholesalerCode: ["", [Validators.required]],
      wholesalerPolicyCode: ["", [Validators.required]],
      wholesalerName: ["", [Validators.required]],
      wholesalerExpiryPacket: [""],
      wholesalerEmailID: [""],
      wholesalerAllowOverride: [""],
      wholesalerDepartment: [""],
      wholesalerStreet:  [""],
      wholesalerCity:  [""],
      wholesalerState:  [""],
      wholesalerZipCode:  [""],
      wholesalerPhoneNo: ["", [Validators.required]],
      wholesalerTollFreeNo: [""],
      wholesalerFax: [""],
      wholesalerPhone: ["", [Validators.required]],
  
      companyCode: [""],
companyName:["", [Validators.required]],
companyDba:[""],
companyStreet:["", [Validators.required]],
companyCity:["", [Validators.required]],
companyState:["", [Validators.required]],
companyPincode:["", [Validators.required]],
companyPhone:["", [Validators.required]],
companyFax:["", [Validators.required]],
companyContact:["", [Validators.required]],
companyEmailID:["", [Validators.required]],

//authorizedClasses:[""],


companyFacilityType:["", [Validators.required]],

defNumber: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{7}')])],
defExpirationDate:["", [Validators.required]],

issuesCreditsName:["", [Validators.required]],

issuesCreditsStreet:["", [Validators.required]],
issuesCreditsCity:["", [Validators.required]],
issuesCreditsState:["", [Validators.required]],
issuesCreditsZipCode:["", [Validators.required]],
issuesCreditsPhone:["", [Validators.required]],

generalInfroWacAwapMyprice:["", [Validators.required]],
generalInfroWacAwapPer:[""],

myWholesalerPolicyType:["", [Validators.required]],
myWholesalerPolicyMonths:[""],
cppOption:false,
cppDirect:[""],
cppBatch:[""],

oppOption:false,
oppDirect:[""],
oppBatch:[""],

dppOption:false,
dppReturnFee:[""],

destructionOption:false,

invoiceOptions:["", [Validators.required]],

    });

  
    // this.companyAuthorizedClassesForm = this.fb.group({
    //   companyAuthorizedClasses2: false,
    //   companyAuthorizedClasses2N: false,
    //   companyAuthorizedClasses3: false,
    //   companyAuthorizedClasses3N: false,
    //   companyAuthorizedClasses4: false,
    //   companyAuthorizedClasses5: false,
    // });
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

      this.httpService.get<any>(this.commonService.getWholesalerDropdownList).subscribe(
        (data) => {
          this.wholesalerList = data;
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );

  }
  onSubmit() {
    this.submitted=true;
    if (this.docForm.valid) {
    //   For Authorized Classes temp commend by gokul
    // let authorizedClassesCommaSeparate='';
    // if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2){
    //   authorizedClassesCommaSeparate +='2,';
    // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2N){
    //   authorizedClassesCommaSeparate +='2N,';
    // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3){
    //   authorizedClassesCommaSeparate +='3,';
    // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3N){
    //   authorizedClassesCommaSeparate +='3N,';
    // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses4){
    //   authorizedClassesCommaSeparate +='4,';
    // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses5){
    //   authorizedClassesCommaSeparate +='5';
    // }

  this.docForm.patchValue({
   // 'authorizedClasses': authorizedClassesCommaSeparate,
    'defExpirationDate': this.datepipe.transform(this.docForm.value.defExpirationDate, 'yyyy-MM-dd')
  });
 
    this.companyMaster = this.docForm.value;
    console.log(this.companyMaster);
    
    this.companyMasterService.addCompanyMaster(this.companyMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/instantRates/welcome-page']);
  }
  }
  fetchDetails(cusCode: any): void {
    this.httpService.get(this.companyMasterService.editCompanyMaster+"?company="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'wholesalerCode' : res.companyMaster.wholesalerCode,
        'wholesalerPolicyCode' : res.companyMaster.wholesalerPolicyCode,
        'wholesalerName' : res.companyMaster.wholesalerName,
        'wholesalerExpiryPacket' : res.companyMaster.wholesalerExpiryPacket,
        'wholesalerEmailID' : res.companyMaster.wholesalerEmailID,
        'wholesalerAllowOverride' : res.companyMaster.wholesalerAllowOverride,
        'wholesalerDepartment' : res.companyMaster.wholesalerDepartment,
        'wholesalerStreet' : res.companyMaster.wholesalerStreet,
        'wholesalerCity' : res.companyMaster.wholesalerCity,
        'wholesalerState' : res.companyMaster.wholesalerState,
        'wholesalerZipCode' : res.companyMaster.wholesalerZipCode,
        'wholesalerPhoneNo' : res.companyMaster.wholesalerPhoneNo,
        'wholesalerTollFreeNo' : res.companyMaster.wholesalerTollFreeNo,
        'wholesalerFax' : res.companyMaster.wholesalerFax,
        'wholesalerPhone' : res.companyMaster.wholesalerPhone,
        
        'companyCode': res.companyMaster.companyCode,
        'companyName': res.companyMaster.companyName,
        'companyDba': res.companyMaster.companyDba,
        'companyStreet': res.companyMaster.companyStreet,
        'companyCity': res.companyMaster.companyCity,
        'companyState': res.companyMaster.companyState,
        'companyPincode': res.companyMaster.companyPincode,
        'companyPhone': res.companyMaster.companyPhone,
        'companyFax': res.companyMaster.companyFax,
        'companyContact': res.companyMaster.companyContact,
        'companyEmailID': res.companyMaster.companyEmailID,
        'companyFacilityType': res.companyMaster.companyFacilityType,
        
        'defNumber': res.companyMaster.defNumber,
        'defExpirationDate': res.companyMaster.defExpirationDate,
        
        'issuesCreditsName': res.companyMaster.issuesCreditsName,
        
        'issuesCreditsStreet': res.companyMaster.issuesCreditsStreet,
        'issuesCreditsCity': res.companyMaster.issuesCreditsCity,
        'issuesCreditsState': res.companyMaster.issuesCreditsState,
        'issuesCreditsZipCode': res.companyMaster.issuesCreditsZipCode,
        'issuesCreditsPhone': res.companyMaster.issuesCreditsPhone,
        
        'generalInfroWacAwapMyprice': res.companyMaster.generalInfroWacAwapMyprice,
        'generalInfroWacAwapPer':res.companyMaster.generalInfroWacAwapPer,
        
        'myWholesalerPolicyType': res.companyMaster.myWholesalerPolicyType.toString(),
        'myWholesalerPolicyMonths':res.companyMaster.myWholesalerPolicyMonths,
       
        'cppOption':this.getBoolean(res.companyMaster.cppOption),
'cppDirect':res.companyMaster.cppDirect,
'cppBatch':res.companyMaster.cppBatch,

'oppOption':this.getBoolean(res.companyMaster.oppOption),
'oppDirect':res.companyMaster.oppDirect,
'oppBatch':res.companyMaster.oppBatch,

'dppOption':this.getBoolean(res.companyMaster.dppOption),
'dppReturnFee':res.companyMaster.dppReturnFee,

'destructionOption':this.getBoolean(res.companyMaster.destructionOption)
     })

//  var companyAuthorizedSplitedList=res.companyMaster.authorizedClasses.split(',');

// for(let i=0;i<companyAuthorizedSplitedList.length; i++){
//   if(companyAuthorizedSplitedList[i]=='2'){
//     this.companyAuthorizedClassesForm.patchValue({
//       'companyAuthorizedClasses2': true })
//   } if(companyAuthorizedSplitedList[i]=='2N'){
//     this.companyAuthorizedClassesForm.patchValue({'companyAuthorizedClasses2N': true })
//   }  if(companyAuthorizedSplitedList[i]=='3'){
//     this.companyAuthorizedClassesForm.patchValue({'companyAuthorizedClasses3': true })
//   }  if(companyAuthorizedSplitedList[i]=='3N'){
//     this.companyAuthorizedClassesForm.patchValue({'companyAuthorizedClasses3N': true })
//   }  if(companyAuthorizedSplitedList[i]=='4'){
//     this.companyAuthorizedClassesForm.patchValue({'companyAuthorizedClasses4': true })
//   }  if(companyAuthorizedSplitedList[i]=='5'){
//     this.companyAuthorizedClassesForm.patchValue({'companyAuthorizedClasses5': true })
//   } 
// }
    

if(this.docForm.value.cppOption==true){
   this.docForm.patchValue({
    'invoiceOptions': 1
 })
}else if(this.docForm.value.oppOption==true){
  this.docForm.patchValue({
   'invoiceOptions': 2
})
}else if(this.docForm.value.dppOption==true){
  this.docForm.patchValue({
   'invoiceOptions': 3
})
}else if(this.docForm.value.destructionOption==true){
  this.docForm.patchValue({
   'invoiceOptions': 4
})
}
   
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  
  update(){
    this.submitted=true;
    if (this.docForm.valid) {
      // For Authorized Classes temp commend by gokul
      // let authorizedClassesCommaSeparate='';
      // if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2){
      //   authorizedClassesCommaSeparate +='2,';
      // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2N){
      //   authorizedClassesCommaSeparate +='2N,';
      // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3){
      //   authorizedClassesCommaSeparate +='3,';
      // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3N){
      //   authorizedClassesCommaSeparate +='3N,';
      // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses4){
      //   authorizedClassesCommaSeparate +='4,';
      // } if(this.companyAuthorizedClassesForm.value.companyAuthorizedClasses5){
      //   authorizedClassesCommaSeparate +='5';
      // }

    this.docForm.patchValue({
     // 'authorizedClasses': authorizedClassesCommaSeparate,
      'defExpirationDate': this.datepipe.transform(this.docForm.value.defExpirationDate, 'yyyy-MM-dd')
    });

    this.companyMaster = this.docForm.value;
    this.companyMasterService.companyMasterUpdate(this.companyMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/instantRates/welcome-page']);

  }
  }
  reset(){}

  
  onCancel(){
    this.router.navigate(['/instantRates/welcome-page']);
   }
   autoFillClick(){

    this.docForm.patchValue({
      'issuesCreditsName': this.docForm.value.companyName,
      'issuesCreditsStreet': this.docForm.value.companyStreet,
      'issuesCreditsCity': this.docForm.value.companyCity,
      'issuesCreditsState': this.docForm.value.companyState,
      'issuesCreditsZipCode': this.docForm.value.companyPincode,
      'issuesCreditsPhone': this.docForm.value.companyPhone,     
   })

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

  keyPressEmail(event: any) {
    const pattern = /[A-Z,a-z 0-9. @]/;
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

  keyPressDefNumber(event: any) {
    const pattern = /[A-Z{2}]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  keyPressCompanyPhone(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.companyPhone.length==3){
        this.docForm.patchValue({
          'companyPhone': this.docForm.value.companyPhone+'-'
        });
      }
      if(this.docForm.value.companyPhone.length==7){
        this.docForm.patchValue({
          'companyPhone': this.docForm.value.companyPhone+'-'
        });
      }
    }
  }


  keyPressWholesalerPhone(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.wholesalerPhoneNo.length==3){
        this.docForm.patchValue({
          'wholesalerPhoneNo': this.docForm.value.wholesalerPhoneNo+'-'
        });
      }
      if(this.docForm.value.wholesalerPhoneNo.length==7){
        this.docForm.patchValue({
          'wholesalerPhoneNo': this.docForm.value.wholesalerPhoneNo+'-'
        });
      }
    }
  }

  

  keyPressIssuesCreditsPhone(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.issuesCreditsPhone.length==3){
        this.docForm.patchValue({
          'issuesCreditsPhone': this.docForm.value.issuesCreditsPhone+'-'
        });
      }
      if(this.docForm.value.issuesCreditsPhone.length==7){
        this.docForm.patchValue({
          'issuesCreditsPhone': this.docForm.value.issuesCreditsPhone+'-'
        });
      }
    }
  }

 
  keyPressCompanyFax(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.companyFax.length==3){
        this.docForm.patchValue({
          'companyFax': this.docForm.value.companyFax+'-'
        });
      }
      if(this.docForm.value.companyFax.length==7){
        this.docForm.patchValue({
          'companyFax': this.docForm.value.companyFax+'-'
        });
      }
    }
  }


  keyPressWholesalerFax(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.wholesalerFax.length==3){
        this.docForm.patchValue({
          'wholesalerFax': this.docForm.value.wholesalerFax+'-'
        });
      }
      if(this.docForm.value.wholesalerFax.length==7){
        this.docForm.patchValue({
          'wholesalerFax': this.docForm.value.wholesalerFax+'-'
        });
      }
    }
  }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getBoolean(value){
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
          case "t":
             return true;
         default: 
             return false;
     }
    }
 cppUpdateValidation(Options: any) {
if(Options===1){
  this.docForm.patchValue({
    'cppOption': true
  });
  this.docForm.controls.cppDirect.setValidators(Validators.required);
  this.docForm.controls['cppDirect'].updateValueAndValidity();
  this.docForm.controls.cppBatch.setValidators(Validators.required);
  this.docForm.controls['cppBatch'].updateValueAndValidity();
}else{
  this.docForm.patchValue({
    'cppOption': false
  });
  this.docForm.controls.cppDirect.clearValidators();
  this.docForm.controls['cppDirect'].updateValueAndValidity();
  this.docForm.controls.cppBatch.clearValidators();
  this.docForm.controls['cppBatch'].updateValueAndValidity();
}


  if(Options===2){
    this.docForm.patchValue({
      'oppOption': true
    });
  this.docForm.controls.oppDirect.setValidators(Validators.required);
  this.docForm.controls['oppDirect'].updateValueAndValidity();
  this.docForm.controls.oppBatch.setValidators(Validators.required);
  this.docForm.controls['oppBatch'].updateValueAndValidity();
}else{
  this.docForm.patchValue({
    'oppOption': false
  });
  this.docForm.controls.oppDirect.clearValidators();
  this.docForm.controls['oppDirect'].updateValueAndValidity();
  this.docForm.controls.oppBatch.clearValidators();
  this.docForm.controls['oppBatch'].updateValueAndValidity();
}


  if(Options===3){
    this.docForm.patchValue({
      'dppOption': true
    });
  this.docForm.controls.dppReturnFee.setValidators(Validators.required);
  this.docForm.controls['dppReturnFee'].updateValueAndValidity();
}else{
  this.docForm.patchValue({
    'dppOption': false
  });
  this.docForm.controls.dppReturnFee.clearValidators();
  this.docForm.controls['dppReturnFee'].updateValueAndValidity();
}

if(Options===4){
  this.docForm.patchValue({
    'destructionOption': true
  });
}else{
  this.docForm.patchValue({
    'destructionOption': false
  });
}

    }


    
    wholesalerfetchDetailsById(whoCode: any): void {
      this.httpService.get(this.wholesalerService.editWholesalerMaster+"?wholesalerId="+whoCode).subscribe((res: any)=> {
      
  
        this.docForm.patchValue({
          'wholesalerCode': res.wholesalerMasterBean.wholesalerCode,
          'wholesalerPolicyCode': res.wholesalerMasterBean.policyCode,
          'wholesalerName': res.wholesalerMasterBean.wholesalerName,
          'wholesalerEmailID': res.wholesalerMasterBean.emailID,
          'wholesalerAllowOverride': res.wholesalerMasterBean.allowOverride,
          'wholesalerDepartment': res.wholesalerMasterBean. department,
          'wholesalerStreet': res.wholesalerMasterBean.street,
          'wholesalerCity': res.wholesalerMasterBean.city,
          'wholesalerState': res.wholesalerMasterBean.state,
          'wholesalerZipCode': res.wholesalerMasterBean.zipCode,
          'wholesalerPhoneNo': res.wholesalerMasterBean.phoneNo,
          'wholesalerTollFreeNo': res.wholesalerMasterBean.tollFreeNo,
          'wholesalerFax': res.wholesalerMasterBean.fax,
          'wholesalerPhone': res.wholesalerMasterBean.contact
       })
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
    }

}
