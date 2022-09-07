import { DebitmemoService } from './../../debitmemo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-debit-memo',
  templateUrl: './delete-debit-memo.component.html',
  styleUrls: ['./delete-debit-memo.component.sass']
})
export class DeleteDebitMemoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteDebitMemoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public debitmemoService: DebitmemoService,private httpService:HttpServiceService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.debitmemoService.deleteDebitMemo+"?debitMemo="+this.data.returnMemoNo).subscribe(data => {
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