import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';
import { InstantRatesService } from '../instant-rates.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { InstantRates } from '../instant-rates.model';
import { AppService } from 'src/app/app.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandscapeLoaderComponent } from '../landscape-loader/landscape-loader.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-rate-summary',
  templateUrl: './rate-summary.component.html',
  styleUrls: ['./rate-summary.component.sass']
})
export class RateSummaryComponent implements OnInit {

  docForm: FormGroup;
  routeDetails :any;
  cargoReady:any;
  loadtype:any;
  loadDetails:any;
  incotermsValue:any;
  commodityValues:any;
  freightMode:any;
  shipmentMode:any;
  commodity:any;
  instantRate : InstantRates;

  origin:any;
  destination: any;
  equipmentType:any;
  commodityDetails:[];
  incoterm: any;
  eqtypeId:any;
  totalequipId:any;
  selectedEquip: any;
  equipmentId: any;
  equipmentTypeName:any;
  Count=0;
  rateValue: any;
  rateValueFinal: number;
  combine:String;
  data:any;
  quantityValue: any;
  equipName:any;
  testName:any;
  equipmentNo:any;
  cardBottom:any;

  // textarea flags

  shipperFlag:boolean = false;
  consigneeFlag:boolean = false;
  notifyFlag:Boolean = false;
  shippingIntFlag:boolean = false;
  private unsubscriber : Subject<void> = new Subject<void>();


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,public dialog: MatDialog,
    private instantRatesService: InstantRatesService,private Service: AppService,
    private httpService: HttpServiceService,private fb: FormBuilder) {}
  ngOnInit() { 
    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
     });


    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          this.cardBottom = '75px';
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.cardBottom = '53px';
        }
      });

      // tablet view
      this.responsive.observe([Breakpoints.Tablet]).subscribe(result =>{
        if (result.matches) { 
        const viewport = screen.orientation.type;
         if(viewport == "portrait-primary"){
          this.tabview()
          } 
        }
      });


      //Route Details  
  this.routeDetails =JSON.parse(this.dataStorage.getrouteDetails());
  console.log("route origin" +this.routeDetails.origin);
  this.origin = this.routeDetails.origin;
  this.httpService.get(this.instantRatesService.origin + "?origin=" + this.origin).subscribe((res: any) => {
  this.origin = res.origin.text;
  },
);
console.log("route destination" +this.routeDetails.destination);
this.destination = this.routeDetails.destination;
this.httpService.get(this.instantRatesService.destination + "?destination=" + this.destination).subscribe((res: any) => {
this.destination = res.destination.text;
},
);
//Incoterm
  this.incotermsValue =JSON.parse(this.dataStorage.getIncotermsDetails());    
  console.log("datas" +this.incotermsValue.incoterm);
  this.incoterm =this.incotermsValue.incoterm;
  this.httpService.get(this.instantRatesService.incoterm + "?incoterm=" + this.incoterm).subscribe((res: any) => {
  this.incoterm = res.incoterm.text;
  },
);

//commodity
this.commodityValues =JSON.parse(this.dataStorage.getCommodityDetails());
console.log("datas" +this.commodityValues.commodity);
this.commodity =this.commodityValues.commodity;
    this.httpService.get(this.instantRatesService.commodity + "?commodity=" + this.commodity).subscribe((res: any) => {
    this.commodity = res.commodityName.text;
    },
  );
  // this.commodityValues =JSON.parse(this.dataStorage.getCommodityDetails());
  
  // for(let i =0; i < this.commodityValues.length;i++){
  //     // this.commodityDetails.push(this.commodityValues[i].commodity)
  // }
  //console.log("datas" +this.commodityValues[].commodity);


  this.cargoReady = JSON.parse(this.dataStorage.getReadinessDetails());
  console.log("ready  " +this.cargoReady.readiness);
  console.log("ready  " +this.cargoReady.selectedDate);
//Load type
  this.loadtype = this.dataStorage.getLoadDetails();
  this.loadDetails = JSON.parse(this.loadtype)
  console.log("load  " +this.loadDetails.loadTypeDetailBean[0].equipmentType);
  this.equipmentType = this.loadDetails.loadTypeDetailBean[0].equipmentType;

  for(let i=0;i<this.loadDetails.loadTypeDetailBean.length;i++){
        
    this.eqtypeId = this.loadDetails.loadTypeDetailBean[i].equipmentType;
    this.totalequipId += this.eqtypeId+',';
    console.log(this.totalequipId);
    this.httpService.get(this.instantRatesService.RateEquipName + "?equipmentId=" + this.eqtypeId).subscribe((res: any) => {
      this.equipmentType = res.equipName.equipName;
      if(this.selectedEquip==res.equipName.equipName){
        this.equipmentId=res.equipName.equipType;
        this.equipmentTypeName=res.equipName.equipName;
      }
      if(this.loadDetails.loadTypeDetailBean[i].equipmentType==this.equipmentId && this.Count==0){
          this.quantityValue=this.loadDetails.loadTypeDetailBean[i].quantity;
          this.rateValueFinal=this.rateValue*this.quantityValue;
          this.Count++;
      }
      this.combine = this.equipmentType + " x " + this.loadDetails.loadTypeDetailBean[i].quantity  +" | ";
      this.testName = this.combine.split(" ",3)
      console.log(this.testName);

      this.equipmentNo = this.loadDetails.loadTypeDetailBean[i].quantity;
      this.data += this.combine;
      this.equipName = this.data.substring(9);
       console.log(this.equipName);
     });
    
  }
 
 
  this.freightMode = JSON.parse(this.dataStorage.getWelcomeDetails());
  console.log(this.freightMode);

  this.shipmentMode = JSON.parse(this.dataStorage.getShipmentDetails());
  console.log(this.shipmentMode);

  this.docForm = this.fb.group({
    origin : this.routeDetails.origin,
    destination: this.routeDetails.destination,
    equipType:this.equipmentType,
    freightMode:this.freightMode,
    shipmentMode:this.shipmentMode,
    incoterm:this.incotermsValue.incoterm,
    cargoReadiness:[""],
    commodity:this.commodity,
    numberOfUnits:this.equipmentNo,
    shipper:  [""],
    consignee: [""],
    shipInstruction: [""],
    notifyparty:  [""],
    hsCode:[""]
  })


  console.log(this.instantRate);
}

ngOnDestroy(): void {
  this.unsubscriber.next();
  this.unsubscriber.complete();
}

 booking(){
  if(this.docForm.valid){
    this.instantRate = this.docForm.value;
    console.log(this.instantRate)
    this.instantRatesService.addBooking(this.instantRate);
    this.Service.sendUpdate('Booking Shipment');
    this.dataStorage.clearData();
    this.router.navigate(["instantRates/bookingShipment"]);
  }
  
}

shipper(){
  this.shipperFlag = true
  console.log(this.docForm.value);
}
shipperclose(){
  this.shipperFlag = false
}

notifyParty(){
this.notifyFlag = true
console.log(this.docForm.value);
}
notifyPartyclose(){
  this.notifyFlag = false
}

consignee(){
  this.consigneeFlag = true
  console.log(this.docForm.value);
}
consigneeclose(){
  this.consigneeFlag = false
}


shippingInt(){
  this.shippingIntFlag = true
  console.log(this.docForm.value);
}
shippingIntclose(){
  this.shippingIntFlag = false
}


tabview(){ 
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";  
  }
  const dialogRef = this.dialog.open(LandscapeLoaderComponent, {
    height: "100%",
    width: "100%",
     direction: tempDirection,
  });  
}
  }


 
  


