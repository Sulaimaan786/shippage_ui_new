import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit {
  @Input() value:any[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
