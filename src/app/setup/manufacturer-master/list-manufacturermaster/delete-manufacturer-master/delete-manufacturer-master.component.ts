import { ManufacturerService } from './../../manufacturer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-manufacturer-master',
  templateUrl: './delete-manufacturer-master.component.html',
  styleUrls: ['./delete-manufacturer-master.component.sass']
})
export class DeleteManufacturerMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteManufacturerMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manufacturerService: ManufacturerService,private httpService:HttpServiceService) { }


    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.manufacturerService.deletemanufacturerMaster+"?manufacturerId="+this.data.manufacturerCode).subscribe(data => {
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