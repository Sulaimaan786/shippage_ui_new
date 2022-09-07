import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { BehaviorSubject } from "rxjs";
import * as XLSX from 'xlsx';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuditService } from '../audit.service';
import { AuthResultBean } from '../audit-log-result-bean';
import { AuditModel } from '../audit-log-model';


@Component({
  selector: 'app-audit-log-list',
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.sass']
})
export class AuditLogListComponent implements OnInit {
  docForm: FormGroup;
  auditModel: AuditModel;
  hide3 = true;
  agree3 = false;
  requestId: number;
  dataarray = [];
  dataarray1 = [];
  minDate: any;
  config: any;
  searchList = [];
  auditLoglist = [];
  title = 'angular-app';
  fileName = 'ExcelSheet.xlsx';
  auditList = [];
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean = false;
  subs: any;
  AuthResultBean: any;

  constructor(private fb: FormBuilder,
    public httpClient: HttpClient,
    private serverUrl: serverLocations,
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private auditService: AuditService
  ) {

  }

  isTblLoading = true;
  ngOnInit(): void {

    this.docForm = this.fb.group({
      object: [""],
      objectId: [""],
      userName: [""],
      setUp: [""],
      ipAddress: [""],
      actions: [""],
      fromDate: [""],
      toDate: [""],
    });

    this.getAllList(this.docForm);

  }

  getAllList(docForm: any): void {
    this.subs.sink = this.httpService.post<AuthResultBean>(this.auditService.getListUrl, this.docForm.value).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.auditLoglist = data.auditLogDetails;

  this.config = {
  itemsPerPage: 5,
  currentPage: 1,
  totalItems: this.auditLoglist.length
}; 
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  searchData() {
    this.httpService.post<AuthResultBean>(this.auditService.searchUrl, this.docForm.value).subscribe((data) => {
      this.auditLoglist = data.auditlist;
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
 
  reset() {
    this.docForm = this.fb.group({
      object: [""],
      objectId: [""],
      setUp: [""],
      userName: [""],
      ipAddress: [""],
      actions: [""],
     // actions: [""],
      fromDate: [""],
      toDate: [""],
      moduleName: [""],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  exportexcel(): void {

    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  pageChanged(event){
    this.config.currentPage = event;
  }

}
