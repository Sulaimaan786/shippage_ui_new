import { UsersResultBean } from './../users-result-bean';
import { UsersMaster } from './../users-model';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersService } from './../users.service';
import { PasswordStrengthValidator } from './../../../shared/passwordPolicy';
import { MustMatch } from './../../../shared/mustMatch';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.sass']
})
export class AddUsersComponent  implements OnInit  {
  docForm: FormGroup;
  edit: boolean=false;
  requestId: number;
  hide3 = true;
  agree3 = false;
  roleList:[];
  companyList:[];
  roles:[];
  imagePath:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  usersMaster:UsersMaster;
  myInputVariable: ElementRef;
  private acceptImageTypes = ["image/jpg", "image/png", "image/jpeg"]
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc"]
  submitted: boolean=false;

 
  constructor(public commonService: CommonService, private sanitizer: DomSanitizer, private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private usersService:UsersService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      newUserName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      firstName: ["", [Validators.required]],
      lastName: [""],
      mobileNo: ["", [Validators.required]],
      // newPassword: ["", Validators.compose([Validators.required, PasswordStrengthValidator, Validators.minLength(6)])],
      // confirmPassword: ["", [Validators.required]],
      newPassword: [""],
      confirmPassword: [""],
      emailId: [ "",[Validators.required, Validators.email, Validators.minLength(5)],],
   //   uploadImg: ["",[Validators.required]],
   //   roles: ["", [Validators.required]],
      uploadImg: [""],
      roles: [, [Validators.required]],
      fileUploadUrl:[""],
      companyCode:[""],
      pharmaciesType:["", [Validators.required]],
      userName: this.tokenStorage.getUsername(),
      roleName:[""],
      empId:[""],

    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  keyPresshas(event: any) {
    // debugger;
     if (event.keyCode == 35) {
       event.preventDefault();
     }
   }

  uploadFile(event){

  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  

  
  this.httpService.post<any>(this.usersService.addUserFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        let objectURL = 'data:image/png;base64,' + data.file;
        this.imagePath = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        this.docForm.patchValue({
          'fileUploadUrl': data.filePath     
         
       })
      }else{
        this.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
      
      },
      (err: HttpErrorResponse) => {
        
    });

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    this.submitted=true;
    console.log("Form Value", this.docForm.value);
    if(this.docForm.valid){
      this.httpService.post<UsersResultBean>(this.usersService.saveUrl, this.docForm.value).subscribe(data => {
        console.log(data);
          if(data.success){
            this.showNotification(
              "snackbar-success",
              "User Added",
              "top",
              "right"
            );
            this.router.navigate(['/setup/users/listUsers']);
          }else{
            
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

  update(){
    this.submitted=true;
    if (this.docForm.valid) {
    this.usersMaster = this.docForm.value;
    this.usersService.userMasterUpdate(this.usersMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/users/listUsers']);
    }
  }


  onCancel(){
    this.router.navigate(['/setup/users/listUsers']);
  }

  ngOnInit() {
 
    this.httpService.get<UsersResultBean>(this.usersService.roleListUrl).subscribe(
      (data) => {
    //    this.roleList = data.roleList;
        this.dropdownList =data.roleList
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.dropdownSettings = {
       singleSelection: false,
      //  idField: 'item_id',
      // textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  




    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

    setTimeout(() => {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });
    }, 100);
  }
 
  fetchDetails(empId: any): void {
    
    this.httpService.get(this.usersService.editUsers+"?usersId="+empId).subscribe((res: any)=> {
      console.log(empId);

      this.docForm.patchValue({
        'companyCode' : res.usersMasterBean.companyCode,
        'newUserName': res.usersMasterBean.newUserName,
        'firstName': res.usersMasterBean.firstName,
        'lastName': res.usersMasterBean.lastName,
        'mobileNo': res.usersMasterBean.mobileNo,
        'emailId': res.usersMasterBean.emailId,
        'empId' : res.usersMasterBean.empId,
        'pharmaciesType' : res.usersMasterBean.pharmaciesType,
        'fileUploadUrl' : res.usersMasterBean.uploadImg       
     })

    
     if(res.roles!=undefined && res.roles!=null && res.roles!='' &&  res.roles.length>0){
      this.selectedItems=res.roles;
     }
    

     if(res.file!=undefined && res.file!=null && res.file!=''){
      let objectURL = 'data:image/png;base64,' + res.file;
      this.imagePath = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }

      },
      (err: HttpErrorResponse) => {
       
      }
    );
  }

 
  userNameValidation(event){
    this.httpService.get<any>(this.usersService.uniqueValidateUrl+ "?tableName=" +"user_details"+"&columnName="+"emp_user_id"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['newUserName'].setErrors({ userValid: true });
      }else{
        this.docForm.controls['newUserName'].setErrors(null);
      }
    });
  }

  emailIdValidation(event){
    this.httpService.get<any>(this.usersService.uniqueValidateUrl+ "?tableName=" +"user_details"+"&columnName="+"email_id"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['emailId'].setErrors({ emailValid: true });
      }else{
        this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }

  phoneNoValidation(event){
    this.httpService.get<any>(this.usersService.uniqueValidateUrl+ "?tableName=" +"user_details"+"&columnName="+"phone_no"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['mobileNo'].setErrors({ mobileNoValid: true });
      }else{
        this.docForm.controls['mobileNo'].setErrors(null);
      }
    });
  }

  onSelectFile(event, type) {

    if (event.target.files) {
      if (type === 'image') {
        const filesAmount = event.target.files;
        let imageFile = filesAmount[0];
        if (!this.acceptImageTypes.includes(imageFile.type)) {
          this.showNotification(
            "snackbar-danger",
            "Invalid Image type",
            "bottom",
            "center"
          );
          return;
        }
        if (imageFile.size > 100000) {
          this.showNotification(
            "snackbar-danger",
            "Please upload valid image with less than 100kb",
            "bottom",
            "center"
          );
          return;
        }
        this.uploadFile(event)
         
      }
    }
    
  }

  onItemSelect(roles: any) {
    console.log(roles);
  }
  onSelectAll(roles: any) {
    console.log(roles);
  }
  
  pharmaciesTypeValidation(){

    if(this.docForm.value.pharmaciesType){
      this.docForm.controls.companyCode.setValidators(Validators.required);
      this.docForm.controls['companyCode'].updateValueAndValidity();
    }else{
      this.docForm.controls.companyCode.clearValidators();
      this.docForm.controls['companyCode'].updateValueAndValidity();
    }

  }

  keyPressPhoneNo(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      
    }else{
      if(this.docForm.value.mobileNo.length==3){
        this.docForm.patchValue({
          'mobileNo': this.docForm.value.mobileNo+'-'
        });
      }
      if(this.docForm.value.mobileNo.length==7){
        this.docForm.patchValue({
          'mobileNo': this.docForm.value.mobileNo+'-'
        });
      }
    }
  }

}
