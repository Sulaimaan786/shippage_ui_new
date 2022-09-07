import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../users.service';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.sass']
})
export class DeleteUsersComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: UsersService,private httpService:HttpServiceService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.usersService.deleteUsersUrl+"?deleteUser="+this.data.empId).subscribe(data => {
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
