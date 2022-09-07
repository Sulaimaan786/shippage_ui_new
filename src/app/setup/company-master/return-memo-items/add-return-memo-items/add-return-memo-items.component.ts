import { DeleteReturnMemoItemsComponent } from './../list-return-memo-items/delete-return-memo-items/delete-return-memo-items.component';
import { AddDruginfoMstrPopupComponent } from './add-druginfo-mstr-popup/add-druginfo-mstr-popup.component';
import { IsReturnablePopUpComponent } from './is-returnable-pop-up/is-returnable-pop-up.component';
import { OverrideRepackagedProductPopUpComponent } from './override-repackaged-product-pop-up/override-repackaged-product-pop-up.component';
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit,HostListener,Directive,HostBinding,Input, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common-service/common.service';
import { ReturnMemoCalculatorComponent } from "./return-memo-calculator/return-memo-calculator.component";
import { ReturnMemoItems } from './../return-memo-items-model';
import { ReturnMemoItemsService } from './../return-memo-items.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { MatPaginator } from "@angular/material/paginator";


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import $ from "jquery";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
 

};

@Component({
  selector: 'app-add-return-memo-items',
  templateUrl: './add-return-memo-items.component.html',
  styleUrls: ['./add-return-memo-items.component.sass'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class AddReturnMemoItemsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
//Added by gokul for monthDate Date picker
  monthIdByNamesList = [ {id: '01', text: 'JAN'},{id: '02', text: 'FEB'},{id: '03', text: 'MAR'},{id: '04', text: 'APR'},{id: '05', text: 'MAY'},{id: '06', text: 'JUN'},{id: '07', text: 'JUL'},{id: '08', text: 'AUG'},{id: '09', text: 'SEP'},{id: '10', text: 'OCT'},{id: '11', text: 'NOV'},{id: '12', text: 'DEC'}];
  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    var date = new Date(this.date.value._d),
    
    mnth = monthNames[date.getMonth()]
    
    this.docForm.patchValue({
      'expDate': mnth+String(date.getFullYear()).slice(-2) 
    });

    datepicker.close();
  }
  
  docForm: FormGroup;


  manufacturerList = [];
  dosageList = [];
  returnReasonList = [];
  returnMemoItems:ReturnMemoItems;
  

  edit: boolean=false;
  submitted: boolean=false;
  defaultNDCUPC: boolean=true;
  greenNDCUPC: boolean=false;
  redNDCUPC: boolean=false;
 
  validationErrorPolicyCheckFlag: boolean=false;


  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [3, 6, 9, 12];

  rowId: number  = 0;
  totLength: any;

  constructor( public commonService: CommonService,public dialogRef: MatDialogRef<AddReturnMemoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private returnMemoItemsService:ReturnMemoItemsService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog, private tokenStorage: TokenStorageService) {
      super();
    this.docForm = this.fb.group({
      returnMemoItemsCode: [""],
      entryNo: [""],
      ndcupcCode: ["", [Validators.required]],
      lotNo: ["", [Validators.required]],
      reason: ["4", [Validators.required]],
      expDate: ["", [Validators.required]],

      // expDateYear: ["", [Validators.required]],
      // expDateMonths: ["", [Validators.required]],
      
      itemNo: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
      
      manufacturerBy: [""],
      dosage: [""],
      dosageDescription: [""],
      estimatedValue: [""],
      strength: [""],
      availableVia: [""],
      packageSize: [""],
      controlNo: [""],
      unitPackage: [""],
      description: [""],
      return: [""],
      returnMemoNo: [""],
      createdBy: this.tokenStorage.getUsername(),
     
      returnTo: [""],
      returnable: false,
      fullParticalProduct: ["true", [Validators.required]],
      repackagedProduct: false,
      overridePolicy: [""],

      isFutureDated: false
    });
   
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {


    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
    var date = new Date(),
    mnth = monthNames[date.getMonth()]
    this.docForm.patchValue({
      'expDate': mnth+String(date.getFullYear()).slice(-2) 
    });
    

    // this.httpService.get<any>(this.commonService.getDosageDropdownList).subscribe(
    //   (data) => {
    //     this.dosageList = data;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.name + " " + error.message);
    //   }
    //   );

      this.httpService.get<any>(this.commonService.getReturnReasonDropdownList).subscribe(
        (data) => {
          this.returnReasonList = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );

  if(this.data.type=='Edit'){
      this.edit=true;
      


 this.docForm.patchValue({
  'returnMemoNo': this.data.returnMemoNo,
  'return': this.data.returnMemoName,
  'returnMemoItemsCode': this.data.returnMemoItemsCode,
  'ndcupcCode': this.data.ndcupcCode,
  
})


this.fetchDetails(this.data.returnMemoItemsCode);

this.returnMemoItemsList(this.data.returnMemoNo,'EDIT');




  }else if(this.data.type=='Add'){
    this.edit=false;
    
    this.docForm.patchValue({
      'returnMemoNo': this.data.returnMemoNo,
      'return': this.data.returnMemoName,
    })

    this.returnMemoItemsList(this.data.returnMemoNo,'ADD');
  }

      this.httpService.get<any>(this.commonService.getManufacturerList).subscribe(
        (data) => {
          this.manufacturerList = data.manufacturerList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );



             
 
  }
  onSubmit() {
    this.submitted=true;

   

if (this.docForm.valid) {
  // this.docForm.patchValue({
  //   'expDate': this.docForm.value.expDateMonths.substring(0, 3)+this.docForm.value.expDateYear
  // });

  
    this.returnMemoItems = this.docForm.value;
    console.log(this.returnMemoItems);
    
    this.returnMemoItemsService.addReturnMemoItems(this.returnMemoItems);

    //this.dialogRef.close({ data: 'ADD' });
    this.showNotification(
          "snackbar-success",
          "Record Saved Successfully...!!!",
          "bottom",
          "center"
        );
   
  }
  }
 


  checkDrugIsReturnable(valueForSubmitOrUpdate: any){
    this.submitted=true;
    if (this.docForm.controls.ndcupcCode.status === "INVALID") {
     
      this.showNotification(
        "snackbar-danger",
        "Please Add NDC/UPC !",
        "bottom",
        "center"
      );
      return;
    }

    if (this.docForm.controls.quantity.status === "INVALID") {
    
      this.showNotification(
        "snackbar-danger",
        "Please Add Quantity !",
        "bottom",
        "center"
      );
      return;
    }

    if (this.docForm.controls.expDate.status === "INVALID") {
     
      this.showNotification(
        "snackbar-danger",
        "Please Add Exp Date !",
        "bottom",
        "center"
      );
      return;
    }

   

    // this.docForm.patchValue({
    //   'expDate': this.docForm.value.expDateMonths.substring(0, 3)+this.docForm.value.expDateYear
    // });


    // if (this.docForm.value.fullParticalProduct) {
    //   let temEstimatedValue=0;
    //   temEstimatedValue= this.docForm.value.price * this.docForm.value.quantity;
      
    //   this.docForm.patchValue({
    //     'estimatedValue': '$'+temEstimatedValue.toFixed(2),
    //   })
    // }

    // if (!this.docForm.value.fullParticalProduct) {
    //   let temEstimatedValue=0;
    //   temEstimatedValue= this.docForm.value.price / this.docForm.value.packageSize * this.docForm.value.quantity;
    //   this.docForm.patchValue({
    //     'estimatedValue': '$'+temEstimatedValue.toFixed(2),
    //   })
    // }
    

    this.httpService.post<any>(this.returnMemoItemsService.checkDrugIsReturnable, this.docForm.value).subscribe(
      (result) => {
        this.validationErrorPolicyCheckFlag=false;
        if(result.text=='YES'){
        this.docForm.patchValue({
          'returnable': true,
        })
        this.validationErrorPolicyCheckFlag=false;
        if(valueForSubmitOrUpdate=='onSubmit'){
          this.onSubmit();
        }else{
          this.update();
        }
      }
      
      if(result.text.substring(0, 5)=='Error'){
        this.showDrugIsReturnableNotification(
          "snackbar-danger",
          result.text.slice(6),
          "bottom",
          "center"
        );
        this.validationErrorPolicyCheckFlag=true;
      }

      if(result.text.substring(0, 2)=='NO'){
        this.validationErrorPolicyCheckFlag=true;

        let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(IsReturnablePopUpComponent, {
    height: "275px",
    width: "422px",
     data: result.text.slice(5),
     direction: tempDirection,
     disableClose: true
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     
   
      this.docForm.patchValue({
        'overridePolicy': result.text.substring(4, 5),
        'returnable': data.data.isReturnable
      })
    
      this.validationErrorPolicyCheckFlag=false;

    if(result.text.substring(4, 5)=='2' && !data.data.isReturnable){
      this.docForm.patchValue({
      'isFutureDated': true
    })
    }else{
      this.docForm.patchValue({
        'isFutureDated': false
      })
    }

    if(valueForSubmitOrUpdate=='onSubmit'){
      this.onSubmit();
    }else{
      this.update();
    }

   });
      }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }

  

  findAllDetailsByndcupcCode() {
    this.httpService.get(this.returnMemoItemsService.findAllDetailsByndcupcCode+"?drugInfoId="+this.docForm.value.ndcupcCode).subscribe((res: any)=> {


      this.docForm.patchValue({
 
        'manufacturerBy': res.drugInfoMasterBean.manufacturerBy,
        'returnTo': res.drugInfoMasterBean.manufacturerBy,
         'description': res.drugInfoMasterBean.description,
        'strength': res.drugInfoMasterBean.strength,
         'controlNo': res.drugInfoMasterBean.control,
//         'department': res.drugInfoMasterBean.department,
         'unitPackage': res.drugInfoMasterBean.unitPerPackage,
//         'rxOtc': res.drugInfoMasterBean.rxOtc,
         'packageSize': res.drugInfoMasterBean.packageSize,
         'availableVia': res.drugInfoMasterBean.rxOtc,
         'dosage': res.drugInfoMasterBean.dosage,
         'dosageDescription': res.drugInfoMasterBean.dosageDescription,
//         'unitOfMeasure': res.drugInfoMasterBean.unitOfMeasure,
//         'hazardous': this.getBoolean(res.drugInfoMasterBean.hazardous),
// 'awp': res.drugInfoMasterBean.awp,
// 'wap': res.drugInfoMasterBean.wap,
 'price': res.drugInfoMasterBean.myPrice,
     
     })

     

     if(res.drugInfoMasterBean.control==2){
this.defaultNDCUPC=false;
this.greenNDCUPC=false;
this.redNDCUPC=true;
     }else{
      this.defaultNDCUPC=false;
      this.greenNDCUPC=true;
      this.redNDCUPC=false;
     }

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.returnMemoItemsService.editReturnMemoItems+"?returnMemoItemNo="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'returnMemoItemsCode': res.returnMemoItemEditDetailsBean.returnMemoItemsCode,
        'returnMemoNo' : res.returnMemoItemEditDetailsBean.returnMemoNo,
'ndcupcCode' : res.returnMemoItemEditDetailsBean.ndcupcCode,
'lotNo' : res.returnMemoItemEditDetailsBean.lotNo,
'reason' : res.returnMemoItemEditDetailsBean.reason,
'expDate' : res.returnMemoItemEditDetailsBean.expDate,
// 'expDateMonths': res.returnMemoItemEditDetailsBean.expDate.substring(0, 3),
// 'expDateYear': res.returnMemoItemEditDetailsBean.expDate.substring(3, 7),

'itemNo' : res.returnMemoItemEditDetailsBean.itemNo,
'quantity' : res.returnMemoItemEditDetailsBean.quantity,
'price' : res.returnMemoItemEditDetailsBean.price,
      'returnTo': res.returnMemoItemEditDetailsBean.returnTo,
      'returnable': this.getBoolean(res.returnMemoItemEditDetailsBean.returnable),
      'fullParticalProduct': this.getBoolean(res.returnMemoItemEditDetailsBean.fullParticalProduct).toString(),
       'repackagedProduct': this.getBoolean(res.returnMemoItemEditDetailsBean.repackagedProduct),
      'overridePolicy': res.returnMemoItemEditDetailsBean.overridePolicy,
      'isFutureDated': this.getBoolean(res.returnMemoItemEditDetailsBean.isFutureDated),
'entryNo': res.returnMemoItemEditDetailsBean.entryNo,

      

      'manufacturerBy': res.returnMemoItemEditDetailsBean.manufacturerBy,
    
       'description': res.returnMemoItemEditDetailsBean.description,
      'strength': res.returnMemoItemEditDetailsBean.strength,
       'controlNo': res.returnMemoItemEditDetailsBean.control,
       'unitPackage': res.returnMemoItemEditDetailsBean.unitPerPackage,
       'packageSize': res.returnMemoItemEditDetailsBean.packageSize,
       'availableVia': res.returnMemoItemEditDetailsBean.rxOtc,
       'dosage': res.returnMemoItemEditDetailsBean.dosage,
       'dosageDescription': res.returnMemoItemEditDetailsBean.dosageDescription,
       'estimatedValue': '$'+res.returnMemoItemEditDetailsBean.estimateval
       
     })

     if(res.returnMemoItemEditDetailsBean.control==2){
      this.defaultNDCUPC=false;
      this.greenNDCUPC=false;
      this.redNDCUPC=true;
           }else{
            this.defaultNDCUPC=false;
            this.greenNDCUPC=true;
            this.redNDCUPC=false;
           }
           

  //Added by gokul for monthDate Date picker
  var monthNumber = this.monthIdByNamesList.find(x => x.text == res.returnMemoItemEditDetailsBean.expDate.substring(0, 3))?.id
  var date = new Date(monthNumber+'-05-20'+res.returnMemoItemEditDetailsBean.expDate.substring(3, 7));
  this.date.setValue(date);


  // if (this.docForm.value.fullParticalProduct) {
  //   let temEstimatedValue=0;
  //   temEstimatedValue= this.docForm.value.price * this.docForm.value.quantity;
  //   this.docForm.patchValue({
  //     'estimatedValue': '$'+temEstimatedValue.toFixed(2),
  //   })
  // }
  
  // if (!this.docForm.value.fullParticalProduct) {
  //   let temEstimatedValue=0;
  //   temEstimatedValue= this.docForm.value.price / this.docForm.value.packageSize * this.docForm.value.quantity;
  //   this.docForm.patchValue({
  //     'estimatedValue': '$'+temEstimatedValue.toFixed(2),
  //   })
  // }
  if(this.docForm.value.returnMemoItemsCode!=undefined && this.docForm.value.returnMemoItemsCode!='' && this.docForm.value.returnMemoItemsCode!=null){
    this.edit=true;
  }else{
    this.edit=false;
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

      // this.docForm.patchValue({
      //   'expDate': this.docForm.value.expDateMonths.substring(0, 3)+this.docForm.value.expDateYear
      // });

    this.returnMemoItems = this.docForm.value;
    this.returnMemoItemsService.returnMemoItemsUpdate(this.returnMemoItems);
   
    //this.dialogRef.close({ data: 'EDIT' });
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    
  }
  }
  


  ndcupcCodeValidation(event){
    this.httpService.get<any>(this.commonService.uniqueValidateUrl+ "?tableName=" +"drugs"+"&columnName="+"ndcupc_code"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
         this.docForm.controls['ndcupcCode'].setErrors(null);
      }else{
        this.docForm.controls['ndcupcCode'].setErrors({ ndcUpcCodeValid: true });
        
        
      }
    });
  }
  
  
  onCancel(){
    this.dialogRef.close({ data: 'CANCEL' });
   }
  

   repackagedProductclick(){
    
    if(this.docForm.value.repackagedProduct){
   
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(OverrideRepackagedProductPopUpComponent, {
     height: "275px",
     width: "422px",
     data: "22",
     direction: tempDirection,
     disableClose: true
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     if(data.data.overrideRepackagedProduct){
    this.docForm.patchValue({
      'repackagedProduct': data.data.overrideRepackagedProduct,
      'overridePolicy': '1',
      'returnable': false
    })
  }else{
    this.docForm.patchValue({
      'repackagedProduct': data.data.overrideRepackagedProduct
    })
  }
   });
   
  }

   }



   addDruginfoMstrPopup() {
    let tempDirection;
if (localStorage.getItem("isRtl") === "true") {
 tempDirection = "rtl";
} else {
 tempDirection = "ltr";
}
const dialogRef = this.dialog.open(AddDruginfoMstrPopupComponent, {
 height: "100%",
 width: "100%",
 data: "",
 direction: tempDirection,
 disableClose: true
});
this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
 
if(data.data.data=='SAVE'){
  this.docForm.patchValue({
    'ndcupcCode': data.data.ndcupcCode,
  })
setTimeout(() => {
  this.findAllDetailsByndcupcCode();
}, 500);
  
}

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

  keyPressNdcupcCode(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.ndcupcCode.length==5){
        this.docForm.patchValue({
          'ndcupcCode': this.docForm.value.ndcupcCode+'-'
        });
      }
      if(this.docForm.value.ndcupcCode.length==10){
        this.docForm.patchValue({
          'ndcupcCode': this.docForm.value.ndcupcCode+'-'
        });
      }
    }
  }


  keyPressLotNo(event: any) {
    const pattern = /[A-Z,a-z 0-9-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: colorName,
    });
  }


  showDrugIsReturnableNotification(colorName, text, placementFrom, placementAlign) {
    

    this.snackBar.open(text, "", {
      duration: 10000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
       panelClass: ['errorColor-snackbar']

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

    onCalculator(){
      const dialogRef = this.dialog.open(ReturnMemoCalculatorComponent, {
        disableClose: true ,
        height: "550px",
        width: "465px",
    
      });
    }
    onEnterKeyPress(event) {
      if (event.charCode == 13) {
      }//if enter is hot then call ValidateInputvalue().
         // $scope.ValidateInputvalue();
        }

         @HostListener('document:keypress', ['$event'])
  startSearch(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.httpService.get<any>(this.commonService.uniqueValidateUrl+ "?tableName=" +"drugs"+"&columnName="+"ndcupc_code"+"&columnValue="+this.docForm.value.ndcupcCode).subscribe((res: any) => {
        if(res){
           this.docForm.controls['ndcupcCode'].setErrors(null);
           this.findAllDetailsByndcupcCode();
        }else{
          this.docForm.controls['ndcupcCode'].setErrors({ ndcUpcCodeValid: true });
        }
      });
    }
  }


  //Added by GOKUL For NewItems , previous & next 
  
  returnMemoItemsList(returnMemoNo:any,type:any){
   
  this.httpService.get(this.returnMemoItemsService.getreturnMemoItemsList+"?returnMemoNo="+returnMemoNo).subscribe((res: any)=> {

      this.POSTS = res;
      this.totLength = res.length;
      if(type=='EDIT'){
        this.rowId = this.POSTS.map((e) => { return e.returnMemoItemsCode; }).indexOf(this.docForm.value.returnMemoItemsCode);
     }
     if(type=='DELETE'){
      this.newItem();
   }
     
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }

  onTableDataChange(event: any,returnMemoItemsCode: any) {
    this.page = event;
    this.fetchDetails(returnMemoItemsCode);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  

  next() {
    if (this.rowId !== this.totLength) {
      ++this.rowId;
      this.fetchDetails(this.POSTS[this.rowId].returnMemoItemsCode);
    }
  }
  previous() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.fetchDetails(this.POSTS[this.rowId].returnMemoItemsCode);
    }
  }

  newItem(){

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
    var date = new Date(),
    mnth = monthNames[date.getMonth()]
    
    this.docForm.patchValue({
      returnMemoItemsCode: '',
      entryNo: '',
      ndcupcCode: '',
      lotNo: '',
      reason: '',
      expDate: mnth+String(date.getFullYear()).slice(-2),

      
      itemNo: '',
      quantity: '',
      price: '',
      
      manufacturerBy: '',
      dosage: '',
      dosageDescription: '',
      estimatedValue: '',
      strength: '',
      availableVia: '',
      packageSize: '',
      controlNo: '',
      unitPackage: '',
      description: '',
      // return: '',
      // returnMemoNo: '',
      createdBy: this.tokenStorage.getUsername(),
      returnTo: '',
      returnable: false,
      fullParticalProduct: 'true',
      repackagedProduct: false,
      overridePolicy: '',

      isFutureDated: false

    })

    if(this.docForm.value.returnMemoItemsCode!=undefined && this.docForm.value.returnMemoItemsCode!='' && this.docForm.value.returnMemoItemsCode!=null){
      this.edit=true;
    }else{
      this.edit=false;
    }

    
    this.defaultNDCUPC=true;
    this.greenNDCUPC=false;
    this.redNDCUPC=false;

    this.returnMemoItemsList(this.docForm.value.returnMemoNo,'EDIT');

  }


  deleteItem(){ 
   
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    const obj={
      returnMemoItemsNo: this.docForm.value.returnMemoItemsCode,
      returnMemoNo: this.docForm.value.returnMemoNo
    }

    const dialogRef = this.dialog.open(DeleteReturnMemoItemsComponent, {
      height: "270px",
      width: "400px",
      data: obj,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if(data.data==true){
      this.returnMemoItemsList(this.docForm.value.returnMemoNo,'DELETE');
        this.showNotification(
          "snackbar-success",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      }else if(data.data==false || data==1){
          this.showNotification(
            "snackbar-danger",
            "Record Not Deleted...!!!",
            "bottom",
            "center"
          );
      }
    });

   

  }

}
