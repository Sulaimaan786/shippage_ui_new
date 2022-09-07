import { WholesalerService } from './../../wholesaler.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-wholesaler-master',
  templateUrl: './delete-wholesaler-master.component.html',
  styleUrls: ['./delete-wholesaler-master.component.sass']
})
export class DeleteWholesalerMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteWholesalerMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public wholesalerService: WholesalerService,private httpService:HttpServiceService) { }


    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.wholesalerService.deleteWholesalerMaster+"?wholesalerId="+this.data.wholesalerCode).subscribe(data => {
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