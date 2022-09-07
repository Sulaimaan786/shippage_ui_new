import { DruginfoService } from './../../druginfo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-drug-info-master',
  templateUrl: './delete-drug-info-master.component.html',
  styleUrls: ['./delete-drug-info-master.component.sass']
})
export class DeleteDrugInfoMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteDrugInfoMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public druginfoService: DruginfoService,private httpService:HttpServiceService) { }

   
    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.druginfoService.deletedrugInfoMaster+"?drugInfoId="+this.data.ndcupc).subscribe(data => {
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