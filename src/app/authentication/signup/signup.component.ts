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
  docForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpService: HttpServiceService,public router: Router,private authService: AuthService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
      phoneNumber:[""]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted=true;
    console.log("Form Value", this.docForm.value);
    if(this.docForm.valid){
      this.httpService.post<UsersResultBean>(this.authService.saveUrl, this.docForm.value).subscribe(data => {
        console.log(data);
          if(data.success){
            this.router.navigate(['instantRates/shipment-mode']);
          }else{
            
          }
        },
        (err: HttpErrorResponse) => {
          
      }
      );
    }else{
    }
    

  }
}
