import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
 @Component({
  selector: 'app-landscape-loader',
  templateUrl: './landscape-loader.component.html',
  styleUrls: ['./landscape-loader.component.sass']
})
export class LandscapeLoaderComponent implements OnInit {

  constructor(private responsive: BreakpointObserver,
     public dialogRef: MatDialogRef<LandscapeLoaderComponent>,public dialog: MatDialog) { }

  ngOnInit(): void { 

    this.responsive.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {  
          this.dialogRef.close(); 
        }
      });

    this.responsive.observe([Breakpoints.Tablet]).subscribe(result =>{
      if(result.matches){
        const viewport = screen.orientation.type;
        console.log(viewport)
        const screenWidth = window.screen.width
        console.log(screenWidth);
        if(viewport == "landscape-primary"){
          //alert(30)
          this.dialogRef.close(); 
          }
      }
      
       
    });
     
   
      
  }

  edit(){ 
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";  
    }
    const dialogRef = this.dialog.open(LandscapeLoaderComponent, {
      height: "100%",
      width: "100%",
       direction: tempDirection,
    });  
  }
}
