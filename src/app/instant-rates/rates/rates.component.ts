import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { InstantRatesService } from '../instant-rates.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRates } from '../instant-rates.model';
import { MatDialog } from '@angular/material/dialog';
import { LoadTypeComponent } from '../load-type/load-type.component';
import { RateEditComponent } from '../rate-edit/rate-edit.component';
import { serverLocations } from 'src/app/auth/serverLocations';
import { EncrDecrService } from 'src/app/core/service/encrDecr.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.sass']
})
export class RatesComponent implements OnInit {
  routeDetails :any;
  cargoReady:any;
  loadtype:any;
  loadDetails:any;
  incotermsValue:any;
  commodityValues:any;
  freightMode:any;
  shipmentMode:any;
  data:any;
  combine:String;
  equipName:any;
  output:any;
  cardBottom:any;
 // commodityValues:[]; 
 docForm: FormGroup;
 instantRate : InstantRates;
  origin:any;
  destination: any;
  equipmentType:any;
  commodityDetails:[];
  rateDataList = [];
  equipmentNameList = [{ title: ""}];
  incoterm: any;
  eqtypeId:any;
  totalequipId:any;
  resultsFound:any;
  testarray: any;
  commodity: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,private fb:FormBuilder,
    private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,
    private instantRatesService: InstantRatesService,
    private httpService: HttpServiceService,
    public dialog: MatDialog,
    private serverUrl:serverLocations,
    private EncrDecr:EncrDecrService
    
    ) {}
  ngOnInit() {

     
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          this.cardBottom = '75px'
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.cardBottom = '53px'
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


  //cargo readiness 
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
          this.combine = this.equipmentType + " x " + this.loadDetails.loadTypeDetailBean[i].quantity  +" | ";
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
        origin : this.origin,
        destination: this.destination,
        equipmentType:this.equipmentType,
        loadtype:this.loadtype.equipmentType,
        freightMode:this.freightMode,
        shipmentMode:this.shipmentMode,
        incotermsValue:[""],
        commodityValues:[""],
        incoterm:this.incotermsValue.incoterm,
      })
      this.instantRate = this.docForm.value; 
      
        this.httpService.get(this.instantRatesService.getrateslist + "?origin=" + this.routeDetails.origin +  "&destination=" + this.routeDetails.destination + "&loadtype=" + this.totalequipId.substring(9)).subscribe((res: any) => {
        this.rateDataList = res.lInstantRatesBean;
        this.resultsFound =this.rateDataList.length;
        this.testarray = this.rateDataList.length - this.loadDetails.loadTypeDetailBean.length

        for(let j =0 ;j<this.testarray;j++){
          this.loadDetails.loadTypeDetailBean.push(this.loadDetails.loadTypeDetailBean[j])
        }
  
        for(let i=0;i<this.rateDataList.length;i++){
             this.loadDetails.loadTypeDetailBean[i].value = this.rateDataList[i].unit
             if(this.rateDataList[i].unit == this.loadDetails.loadTypeDetailBean[i].value){
             this.rateDataList[i].totalcost = this.rateDataList[i].rate * this.loadDetails.loadTypeDetailBean[i].quantity;             
          }

        }
        });
      
       
      
  }

  

  rateSummary(detailid:any){
    var encrypted = this.EncrDecr.set(this.serverUrl.secretKey, detailid);
    this.router.navigate(['instantRates/booking/'+ encrypted]);
  }
 
  edit(){

    // this.index = i;
    // this.id = row.itemId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";  
    }
    const dialogRef = this.dialog.open(RateEditComponent, {
      height: "100%",
      width: "100%",
      // data: row,
      direction: tempDirection,
    });
    // this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
    //   this.loadData();

    // });

  }

}


