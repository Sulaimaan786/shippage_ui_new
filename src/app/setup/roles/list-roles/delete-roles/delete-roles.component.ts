import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../../roles.service';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';
@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.sass']
})
export class DeleteRolesComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rolesService: RolesService,private httpService:HttpServiceService) { }


    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.httpService.get<any>(this.rolesService.deleteRolesUrl+"?deleteRole="+this.data.roleId).subscribe(data => {
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
