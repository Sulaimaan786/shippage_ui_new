import { Injectable } from '@angular/core';
import { serverLocations } from '../auth/serverLocations';

@Injectable({
  providedIn: 'root'
})
export class InstantRatesService {

  constructor(
    private serverUrl: serverLocations, 
  ) { }
 
  public originListUl = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getpolList`;

  public airoriginListUl = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getairpolList`;

  public commoditylist = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/commoditylist`;

  public incoterms = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getincotermsList`;

  public origin = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/origin`;

  public destination = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/destination`;

  public incoterm = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/incoterm`;
  
}
