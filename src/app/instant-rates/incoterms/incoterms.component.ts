import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-incoterms',
  templateUrl: './incoterms.component.html',
  styleUrls: ['./incoterms.component.sass']
})
export class IncotermsComponent implements OnInit {
  
  docForm: FormGroup;
  incotermsChange:boolean=false;
  commodityChange:boolean=false;
  cargoReadinessChange:boolean=false;
  calendar:boolean=true;
  loadTypeChange:boolean=false;
  cargoDetailsChange=false;
  
  constructor(private fb:FormBuilder) { 
    this.docForm = this.fb.group({
      control:[""]
    })
   }

  ngOnInit(): void {
    this.incotermsChange=true;
  }


  incotermsSelect(){
    this.commodityChange=false;
    this.cargoReadinessChange=false;
    this.loadTypeChange=false;
    this.cargoDetailsChange=false;
    this.incotermsChange=true;
    
  }
  commoditySelect(){
    this.incotermsChange=false;
    this.cargoReadinessChange=false;
    this.loadTypeChange=false;
    this.cargoDetailsChange=false;
    this.commodityChange=true;
   
    
  }

  cargoReadinessSelect(){
    this.incotermsChange=false;
    this.commodityChange=false;
    this.loadTypeChange=false;
    this.cargoDetailsChange=false;
    this.cargoReadinessChange=true;

    
  }
  loadTypeSelect()
  {
    this.incotermsChange=false;
    this.commodityChange=false;
    this.cargoReadinessChange=false;
    this.cargoDetailsChange=false;
    this.loadTypeChange=true;
  }

  cargoDetailsSelect()
  {
    this.incotermsChange=false;
    this.commodityChange=false;
    this.cargoReadinessChange=false;
    this.loadTypeChange=false;
    this.cargoDetailsChange=true;
  }

  radioClick(value:any){
    if(value==='Yes'){
    this.calendar=true;
    }
    
  }


  onItemChange(value){
    console.log(" Value is : ", value );
 }
 numberInput(evt, val) {
  console.log(evt, val);
}



 

// /** @title Datepicker inline calendar example */
// @Component({
//   selector: 'datepicker-inline-calendar-example',
//   templateUrl: 'datepicker-inline-calendar-example.html',
//   styleUrls: ['datepicker-inline-calendar-example.css'],
// })
// export class DatepickerInlineCalendarExample {
//   selected: Date | null;
// }

 

}
