import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-rate-summary',
  templateUrl: './rate-summary.component.html',
  styleUrls: ['./rate-summary.component.sass']
})
export class RateSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  

}
