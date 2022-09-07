import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { InventoryformService } from '../../inventory-report/inventory-service';
import { PackingFormService } from '../../packing-slip/packingSlip-service';
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

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ShippingLablesService } from '../shippingLables.service';
import { ShippingLablesForm } from '../shippingLables-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
    

@Component({
  selector: 'app-add-shipping-lables',
  templateUrl: './add-shipping-lables.component.html',
  styleUrls: ['./add-shipping-lables.component.sass']
})
export class AddShippingLablesComponent implements OnInit {
  [x: string]: any;

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  docForm: FormGroup;
  exampleDatabase: ShippingLablesService | null;
  shippingLablesForm:ShippingLablesForm;
  requestId: any;
  searchList=[];
  companyList =[];
  debitMemoList =[];
  radioList=[];
  hideFlag = false;
  showHead:boolean=true;
  selectedFlag:boolean = false;    

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private httpService: HttpServiceService,
    public shippingLablesService:ShippingLablesService,
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
    });
  }
 
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

 

    radioShip(value)
    {
      this.radioList.push(value);
    }

  searchData(){
    if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {

      this.httpService.post<any>(this.shippingLablesService.shipping, this.docForm.value).subscribe(
        (data) => {
          this.searchList= data.shippingLabelResultList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );
        this.showHead =true;

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

      
   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  } 

    reset(){
      this.docForm.patchValue({
        'company' : '',
        'returnMemoNo' : '',

     })
      this.radioList=[];
      this.searchList= [];
      this.showHead=false;
 }
   
//Export PDF
openPDF() {    
  if(this.docForm.controls.company.value != undefined && this.docForm.controls.company.value != null && this.docForm.controls.company.value != "") {

    this.httpService.post<any>(this.shippingLablesService.shippingExport,this.radioList).subscribe(
      (data) => {
        const doc = new jsPDF();
    var html = htmlToPdfmake(data.exportPDF2);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
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



}

