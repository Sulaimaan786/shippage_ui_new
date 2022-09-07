import { ReturnMemoItemsService } from './../../return-memo-items.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-return-memo-items',
  templateUrl: './delete-return-memo-items.component.html',
  styleUrls: ['./delete-return-memo-items.component.sass']
})
export class DeleteReturnMemoItemsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteReturnMemoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public returnMemoItemsService: ReturnMemoItemsService,private httpService:HttpServiceService) { }

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
    // confirmDelete(): void {
    //   this.returnMemoItemsService.returnMemoItemsDelete(this.data.returnMemoItemsCode);

    // }
    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.returnMemoItemsService.deleteReturnMemoItems+"?returnMemoItemsNo="+this.data.returnMemoItemsNo+"&returnMemoNo="+this.data.returnMemoNo).subscribe(data => {
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
