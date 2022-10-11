import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { FormGroup } from '@angular/forms';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UsersResultBean } from 'src/app/setup/users/users-result-bean';
import { UsersService } from 'src/app/setup/users/users.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  cardWidth:any;
  marLeft:any;
  submitted: boolean=false;
  docForm: FormGroup;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,
  private snackBar: MatSnackBar,private httpService: HttpServiceService,public router: Router,
  private usersService:UsersService, private tokenStorage: TokenStorageService,
  private responsive: BreakpointObserver,private fb: FormBuilder) {
    this.docForm = this.fb.group({
    
    firstName: ["", [Validators.required]],
    
    mobileNo: ["", [Validators.required]],
    password:[""],
    // newPassword: ["", Validators.compose([Validators.required, PasswordStrengthValidator, Validators.minLength(6)])],
    // confirmPassword: ["", [Validators.required]],
    
    emailId: [ "",[Validators.required, Validators.email, Validators.minLength(5)],],
 //   uploadImg: ["",[Validators.required]],
  //  roles: [""],
    

  }, );
}
  ngOnInit(): void {

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          
          this.cardWidth='90%';
          this.marLeft='25px';
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.cardWidth='60%';
          this.marLeft='30px';
        }
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
            this.router.navigate(['instantRates/shipment-mode']);
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

}
