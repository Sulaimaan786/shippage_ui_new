import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { InventoryformService } from '../../inventory-report/inventory-service';
import { CommonService } from 'src/app/common-service/common.service';
import jsPDF from 'jspdf';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { DeaformService } from '../../deaform41/deaform.service';
import { DEAForm } from '../../deaform41/deaform-model';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-add-non-returnable-product-report',
  templateUrl: './add-non-returnable-product-report.component.html',
  styleUrls: ['./add-non-returnable-product-report.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
      },
  } },CommonService
  ]
})
export class AddNonReturnableProductReportComponent implements OnInit {

  [x: string]: any;

  docForm: FormGroup;
  exampleDatabase: DeaformService | null;
  dEAForm:DEAForm;
  requestId: any;
  searchList=[];
  companyList =[];
  debitMemoList =[];
  showHead:boolean=false;

  
  companyName;
  returnMemoName;
  returnMemoNo;
  createdOn;
  returnMemoNoFlag:boolean = false; 
  startDateFlag:boolean = false;  
  endDateFlag:boolean = false;  
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private inventoryformService:InventoryformService,
    private httpService: HttpServiceService,
    public deaformService:DeaformService,
    public route: ActivatedRoute,
    public commonService: CommonService,
    public debitmemoService: DebitmemoService,
    private snackBar: MatSnackBar,
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
      reportType:"NR",
      report:"Non Returnable Report",
      pdf:"NonReturnable"
    });
  }
 
  @ViewChild('htmlData') htmlData!: ElementRef;
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
        if(this.tokenStorage.getPharmaciesType()=='SELECTED'){
          this.companyList = data;

            this.companyName = data.find(x => x.id == this.tokenStorage.getCustomerCompanyCode())?.name
     this.name=this.tokenStorage.getCustomerCompanyCode();
            this.selectedFlag = true;
        }else{
          this.companyList = data;
       this.selectedFlag = false;    
        }
        
        this.docForm.patchValue({
          'company' : this.name,
       })
       this.debitMemoDropdownList(this.name);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

        setTimeout(() => {
          if(this.requestId!=undefined)
          {
            this.debitMemoDropdownList(this.requestId);
          }
          if(this.tokenStorage.getPharmaciesType()=='SELECTED'){
            this.searchData();
            }    
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

  searchData(){
    if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {
        this.httpService.post<any>(this.deaformService.saveSechdule, this.docForm.value).subscribe(
          (data) => {
            this.searchList= data.headerSearchBean;
            if(this.docForm.controls.returnMemoNo.value != null && this.docForm.controls.returnMemoNo.value != '')
            {
            this.returnMemoNoFlag =true;
            }
            if(this.docForm.controls.startDate.value != null && this.docForm.controls.startDate.value != '')
            {
              this.startDate = this.docForm.controls.startDate.value;
            this.startDateFlag =true;
            }
            if(this.docForm.controls.endDate.value != null && this.docForm.controls.endDate.value != '')
            {
            this.endDate = this.docForm.controls.endDate.value;
            this.endDateFlag =true;
            }
            
            this.companyName=data.headerSearchBean[0].searchBeanDetailsList[0].companyName;
            this.createdOn=data.headerSearchBean[0].searchBeanDetailsList[0].createdOn;
            this.returnMemoName=data.headerSearchBean[0].searchBeanDetailsList[0].returnMemoName;
            this.returnMemoNo=data.headerSearchBean[0].searchBeanDetailsList[0].returnMemoNo;            
            if(this.searchList.length>0)
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
        else
        {
          this.showHead=false;
  
          this.showNotification(
            "snackbar-danger",
            "Please Choose Any Company!.",
            "top",
            "right"
          );      
        }
      }


allFilter()
    {
      this.searchData();
    }




    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 3000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    } 
  
  
//Export PDF
openPDF() {    
  if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "")
  {  
       this.httpService.post<any>(this.inventoryformService.exportPDF, this.docForm.value).subscribe(
         (data) => {
           const doc = new jsPDF();
    
    
     var html = htmlToPdfmake(data.exportPDF,{defaultStyles:{
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
       else
       {
         this.showNotification(
           "snackbar-danger",
           "Please Choose Any Company!.",
           "top",
           "right"
         );      
       }
      }

reset(){
  this.docForm.patchValue({
    'company' : '',
    'returnMemoNo' : '',
    'startDate':'',
    'endDate':'',
    'startDateObj':'',
    'endDateObj':'',
    'reportType':"NR",
    'pdf':"NonReturnable",

 })
 this.showHead= false;
 this.searchList=[];

     this.returnMemoNoFlag= false;
     this.startDateFlag= false;
     this.endDateFlag= false;
     this.companyName = []
     this.createdOn=[];
     this.returnMemoName=[];
     this.returnMemoNo=[];
     this.startDate=[];
     this.endDate=[];

}

 generateExcel() {
 if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "")
  { 
  //Excel Title, Header, Data
  const title = 'NonReturnable';
  const header1 = ["Return Name", "Created",]
  const header = ["NDC/UPC", "Description", "Strength", "Dsg", "Lot#", "Exp Date", "Pkg Size", "Full Qty", "Partial Qty", "Price", "Total"]
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

      this.dataList.push(d.ndcupcCode,d.description,d.strength,d.dosage,d.lotNo,d.expDate,d.pakageSize,d.fullQuantity,d.partialQuantity,d.price);
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
    fs.saveAs(blob, 'NonReturnable.xlsx');
  })
}
else
{
  this.showNotification(
    "snackbar-danger",
    "Please Choose Any Company!.",
    "top",
    "right"
  );      
}

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

