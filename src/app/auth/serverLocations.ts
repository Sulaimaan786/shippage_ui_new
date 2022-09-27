import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class serverLocations {
  apiServerAddress: any;
  secretKey: any;
  constructor() {
    this.secretKey = 7061737323313233;
    
    if (window.location.hostname === 'localhost') {
      //Local
  this.apiServerAddress = 'http://localhost:8098/';
   // this.apiServerAddress = 'http://65.108.201.61:8090/shippage/';
    } else if(window.location.hostname === '213.42.28.15'){
      this.apiServerAddress = 'http://65.108.201.61:8090/shippage/';
    }else if(window.location.hostname === '192.168.5.100'){
      this.apiServerAddress = 'http://65.108.201.61:8090/drug/';
    }
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];
