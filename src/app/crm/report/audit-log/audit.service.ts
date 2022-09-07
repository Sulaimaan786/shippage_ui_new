import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuditModel } from './audit-log-model';


@Injectable({
  providedIn: 'root'
})
export class AuditService  extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<AuditModel[]> = new BehaviorSubject<AuditModel[]>(
    []
  );

  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  public getListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/getList`;
  public searchUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/getSearchList`;
  public setUPList = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/setUPList`;
  public getDetails = `${this.serverUrl.apiServerAddress}api/auth/app/auditLog/edit`;

  get data(): AuditModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
}
