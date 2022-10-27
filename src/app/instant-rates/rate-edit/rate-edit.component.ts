import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/auth/data-storage';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { InstantRates } from '../instant-rates.model';
import { InstantRatesService } from '../instant-rates.service';

@Component({
  selector: 'app-rate-edit',
  templateUrl: './rate-edit.component.html',
  styleUrls: ['./rate-edit.component.sass']
})
export class RateEditComponent implements OnInit {
  docForm: FormGroup;
  equipmentTypeList = [];
  incotermList = [];
  podList =[];
  polList =[];
 instantRate : InstantRates; 
  commodityDetails = [];
  rateDataList = [];
  equipmentNameList = [{ title: ""}]; 
  loadTypeDetailBean: any;
  routeDetails: any;
  destination: any;
  loadtype: any;
  loadDetails: any;
  equipmentType: any;
  eqtypeId: any;
  totalequipId: string;
  combine: string;
  data: string;
  equipName: string;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,private instantRatesService : InstantRatesService, public dialogRef: MatDialogRef<RateEditComponent>) { }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      control:[""],
      origin:[""],
      destination:[""],

      loadTypeDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:["", [Validators.required]],
          quantity:["", [Validators.required]],
          cargoWeight:["", [Validators.required]],
          value:[""],
        })
      ]),


    })
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.equipmentTypeList).subscribe(
      (data) => {
       
        this.equipmentTypeList = data.lInstantRatesBean;
      },

   );
       //Route Details  
       this.routeDetails =JSON.parse(this.dataStorage.getrouteDetails());
       console.log("route origin" +this.routeDetails.origin);
    
       this.docForm.patchValue({
        'origin':  this.routeDetails.origin,
       })
  
     console.log("route destination" +this.routeDetails.destination);
     this.destination = this.routeDetails.destination;
     this.docForm.patchValue({
      'destination':  this.routeDetails.destination,
     })

     //Load type
     this.loadtype = this.dataStorage.getLoadDetails();
     this.loadDetails = JSON.parse(this.loadtype)
     console.log("load  " +this.loadDetails.loadTypeDetailBean[0].equipmentType);

     let salesOrderDtlArray = this.docForm.controls.loadTypeDetailBean as FormArray;
     salesOrderDtlArray.removeAt(0);
     this.loadTypeDetailBean = this.loadDetails.loadTypeDetailBean;
     this.loadTypeDetailBean.forEach(element => {
       let salesOrderDtlArray = this.docForm.controls.loadTypeDetailBean as FormArray;
       let arraylen = salesOrderDtlArray.length;
       let newUsergroup: FormGroup = this.fb.group({
      
        equipmentType: [element.equipmentType],
        quantity: [element.quantity],
        cargoWeight: [element.cargoWeight]

       })
       salesOrderDtlArray.insert(arraylen, newUsergroup);

     });

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

    // orginList
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.originListUl).subscribe(
      (data) => {
       
        this.polList = data.lInstantRatesBean;
        this.podList = data.podlist;
      },

   );
  }

  addRow(){
    let loadTypeDetailBeanArray = this.docForm.controls.loadTypeDetailBean as FormArray;
    let arraylen = loadTypeDetailBeanArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      equipmentType:[""],
      quantity:[""],
      cargoWeight:[""],
      value:[""]
    })
    loadTypeDetailBeanArray.insert(arraylen,newUsergroup);
  }
  
  removeRow(index){
    let loadTypeDetailBeanArray = this.docForm.controls.loadTypeDetailBean as FormArray;
    loadTypeDetailBeanArray.removeAt(index);
  
  }
  // onClick(): void {  
  //   this.dialogRef.close();
  //   location.reload();
  // }
  

  editdone(){
    this.dataStorage.saverouteDetails(JSON.stringify(this.docForm.value));
    this.dataStorage.setLoadDetails(JSON.stringify(this.docForm.value)); 
    this.dialogRef.close();
    location.reload();
  }
}
