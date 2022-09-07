import { CompanyMasterService } from './../../company-master.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-company-master',
  templateUrl: './delete-company-master.component.html',
  styleUrls: ['./delete-company-master.component.sass']
})
export class DeleteCompanyMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteCompanyMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public companyMasterService: CompanyMasterService,private httpService:HttpServiceService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.companyMasterService.deleteCompanyMaster+"?company="+this.data.companyCode).subscribe(data => {
         if(data.success){
          this.dialogRef.close({ data: true })
         }else{
          this.dialogRef.close({ data: false })
         }
        },
        (err: HttpErrorResponse) => {
          this.dialogRef.close({ data: false })
        }
      );
    }
  ngOnInit(): void {
  }

}
