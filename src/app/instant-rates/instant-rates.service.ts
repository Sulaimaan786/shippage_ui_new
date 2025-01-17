import { Injectable } from '@angular/core';
import { serverLocations } from '../auth/serverLocations';
import { InstantRates } from './instant-rates.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class InstantRatesService {
  dialogData: any;
  constructor(
    private serverUrl: serverLocations, private httpService: HttpServiceService
  ) { }
 
  public originListUl = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getpolList`;

  public airoriginListUl = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getairpolList`;

  public commoditylist = `${this.serverUrl.apiServerAddress}api/auth/instantrates/commoditylist`;

  public incoterms = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getincotermsList`;

  public origin = `${this.serverUrl.apiServerAddress}api/auth/instantrates/origin`;

  public destination = `${this.serverUrl.apiServerAddress}api/auth/instantrates/destination`;

  public incoterm = `${this.serverUrl.apiServerAddress}api/auth/instantrates/incoterm`;

  public equipName = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getequipName`;

  public equipNameList = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getequipNameList`;


  public RateEquipName = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getRateEquipName`; 

  public getrateslist = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getrateslist`;

  public equipmentTypeList  = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getequipmentType`;

  public getratesUniquelist = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getUniqueRateslist`;
  
  public commodity = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getCommodityName`;

  public bookingSave = `${this.serverUrl.apiServerAddress}api/auth/instantrates/bookingSave`;

  public getBookingNo = `${this.serverUrl.apiServerAddress}api/auth/instantrates/getBookingNo`;
 // This is for save
  
 addBooking(instantRates: InstantRates): void {
    this.dialogData = instantRates;
    this.httpService.post<InstantRates>(this.bookingSave, instantRates).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
    });
  }
  
}
