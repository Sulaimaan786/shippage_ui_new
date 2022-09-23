import { Injectable } from '@angular/core';
import { serverLocations } from '../auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private serverUrl: serverLocations, ) { }
 // public refIdList = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getRefId`;
  public refIdList = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getRefId`;


  

}
