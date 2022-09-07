import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { PackingFormService } from '../../packing-slip/packingSlip-service';
import { CommonService } from 'src/app/common-service/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common'
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-schedule-iireturn-request',
  templateUrl: './add-schedule-iireturn-request.component.html',
  styleUrls: ['./add-schedule-iireturn-request.component.sass']
})
export class AddScheduleIIReturnRequestComponent implements OnInit {

  [x: string]: any;
  
  docForm: FormGroup;
  requestId: any;
  packingSlipList= [];
  companyList = [];
  debitMemoList = [];
  fileName= 'ExcelSheet.xlsx';
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [3, 6, 9, 12];
  showHideFlagForReturnMemoNo:boolean=false;
  showHideFlagForStartDate:boolean=false;
  showHideFlagForEndDate:boolean=false;

  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private httpService: HttpServiceService, 
    private packingFormService:PackingFormService,
    public route: ActivatedRoute,
    public datepipe: DatePipe,
    private snackBar: MatSnackBar,
    public commonService: CommonService,
    private tokenStorage: TokenStorageService,

    ) 
    {
    this.docForm = this.fb.group({
      company: ["", [Validators.required]],
      returnMemoNo: "",
      startDate:"",
      endDate:"",
      startDateVal:"",
      endDateVal:"",
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


  searchData(){
if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {

  if(this.docForm.value.startDate != undefined && this.docForm.value.startDate != null && this.docForm.value.startDate != ""){
    this.docForm.patchValue({
         'startDateVal': this.commonService.getDate(this.docForm.value.startDate)
    });
  }

  if(this.docForm.value.endDate != undefined && this.docForm.value.endDate != null && this.docForm.value.endDate != ""){
    this.docForm.patchValue({
         'endDateVal': this.commonService.getDate(this.docForm.value.endDate)
    });
  }

      this.httpService.post<any>(this.packingFormService.getPackingSlipList, this.docForm.value).subscribe(
        (data) => {
          
        if(this.docForm.value.returnMemoNo != undefined && this.docForm.value.returnMemoNo != null && this.docForm.value.returnMemoNo !='') {
          this.showHideFlagForReturnMemoNo=true;
          }else{
            this.showHideFlagForReturnMemoNo=false;
          } 


          if(this.docForm.value.startDate != undefined && this.docForm.value.startDate != null && this.docForm.value.startDate != ""){
            this.showHideFlagForStartDate=true;
          }else{
            this.showHideFlagForStartDate=false;
          } 
      
          if(this.docForm.value.endDate != undefined && this.docForm.value.endDate != null && this.docForm.value.endDate != ""){
            this.showHideFlagForEndDate=true;
          }else{
            this.showHideFlagForEndDate=false;
          } 
          
          console.log(data.packingSlip);
          this.packingSlipList= data.packingSlip;
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

reset(){
      this.docForm.patchValue({
        'company' : '',
        'returnMemoNo' : '',
        'startDate':'',
        'endDate':'',
     })
     this.page = 1; 
     this.packingSlipList= []; 
     this.showHead=false;
 }


 onTableDataChange(event: any) {
  this.page = event;
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
} 

     generateExcel() {
      if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "")
      {

      //Excel Title, Header, Data
      const title = 'ScheduleII';
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
      this.packingSlipList.forEach(d => {
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
        fs.saveAs(blob, 'ScheduleII.xlsx');
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

    //added by gokul for print
    printComponent() {
      if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {

      let newWin;
      var content = document.getElementById('scheduleII').innerHTML;
      var combined = document.createElement('div');
      combined.innerHTML = content; 
      combined.id = 'new';
      newWin= window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      newWin.document.open();
          newWin.document.write(`
          <html>
          <head>
            <title>Print tab</title>            
            <meta charset="utf-8">
            <link rel="icon" type="image/x-icon" href="../favicion.png">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Base64/1.1.0/base64.min.js"></script>
    
            <style type="text/css">
              input {
                  outline: 0;
                  border-width: 0 0 2px;
                  width: 100px;
              }
        
              @page {
                  size: auto;
                  margin: 5mm;
              }
              
              @media print {
                .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
                  float: left;
              }
              .col-md-12 {
                    width: 100%;
              }
              .col-md-11 {
                    width: 91.66666667%;
              }
              .col-md-10 {
                    width: 83.33333333%;
              }
              .col-md-9 {
                    width: 75%;
              }
              .col-md-8 {
                    width: 66.66666667%;
              }
              .col-md-7 {
                    width: 58.33333333%;
              }
              .col-md-6 {
                    width: 50%;
              }
              .col-md-5 {
                    width: 41.66666667%;
              }
              .col-md-4 {
                    width: 33.33333333%;
              }
              .col-md-3 {
                    width: 25%;
              }
              .col-md-2 {
                    width: 16.66666667%;
              }
              .col-md-1 {
                    width: 8.33333333%;
              }
              .reportHeading {
                font-size: 19px;
                text-align: center;
                font-family: 'Times New Roman', Times, serif;
                text-decoration-line: underline;
                text-decoration-line: bold;
                font-weight:bold;
            }
            
            .subreportHeading {
                font-size: 16px;
                text-align: center;
                font-family: 'Times New Roman', Times, serif;
                width: 26%;
                border: 2px solid black;
                font-weight: bolder;
                
            }
            .reportTitle{
                font-size: 16px;
                text-align: left;
                font-family: 'Times New Roman', Times, serif;
                font-weight: bolder;
            }
            
            
            .instructionTitle{
                font-size: 16px;
                text-align: center;
                font-family: 'Times New Roman', Times, serif;
                font-weight: bolder;
                text-decoration: underline;
            }
            
            .instructionContent{
                font-size: 15.6px;
                font-family: 'Times New Roman', Times, serif;
                font-weight: 400;
            }
            
              }
          </style>
        </head>
        <body onload="window.print();window.close()">${combined.outerHTML}</body>
        </html>`        
           );
      newWin.document.close();
      
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
}

