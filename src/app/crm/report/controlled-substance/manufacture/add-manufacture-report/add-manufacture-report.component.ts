import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { InventoryformService } from '../../inventory-report/inventory-service';
import { CommonService } from 'src/app/common-service/common.service';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { DeaformService } from '../../deaform41/deaform.service';
import { DEAForm } from '../../deaform41/deaform-model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
    
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-manufacture-report',
  templateUrl: './add-manufacture-report.component.html',
  styleUrls: ['./add-manufacture-report.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
      },
  } },CommonService
  ]
})
export class AddManufactureReportComponent implements OnInit {
  [x: string]: any;

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  docForm: FormGroup;
  exampleDatabase: DeaformService | null;
  dEAForm:DEAForm;
  requestId: any;
  searchList=[];
  companyList =[];
  debitMemoList =[];
  hideFlag = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private inventoryformService:InventoryformService,
    private httpService: HttpServiceService,
    public deaformService:DeaformService,
    public route: ActivatedRoute,
    public commonService: CommonService,
    public debitmemoService: DebitmemoService,
    private tokenStorage: TokenStorageService,

    ) 
    {
    this.docForm = this.fb.group({
      company: ["", [Validators.required]],
      returnMemoNo: "",
      startDateObj: "",
      startDate:"",
      endDateObj:"",
      endDate:"",
      reportType:"INV",
      report:"Inventory Report",
      pdf:"Inventoy",

    });
  }
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
      }
     });

    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
        this.docForm.patchValue({
          'company' : this.requestId,
       })
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

        setTimeout(() => {
        this.debitMemoDropdownList(this.requestId);
      }, 700);
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

  hide()
    {
     this.hideFlag=true;
    }

  searchData(){
      this.httpService.post<any>(this.deaformService.saveSechdule, this.docForm.value).subscribe(
        (data) => {
          this.searchList= data.listSearchBean;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );
    }

  reset(){
      this.docForm.patchValue({
        'company' : '',
        'returnMemoNo' : '',
        'startDateObj' :'',
        'startDate':'',
        'endDateObj':'',
        'endDate':'',
        'reportType':"INV",
        'pdf':"Inventoy"
     })
     this.page = 1;
     this.searchData();   
     this.searchList= [];
     this.hideFlag = false;
 }
   
//Export PDF
openPDF() {    
    
    this.httpService.post<any>(this.inventoryformService.exportPDF, this.docForm.value).subscribe(
      (data) => {
        const doc = new jsPDF();
    var html = htmlToPdfmake(data.exportPDF);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
}

generateExcel() {

  //Excel Title, Header, Data
  const title = 'Inventory';
  const header1 = ["Return Name", "Created",]
  const header = ["NDC/UPC", "Description", "Control", "Strength", "Lot", "Exp Date", "Pkg Size", "Full Qty", "Partial Qty"]
  //Create workbook and worksheet
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Car Data');


  //Add Row and formatting
  let titleRow = worksheet.addRow([title]);
  titleRow.font = { size: 15, bold: true }
  worksheet.addRow([]);

  //Blank Row 
  worksheet.addRow([]);

  //Add Header Row
  let headerRow1 = worksheet.addRow(header1);

  let headerRow = worksheet.addRow(header);


  
    // Cell Style : Fill and Border
    headerRow1.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
  
  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    }
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  })


  // worksheet.addRows(data);


  // Add Data and Conditional Formatting
  this.searchList.forEach(d => {
    this.dataList = [];

      this.dataList.push(d.ndcupcCode,d.description,d.controlClass,d.strength,d.lotNo,d.expDate,d.pakageSize,d.fullQuantity,d.partialQuantity);
    // });
    let row = worksheet.addRow(this.dataList);
    let qty = row.getCell(5);

  }

  );

  worksheet.getColumn(3).width = 30;
  worksheet.getColumn(4).width = 30;
  worksheet.addRow([]);


  //Footer Row
  // let footerRow = worksheet.addRow([]);

//   footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
//  }

  //Merge Cells
  // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

  //Generate Excel File with given name
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'Inventory.xlsx');
  })

}

getDateString(event,inputFlag,index){
  let cdate = this.commonService.getDate(event.target.value);
  if(inputFlag=='startDate'){
    this.docForm.patchValue({startDate:cdate});
  }
 
}

getDateStringEnd(event,inputFlag,index){
  let cdate = this.commonService.getDate(event.target.value);
  if(inputFlag=='endDate'){
    this.docForm.patchValue({endDate:cdate});
  }
 
}

}

