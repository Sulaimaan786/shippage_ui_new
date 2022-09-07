import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ReturnMemoItemsService } from 'src/app/setup/company-master/return-memo-items/return-memo-items.service';
import { ReturnMemoItems } from 'src/app/setup/company-master/return-memo-items/return-memo-items-model';
import { AddReturnMemoItemsComponent } from 'src/app/setup/company-master/return-memo-items/add-return-memo-items/add-return-memo-items.component';
import { InvoiceService } from '../invoice-service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-invoice-return',
  templateUrl: './invoice-return.component.html',
  styleUrls: ['./invoice-return.component.sass']
})
export class InvoiceReturnComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "ndcupcCode",
    "quantity",
    "price", 
    "expDate",
    "actions"
  ];

  listReturnMemoItems =[];
  exampleDatabase: ReturnMemoItemsService | null;
  selection = new SelectionModel<ReturnMemoItems>(true, []);
  index: number;
  id: number;
  requestId:any;
  companyCode:any;
  docForm: FormGroup;
  returnMemoItems: ReturnMemoItems | null;
  showHead:boolean=true;
  invoiceAddLists =[];
  saveFlag:boolean=true;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public invoiceService: InvoiceService,
    public returnMemoItemsService: ReturnMemoItemsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
  ) {
    super();
    this.docForm = this.fb.group({
      companyId: [""],
      returnMemoNo: [""],
      receivedval: [""],
      manufacturerCode: [""],
      orderId: [""],
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  returnItemName:any;
  
  
  ngOnInit(): void {
   

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.companyCode = params.id2;
       this.docForm.patchValue({
        'returnMemoNo' : this.requestId,
        'companyId' : this.companyCode,
        'orderId' : this.requestId,
        'manufactureCode' : this.requestId,

     })
       
      }
     });

     this.getInvoice();
  }


  getInvoice(){
    this.httpService.get<any>(this.invoiceService.getInvoiceGet,this.docForm.value).subscribe(
      (data) => {
        this.POSTS = data.invoiceAddLists;
        if(this.POSTS.length>0)
        {
if(this.POSTS[0].receivedValue != null)
{
this.saveFlag =false;
}
else{
  this.saveFlag =true;

}
        }
      },

      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
    }
 

    saveValue(){
      for (let i = 0; i < this.POSTS.length; i++) {
        this.POSTS[i].orderId = this.requestId;
      }
      this.httpService.post<any>(this.invoiceService.saveInvoiceValue,this.POSTS).subscribe(
        (data) => {
          

          this.POSTS = data.invoiceLists;
          if(data.success){
            this.showNotification(
              "snackbar-success",
              "Data Saved",
              "bottom",
              "center"
            );
            this.getInvoice();

            
          }else{
            
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        
        );
      
      }



      updateValue(){
        for (let i = 0; i < this.POSTS.length; i++) {
          this.POSTS[i].orderId = this.requestId;
        }
        this.httpService.post<any>(this.invoiceService.updateInvoiceValue,this.POSTS).subscribe(
          (data) => {
            
  
            this.POSTS = data.invoiceLists;
            if(data.success){
              this.showNotification(
                "snackbar-success",
                "Data Updated",
                "bottom",
                "center"
              );
              this.getInvoice();

            }else{
              
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
          
          );
        
        }

      reset(){
        this.docForm.patchValue({
          'returnMemoNo' : this.requestId,
          'companyId' : this.companyCode,
          'orderId' : this.requestId,
          'manufactureCode' : this.requestId,
       })
       this.POSTS=[];
    
      }
      
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }


  returnMemo(){   
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const obj={
      type:'Add',
      returnMemoNo: this.docForm.value.returnMemoNo
    }
    
    const dialogRef = this.dialog.open(AddReturnMemoItemsComponent, {
      height: "90%",
      width: "80%",
      data: obj,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      setTimeout(() => {
      }, 100);
        this.showNotification(
          "snackbar-success",
          "Record Saved Successfully...!!!",
          "bottom",
          "center"
        );
      
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


  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

// context menu
  onContextMenu(event: MouseEvent, item: ReturnMemoItems) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }


  cancel()
  {
    this.router.navigate(['crm/report/controlledSubstance/invoiceReport/addInvoice']);

  }
}
