import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incoterms',
  templateUrl: './incoterms.component.html',
  styleUrls: ['./incoterms.component.sass']
})
export class IncotermsComponent implements OnInit {

  incotermsChange:boolean=false;
  commodityChange:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.incotermsChange=true;
  }


  incotermsSelect(){
    this.commodityChange=false;
    this.incotermsChange=true;
  }
  commoditySelect(){
    this.incotermsChange=false;
    this.commodityChange=true;
    
  }

 

}
