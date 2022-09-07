import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
@Component({
  selector: 'app-manufacture-popup',
  templateUrl: './manufacture-popup.component.html',
  styleUrls: ['./manufacture-popup.component.sass']
})
export class ManufacturePopupComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  
  requestId: number;
  edit: boolean=false;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router,
    
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,

    ) {
    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
      }
     });
  }
  onOk() {
     
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";  
    }
    const dialogRef = this.dialog.open(ManufacturePopupComponent, {
      height: "250px",
      width: "960px",
      direction: tempDirection,
    });
    
  }

  fetchDetails(cusCode: any): void {
    // this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
    //   console.log(cusCode);

    //   this.docForm.patchValue({
    //     'companyName': res.companyMasterBean.companyName,
    //     'startDate': res.customerMasterBean.startDate,
    //     'endDate': res.customerMasterBean.endDate,
    //     'debitMemoNo': res.customerMasterBean.debitMemoNo,
    //     'controlledSubstance': res.customerMasterBean.ControlledSubstance,
        
     
    //  })
    //   },
    //   (err: HttpErrorResponse) => {
    //   }
    // );
  }

  update(){

   // this.customerMaster = this.docForm.value;
   
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/customerMaster/listCustomer']);

  }

  reset(){}

  
  onCancel(){
    this.router.navigate(['/crm/customerMaster/listCustomer']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  
}




