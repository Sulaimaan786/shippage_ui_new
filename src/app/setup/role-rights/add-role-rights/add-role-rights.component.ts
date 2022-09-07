import { AddRolesComponent } from './../../roles/add-roles/add-roles.component';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleRights } from './../role-rights-model';
import { RoleRightsService } from './../role-rights.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-add-role-rights',
  templateUrl: './add-role-rights.component.html',
  styleUrls: ['./add-role-rights.component.sass']
})
export class AddRoleRightsComponent  extends UnsubscribeOnDestroyAdapter implements OnInit{

  docForm: FormGroup;
  edit: boolean=false;
  requestId: number;
  roleList:[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  roleId1=0;
  constructor ( public dialog: MatDialog,private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private roleRightsService:RoleRightsService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
      super();

      this.docForm = this.fb.group({
      roleId: ["", [Validators.required]],
      formList: [""],
    //  userName: this.tokenStorage.getUsername()
     
    });
  }
  onSubmit() {
    console.log("Form Role Value", this.docForm.value);
    if(this.docForm.valid){
      this.httpService.post<any>(this.roleRightsService.saveUrl, this.docForm.value).subscribe(data => {
        console.log(data);
          if(data.success){
            this.showNotification(
              "snackbar-success",
              "Menu Updated",
              "bottom",
              "center"
            );
            
          }else{
            
          }
        },
        (err: HttpErrorResponse) => {
          
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
    

  }
  roleBasedFormList(roleId){
    this.getFornmList(roleId);
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onCancel(){
    window.history.back();
  }
  ngOnInit(): void {
    
    
    this.getFornmList(this.roleId1);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


      this.httpService.get<any>(this.roleRightsService.roleListUrl).subscribe(
        (data) => {
          this.roleList = data.roleList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      
   }

   onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getFornmList(roleIds){
    if(roleIds!=0){
      this.httpService.get<any>(this.roleRightsService.roleFormUrl+"?roleId="+0).subscribe(
        (data) => {
          this.dropdownList = data.formList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.httpService.get<any>(this.roleRightsService.roleFormUrl+"?roleId="+roleIds).subscribe(
        (data) => {
          this.selectedItems = data.formList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }else{
      this.httpService.get<any>(this.roleRightsService.roleFormUrl+"?roleId="+roleIds).subscribe(
        (data) => {
          this.dropdownList = data.formList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }
    

  }
  
  onrolesInPopup(){

    let tempDirection;
if (localStorage.getItem("isRtl") === "true") {
 tempDirection = "rtl";
} else {
 tempDirection = "ltr";
}
const dialogRef = this.dialog.open(AddRolesComponent, {
 height: "50%",
 width: "80%",
 data: "",
 direction: tempDirection,
 disableClose: true
});
this.subs.sink = dialogRef.afterClosed().subscribe((data) => {

});
  }


}
