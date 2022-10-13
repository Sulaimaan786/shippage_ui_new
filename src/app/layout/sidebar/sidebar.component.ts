import { Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';
import { AppService } from "src/app/app.service";
 
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { ROUTES } from "./sidebar-items";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { Breakpoints } from "@angular/cdk/layout";
import { BreakpointObserver } from "@angular/cdk/layout";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  level1Menu = "";
  level2Menu = "";
  level3Menu = "";
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  bottomMenu:any;
  leftSideMenu:any;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  routerObj = null;

  instanticon = 'assets/icons/Asset 38.png';
  quoteicon = 'assets/icons/Asset 40.png'
  shipmenticon= 'assets/icons/Asset 41.png'
  settingicon = 'assets/icons/Asset 39.png'
  instanthr:any;
  quotehr:any;
  shipmenthr:any;
  settinghr:any;
  header:any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,public dataStorage :DataStorageService,
    private responsive: BreakpointObserver,private Service: AppService
  ) {
    const body = this.elementRef.nativeElement.closest("body");
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // logic for select active menu in dropdown
        const role = ["admin", "employee", "client"];
        const currenturl = event.url.split("?")[0];
        const firstString = currenturl.split("/").slice(1)[0];

        if (role.indexOf(firstString) !== -1) {
          this.level1Menu = event.url.split("/")[2];
          this.level2Menu = event.url.split("/")[3];
        } else {
          this.level1Menu = event.url.split("/")[1];
          this.level2Menu = event.url.split("/")[2];
        }

        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, "overlay-open");
      }
    });
  }
  @HostListener("window:resize", ["$event"])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }
  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = "0";
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains("toggled");
    if (hasClass) {
      this.renderer.removeClass(event.target, "toggled");
    } else {
      this.renderer.addClass(event.target, "toggled");
    }
  }
  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = "0";
    } else {
      this.level2Menu = element;
    }
  }
  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = "0";
    } else {
      this.level3Menu = element;
    }
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      this.userFullName =
        this.authService.currentUserValue.firstName +
        " " +
        this.authService.currentUserValue.lastName;
      this.userImg = this.authService.currentUserValue.img;

      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf("All") !== -1
      );
      if (userRole === Role.Admin) {
        this.userType = Role.Admin;
      } else if (userRole === Role.Client) {
        this.userType = Role.Client;
      } else if (userRole === Role.Employee) {
        this.userType = Role.Employee;
      } else {
        this.userType = Role.Admin;
      }
    }
    //this.renderer.addClass(this.document.body, "submenu-closed");
    // this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
    console.log('Web ' + Breakpoints.Web);
    console.log('WebLandscape ' + Breakpoints.WebLandscape);
    console.log('WebPortrait ' + Breakpoints.WebPortrait);
    
    console.log('Tablet ' + Breakpoints.Tablet);
    console.log('TabletPortrait ' + Breakpoints.TabletPortrait);
    console.log('TabletLandscape ' + Breakpoints.TabletLandscape);
    
    console.log('Handset ' + Breakpoints.Handset);
    console.log('HandsetLandscape ' + Breakpoints.HandsetLandscape);
    console.log('HandsetPortrait ' + Breakpoints.HandsetPortrait);
    
    console.log('XSmall ' + Breakpoints.XSmall);
    console.log('Small ' + Breakpoints.Small);
    console.log('Medium ' + Breakpoints.Medium);
    console.log('Large ' + Breakpoints.Large);
    console.log('XLarge ' + Breakpoints.XLarge);

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {
        this.bottomMenu = false;
        this.leftSideMenu = false;
        if (result.matches) { 
          this.bottomMenu = true;
          this.leftSideMenu = true;
        }
      });
 
    if(this.router.url.match("instantRates")){
      this.instanticon = 'assets/icons/Asset 27.png'
      this.instanthr = '1px solid'
    }
    if(this.router.url.match("quote")){
      this.quoteicon = 'assets/icons/Asset 35.png'
      this.quotehr = '1px solid'
    }
    if(this.router.url.match("shipping")){
      this.shipmenticon = 'assets/icons/Asset 34.png'
      this.shipmenthr = '1px solid'
    }
 
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight;
    this.listMaxHeight = height + "";
    this.listMaxWidth = "500px";
  }
  isOpen() {
    return this.bodyTag.classList.contains("overlay-open");
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 770) {
      this.renderer.addClass(this.document.body, "ls-closed");
    } else {
      this.renderer.removeClass(this.document.body, "ls-closed");
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("submenu-closed")) {
      this.renderer.addClass(this.document.body, "side-closed-hover");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("side-closed-hover")) {
      this.renderer.removeClass(this.document.body, "side-closed-hover");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() { 
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(["/authentication/signin"]);
      }
    });
  }

  instantRates() {  
    this.instanticon = 'assets/icons/Asset 27.png'
    this.quoteicon = 'assets/icons/Asset 40.png'
    this.shipmenticon= 'assets/icons/Asset 41.png'
    this.settingicon = 'assets/icons/Asset 39.png'
    this.instanthr = '1px solid'
    this.quotehr = '0px solid'
    this.shipmenthr = '0px solid'
    this.settinghr = '0px solid'
    this.router.navigate(["/instantRates/shipment-mode"]); 
    this.Service.sendUpdate('Instant Rates');
  }

  quote() {  
    this.instanticon = 'assets/icons/Asset 38.png'
    this.quoteicon = 'assets/icons/Asset 35.png'
    this.shipmenticon= 'assets/icons/Asset 41.png'
    this.settingicon = 'assets/icons/Asset 39.png'
    this.instanthr = '0px solid'
    this.quotehr = '1px solid'
    this.shipmenthr = '0px solid'
    this.settinghr = '0px solid'
    this.router.navigate(["/quote/request-quote"]);
    this.Service.sendUpdate('Request Quote');
  }

  shipping(){
    this.instanticon = 'assets/icons/Asset 38.png'
    this.quoteicon = 'assets/icons/Asset 40.png'
    this.shipmenticon = 'assets/icons/Asset 34.png'
    this.settingicon = 'assets/icons/Asset 39.png'
    this.instanthr = '0px solid'
    this.quotehr = '0px solid'
    this.shipmenthr = '1px solid'
    this.settinghr = '0px solid'
    this.router.navigate(["/shipping/shipping"]);
    this.Service.sendUpdate('Track And Trace');
  }
 

  setting(){
    this.instanticon = 'assets/icons/Asset 38.png'
    this.quoteicon = 'assets/icons/Asset 40.png'
    this.shipmenticon= 'assets/icons/Asset 41.png'
    this.settingicon = 'assets/icons/Asset 32.png'
    this.instanthr = '0px solid'
    this.quotehr = '0px solid'
    this.shipmenthr = '0px solid'
    this.settinghr = '1px solid' 
    this.router.navigate(["/shipping/shipping"]);
    this.Service.sendUpdate('Track And Trace');
  }
  

//   origin&destination() {  
//     this.router.navigate(["/bookingDetails/origin&destination"]);
// }
}
