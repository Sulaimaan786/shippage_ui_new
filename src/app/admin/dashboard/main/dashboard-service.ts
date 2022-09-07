import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DashboardForm } from './dashboard-models';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DashboardFormService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<DashboardForm[]> = new BehaviorSubject<DashboardForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public dashboardListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getDashboard`;



  


  get data(): DashboardForm[] {
    return this.dataChange.value;
  }
 


}