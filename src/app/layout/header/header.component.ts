import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  ViewChild,
  OnDestroy 
} from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/auth/auth.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordPopUpComponent } from "src/app/setup/users/change-password-pop-up/change-password-pop-up.component";
import { ChangeRolePopUpComponent } from "src/app/setup/users/change-role-pop-up/change-role-pop-up.component";
const document: any = window.document;
import { DomSanitizer } from '@angular/platform-browser';
import { Overlay } from "@angular/cdk/overlay";
import { DataStorageService } from 'src/app/auth/data-storage';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit,OnDestroy 
{
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;

  public config: any = {};
  userImg: any;
  homePage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  userName:string; 
  roleName:string;
  firstNameLastName:string;
  changePasswordForm: FormGroup;
  headerName = 'Instant Rates'
  messageReceived: any;
  headerLeft:any;
  headerTop:any;
  headerFont:any;
  private subscriptionName: Subscription;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private app:AppService,
    private token: TokenStorageService,
    public fb: FormBuilder,
    public dialog: MatDialog,public dataStorage :DataStorageService,
    private sanitizer: DomSanitizer,
    private Service: AppService,private responsive: BreakpointObserver,
  ) {
    super();
    this.subscriptionName= this.Service.getUpdate().subscribe
             (message => { //message contains the data sent from service
             this.messageReceived = message;

             if(this.messageReceived.text == 'Instant Rates'){
              this.ngOnInit();
              this.headerName = 'Instant Rates'
             }
             if(this.messageReceived.text == 'Request Quote'){
              this.ngOnInit();
              this.headerName = 'Request Quote'
             }
             if(this.messageReceived.text == 'Track And Trace'){
              this.ngOnInit();
              this.headerName = 'Track And Trace'
             }
             if(this.messageReceived.text == 'Booking Details'){
              this.ngOnInit(); 
              this.headerName = 'Booking Details'
             }
             if(this.messageReceived.text == 'Booking Shipment'){
              this.ngOnInit(); 
              this.headerName = 'Booking Shipment'
             }
              });
  }

 
  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
 }


  listLang = [
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.jpg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.jpg", lang: "de" },
  ];
  notifications: any[] = [
    {
      message: "Please check your mail",
      time: "14 mins ago",
      icon: "mail",
      color: "nfc-green",
      status: "msg-unread",
    },
    {
      message: "New Employee Added..",
      time: "22 mins ago",
      icon: "person_add",
      color: "nfc-blue",
      status: "msg-read",
    },
    {
      message: "Your leave is approved!! ",
      time: "3 hours ago",
      icon: "event_available",
      color: "nfc-orange",
      status: "msg-read",
    },
    {
      message: "Lets break for lunch...",
      time: "5 hours ago",
      icon: "lunch_dining",
      color: "nfc-blue",
      status: "msg-read",
    },
    {
      message: "Employee report generated",
      time: "14 mins ago",
      icon: "description",
      color: "nfc-green",
      status: "msg-read",
    },
    {
      message: "Please check your mail",
      time: "22 mins ago",
      icon: "mail",
      color: "nfc-red",
      status: "msg-read",
    },
    {
      message: "Salary credited...",
      time: "3 hours ago",
      icon: "paid",
      color: "nfc-purple",
      status: "msg-read",
    },
  ];
  ngOnInit() {

    this.responsive.observe(Breakpoints.Handset)
    .subscribe(result => { 
      if (result.matches) {  
         this.headerLeft='2%'
         this.headerTop = '25px'
         this.headerFont = '35px'
      }else{ 
         this.headerLeft='6%'
         this.headerTop = '18px'
         this.headerFont = '40px'

      }
    }); 

    // tablet view
    this.responsive.observe([Breakpoints.Tablet]).subscribe(result =>{
      if (result.matches) { 
      const viewport = screen.orientation.type;
       if(viewport == "portrait-primary"){ 
         }else{ 
           this.headerLeft='8%'
           this.headerTop = '18px'
            this.headerFont = '40px'
        }
      }
    });



     this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;

    this.roleName = this.token.getDefaultRole();
    // this.userName = this.token.getUsername();

    if(this.token.getImgUrl() !=undefined && this.token.getImgUrl()!=null && this.token.getImgUrl()!=''){
      let objectURL = 'data:image/png;base64,' + this.token.getImgUrl();
      this.userImg = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }

    this.firstNameLastName = this.token.getFirstNameLastName();
    if (userRole === "Admin") {
      this.homePage = "instantRates/welcome-page";
    } else if (userRole === "Client") {
      this.homePage = "client/dashboard";
    } else if (userRole === "Employee") {
      this.homePage = "employee/dashboard";
    } else {
      this.homePage = "instantRates/welcome-page";
    }

    this.langStoreValue = localStorage.getItem("lang");
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = "assets/images/flags/us.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
    this.changePasswordForm = this.fb.group({
      oldPwd: ['' ],
      newPwd: [''],
      confirmNewPwd: ['']
    })
    this.renderer.addClass(this.document.body, "side-closed");
    this.renderer.addClass(this.document.body, "submenu-closed");  
    
     if(this.router.url.match("instantRates")){
      this.headerName = 'Instant Rates'
    }
    if(this.router.url.match("quote")){
      this.headerName = 'Request Quote'
    }
    if(this.router.url.match("shipping")){
      this.headerName = 'Track And Trace'
    }
    if(this.router.url.match("instantRates/booking")){
      this.headerName = 'Booking Details'
    }
    if(this.router.url.match("instantRates/rateSummary")){
      this.headerName = 'Booking Shipment'
    }
  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    // this.subs.sink = this.authService.logout().subscribe((res) => {
    //   if (!res.success) {
    //     this.router.navigate(["/authentication/signin"]);
    //   }
    // });

   this.token.signOut();
    // this.toastr.info("Please Sign in to Continue", "Logout Successful")
    this.app.SetName('');
      localStorage.removeItem("currentUser");
    this.router.navigate(['/authentication/signin']);

  }

  passwordChange(){
    const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      disableClose: true ,
      height: "550px",
      width: "465px",
  
    });
  }

  roleChange(){

    const dialogRef = this.dialog.open(ChangeRolePopUpComponent, {
      height: "270px",
      width: "400px",
    });

  }



  updatePassword() {
    
        this.openBtn.nativeElement.click();
      
  }

  reset(){

  }

  callHomePage(){
    this.router.navigate(['/instantRates/welcome-page']);
  }
  
}
