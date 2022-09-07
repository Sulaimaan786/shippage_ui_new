import { UsersService } from 'src/app/setup/users/users.service';
import { ExcelService } from './../excel.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-others',
  templateUrl: './add-others.component.html',
  styleUrls: ['./add-others.component.sass']
})
export class AddOthersComponent implements OnInit {
  imagePath:any;

  constructor(
    private sanitizer: DomSanitizer, 
    private httpService:HttpServiceService,
    private excelService: ExcelService,  
    public usersService: UsersService,
    private tokenStorage: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.httpService.get<any>(this.usersService.getImage).subscribe(
      (data) => {
        console.log(data);
        let objectURL = 'data:image/png;base64,' + data.file;
         this.imagePath = this.sanitizer.bypassSecurityTrustUrl(objectURL);


      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }


  generateExcel() {
    this.excelService.generateExcel();
  }
  
}
