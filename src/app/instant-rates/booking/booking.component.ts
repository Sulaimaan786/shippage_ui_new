import { Component, OnInit,Inject,Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';
import { InstantRatesService } from '../instant-rates.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncryptionService } from 'src/app/core/service/encrypt.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {
  routeDetails :any;
  cargoReady:any;
  loadtype:any;
  loadDetails:any;
  incotermsValue:any;
  commodityValues:any;
  freightMode:any;
  shipmentMode:any;

  origin:any;
  destination: any;
  equipmentType:any;
  commodityDetails:[];
  incoterm: any;
  equipmentNo:any;
  
  detailid:number;
  rateDataList:[];

  eqtypeId:any;
  totalequipId:any;
  combine:String;
  data:any;
  equipName:any;
  testName:any;

  requestId: any;
  decryptRequestId: any;
  selectedEquip: any;
  quantityValue: any;
  equipmentId: any;
  Count=0;
  rateValue: any;
  rateValueFinal: number;
  equipmentTypeName:any;
  commodity:any;

  grid:any;
  justifyCenter:any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,
    private instantRatesService: InstantRatesService,
    private httpService: HttpServiceService,
    public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,	
    private encryptionService:EncryptionService	
    ) {}

  ngOnInit() {

  //view   
  this.route.params.subscribe(params => {if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
      this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
     //For User login Editable mode
     this.getRatesData(this.requestId) ;
    }
    else{
      
    }
   });
   
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          this.grid = 'grid'
          this.justifyCenter = 'center'
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.grid = 'grid'
          this.justifyCenter = 'block'
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
    this.httpService.get(this.instantRatesService.equipName + "?equipmentId=" + this.eqtypeId).subscribe((res: any) => {
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
  }

  getRatesData(detailid:any):void{
    this.httpService.get(this.instantRatesService.getratesUniquelist+"?rateList="+encodeURIComponent(this.encryptionService.encryptAesToString(detailid, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
      this.rateDataList = res.rateDataList;
      this.rateValue=res.rateDataList[0].rate;
      this.selectedEquip= res.rateDataList[0].equipName;
      this.loadtype = this.dataStorage.getLoadDetails();
      this.loadDetails = JSON.parse(this.loadtype);
    //  this.equipmentNo = res.rateDataList[0].equipName + " x " + this.loadDetails.loadTypeDetailBean.quantity;
      });
  }


  back(){
    this.router.navigate(["instantRates/rates"]);
  }

  bookingShipment(){
    this.router.navigate(["instantRates/rateSummary"]);
  }

  edit(){
    // let tempDirection;
    // if (localStorage.getItem("isRtl") === "true") {
    //   tempDirection = "rtl";
    // } else {
    //   tempDirection = "ltr";  
    // }
    // const dialogRef = this.dialog.open(RateEditComponent, {
    //   height: "100%",
    //   width: "100%",
    //   // data: row,
    //   direction: tempDirection,
    // });
  }


}