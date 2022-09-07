import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ShippingLablesForm } from './shippingLables-models';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ShippingLablesService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<ShippingLablesForm[]> = new BehaviorSubject<ShippingLablesForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public shipping = `${this.serverUrl.apiServerAddress}api/auth/app/report/getShippingLables`;
  public shippingExport = `${this.serverUrl.apiServerAddress}api/auth/app/report/getShippingExport`;
  get data(): ShippingLablesForm[] {
    return this.dataChange.value;
  }
 

}