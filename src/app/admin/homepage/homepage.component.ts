import { CompanyMasterService } from './../../setup/company-master/company-master.service';
import { CompanyMaster } from './../../setup/company-master/company-model';
import { DeleteCompanyMasterComponent } from './../../setup/company-master/list-company-master/delete-company-master/delete-company-master.component';

import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

declare var window: any;


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "companyName",
    "companyDba",
    "companyStreet",
    "companyCity", 
    "companyState",
    "companyPincode", 
    "companyContact",
    "companyEmailID",
    "companyPhone",
  "defNumber",
    "companyFacilityType",
    "actions"
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: CompanyMasterService | null;
  selection = new SelectionModel<CompanyMaster>(true, []);
  index: number;
  
  id: number;
  companyMaster: CompanyMaster | null;
  rowCompanyCode:any;
  formModal: any;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public companyMasterService: CompanyMasterService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    private tokenStorage: TokenStorageService,
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
 
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  today = moment().format('YYYY-MM-DD');
 // roleList:this.tokenStorage.getAuthorities();
 roleList:any;
 isRoleAdmin:boolean;

  ngOnInit(): void {
  
    this.roleList = this.tokenStorage.getAuthorities();
    for(let i=0;i<this.roleList.length; i++){
      if(this.roleList[i].roleId==1){
        this.isRoleAdmin = true;
        break;
      }else{
        this.isRoleAdmin = false;
      }
    }
    
    this.loadData();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CompanyMasterService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }


  editCall(row) {
    this.router.navigate(['/setup/companyMaster/addCompanyMaster/'+ row.companyCode]);
  }

  deleteItem(row){ 
    this.id = row.companyCode;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteCompanyMasterComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
      disableClose: true
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if(data.data==true){
      this.loadData();
        this.showNotification(
          "snackbar-success",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      }else if(data.data==false || data==1){
          this.showNotification(
            "snackbar-danger",
            "Record Not Deleted...!!!",
            "bottom",
            "center"
          );
      }
    });
  
  }


  returnMemo(row){
    var todaydate = new Date(this.today);
    var expirationDate = new Date(row.defExpirationDate);
    
    todaydate.setUTCHours(0, 0, 0, 0);
    expirationDate.setUTCHours(0, 0, 0, 0);

    if(todaydate.getTime()>expirationDate.getTime()) {
      this.rowCompanyCode=row.companyCode;
      this.formModal.show();
    }else{
      this.router.navigate(['/setup/debitMemo/listDebitMemo/'+ row.companyCode]);
    }
  }

  companyDetailsUpdateNow() {
    this.formModal.hide();
    this.router.navigate(['/setup/companyMaster/addCompanyMaster/'+ this.rowCompanyCode]);
   
  }

  companyDetailsUpdateLater() {
    this.formModal.hide();
    this.router.navigate(['/setup/debitMemo/listDebitMemo/'+ this.rowCompanyCode]);   
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

// context menu
  onContextMenu(event: MouseEvent, item: CompanyMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<CompanyMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CompanyMaster[] = [];
  renderedData: CompanyMaster[] = [];
  constructor(
    public exampleDatabase: CompanyMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CompanyMaster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCompany();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((companyMaster: CompanyMaster) => {
            const searchStr = (
              companyMaster.companyName +
              companyMaster.companyDba +
              companyMaster.companyStreet +
              companyMaster.companyCity +
              companyMaster.companyState +
              companyMaster.companyPincode +
              companyMaster.companyContact +
              companyMaster.companyEmailID +
              companyMaster.companyPhone +
              companyMaster.defNumber +
              companyMaster.companyFacilityType 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: CompanyMaster[]): CompanyMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "companyName":
          [propertyA, propertyB] = [a.companyName, b.companyName];
          break;
          case "companyDba":
            [propertyA, propertyB] = [a.companyDba, b.companyDba];
            break;
            case "companyStreet":
              [propertyA, propertyB] = [a.companyStreet, b.companyStreet];
              break;


              case "companyCity":
                [propertyA, propertyB] = [a.companyCity, b.companyCity];
                break;
                case "companyState":
                  [propertyA, propertyB] = [a.companyState, b.companyState];
                  break;
                  case "companyPincode":
                    [propertyA, propertyB] = [a.companyPincode, b.companyPincode];
                    break;


                    case "companyContact":
                      [propertyA, propertyB] = [a.companyContact, b.companyContact];
                      break;
                        case "companyPhone":
                          [propertyA, propertyB] = [a.companyPhone, b.companyPhone];
                          break;


                          case "defNumber":
                        [propertyA, propertyB] = [a.defNumber, b.defNumber];
                        break;
                        case "companyFacilityType":
                          [propertyA, propertyB] = [a.companyFacilityType, b.companyFacilityType];
                          break;
              
              
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }

  

}