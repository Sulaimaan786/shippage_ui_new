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
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonService } from 'src/app/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DebitMemo } from 'src/app/setup/company-master/debit-memo/debitmemo-model';
import { InvoiceService } from '../invoice-service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass']
})
export class InvoiceComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  [x: string]: any;

  displayedColumns = [
    "company",
    "returnMemoDate",
    "returnMemoName", 
    "returnMemoNo",
    "actions"
  ];
  companyList =[];
  debitMemoList =[];
  listDebitMemo =[];
  receiptList=[];
  
  exampleDatabase: InvoiceService | null;
  selection = new SelectionModel<DebitMemo>(true, []);
  index: number;
  id: number;
  requestId: any;
  debitMemo: DebitMemo | null;
  docForm: FormGroup;
  showHead:boolean=false;
  selectedFlag:boolean = false;    

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private httpService:HttpServiceService,
    public router: Router,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
  ) {
    super();
    this.docForm = this.fb.group({
      company: [""],
      returnMemoNo: [""],
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

  ngOnInit(): void {

    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        if(this.tokenStorage.getPharmaciesType()=='SELECTED'){
          this.selectedFlag = true;
          this.companyList = data;
          this.docForm.patchValue({
            'company' : this.tokenStorage.getCustomerCompanyCode(),
         })
         this.debitMemoDropdownList(this.tokenStorage.getCustomerCompanyCode());
         this.searchData();
        }else{
          this.companyList = data;
          this.selectedFlag = false;    
        }
        
        
       
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

   
  }



  debitMemoDropdownList(companyId){
  this.httpService.get<any>(this.commonService.getdebitMemoDropdownList+"?companyId="+companyId).subscribe(
    (data) => {
      this.debitMemoList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
    );
  }

  radioShip(value)
  {
    this.receiptList.push(value);
  }

  searchData(){

    this.httpService.post<any>(this.invoiceService.getInvoiceList, this.docForm.value).subscribe(
      (data) => {
        this.POSTS = data.invoiceList;
        if(this.POSTS.length>0)
        {
          this.showHead =true;
        }
        else
        {
          this.showHead =false;

        }
      },

      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
     
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.searchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.searchData();
  }


  returnMemoItems(row){
    this.router.navigate(['crm/report/controlledSubstance/invoiceReport/invoiceReturn/'+ row.returnMemoNo+'/'+row.companyCode]);
  }

  reset(){
    this.docForm.patchValue({
      'company' : this.requestId,
      'returnMemoNo' : ''
   })
   this.POSTS=[];
   this.showHead= false;

  }

  
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }




//Export PDF
openPDF() {    
  {  
       this.httpService.post<any>(this.invoiceService.openReceipt, this.docForm.value).subscribe(
         (data) => {
           const doc = new jsPDF();
    
    
     var html = htmlToPdfmake(data.openReceipt,{defaultStyles:{
       columns: [
           { width: '*', text: '' },
           {
               width: 'auto',
                   table: {
                           body: [
                                   ['Column 1', 'Column 2', 'Column 3'],
                                   ['One value goes here', 'Another one here', 'OK?']
                           ]
                   }
           },
           { width: '*', text: '' },
       ]
     }
     
   });
      
     const documentDefinition = { content: html };
     pdfMake.createPdf(documentDefinition).open(); 
      
        
         }, error => {
           console.log(error);
           this.helper.errorMessage(error);
         })
       
      }

    }

  }