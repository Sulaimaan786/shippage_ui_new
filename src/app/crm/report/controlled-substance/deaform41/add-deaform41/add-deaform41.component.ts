import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { DeaformService } from '../deaform.service';
import { InventoryformService } from '../../inventory-report/inventory-service';
import { DEAForm } from '../deaform-model';
import { CommonService } from 'src/app/common-service/common.service';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
  selector: 'app-add-deaform41',
  templateUrl: './add-deaform41.component.html',
  styleUrls: ['./add-deaform41.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
      },
  } },CommonService
  ]
})
export class AddDEAForm41Component implements OnInit {

  [x: string]: any;

  docForm: FormGroup;
  exampleDatabase: DeaformService | null;
  dEAForm:DEAForm;
  requestId: any;
  searchList= [];
  companyList = [];
  debitMemoList = [];
  fileName= 'ExcelSheet.xlsx';
  selectedFlag:boolean = false; 
  showCheckbox:boolean = false;    

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
      startDate:"",
      startDateObj:"",
      endDateObj:"",
      endDate:"",
      controlType:"",
      returnType:"",
      isfuturedate:"",
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

  showCheck(){
    if(this.docForm.controls.returnType.value=='NR'){
    this.showCheckbox=true;
    } else {
      this.showCheckbox=false;
    }
  }

  searchData(){
    if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {
       if(this.docForm.controls.isfuturedate.value=='')
       {
        this.docForm.patchValue({
          'isfuturedate': false,
       })       }
      this.httpService.post<any>(this.deaformService.savedEAForm, this.docForm.value).subscribe(
          (data) => {
            this.searchList= data.deaFormResultList;
            if(this.searchList.length>0)
            {
            this.companyName=data.deaFormResultList[0].companyName;
            this.street=data.deaFormResultList[0].street;
            this.state=data.deaFormResultList[0].state;
            this.city=data.deaFormResultList[0].city;
            this.zipCode=data.deaFormResultList[0].zipCode;
            this.deaNo=data.deaFormResultList[0].deaNo;
            this.expDate=data.deaFormResultList[0].expDate;
            this.phoneNo=data.deaFormResultList[0].phoneNo;
            }
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

      reset(){
        this.docForm.patchValue({
          'company' : '',
          'returnMemoNo' : '',
          'startDate':'',
          // 'startDateObj':'',
          // 'endDateObj':'',
          'endDate':'',
          'controlType':'',
          'returnType':'',
          'isfuturedate':'',      
       })
       this.searchList= [];
       this.returnFlag= false;
       this.nonReturnFlag= false;
       this.showHead= false;
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
       this.httpService.post<any>(this.deaformService.deaExportPDF, this.docForm.value).subscribe(
         (data) => {
           const doc = new jsPDF();
    
    
     var html = htmlToPdfmake(data.exportPDF2,{defaultStyles:{
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


     generateExcel() {
      if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {

      //Excel Title, Header, Data
      const title = 'DEAForm41';
      const header1 = ["Return Name", "Created",]
      const header = ["NAME OF DRUG OR PREPARATION", "Number of Containers", "CONTENTS (Number of grams, tablets,ounces, or other units per container)", "Controlled Substance Content(Each Unit)"]
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
    
          this.dataList.push(d.ndcupcCode,d.description,d.controlClass,d.strength);
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
        fs.saveAs(blob, 'DEAForm41.xlsx');
      })
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

