import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.sass']
})
export class WelcomePageComponent implements OnInit {

  public cardChart1: any;
  public cardChart1Data: any;
  public cardChart1Label: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  public cardChart3: any;
  public cardChart3Data: any;
  public cardChart3Label: any;

  public cardChart4: any;
  public cardChart4Data: any;
  public cardChart4Label: any;
 

  // Doughnut chart start
  public doughnutChartLabels: string[] = ["India", "USA", "Itely", "Shrilanka"];
  public doughnutChartData: number[] = [22, 31, 28, 19];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#735A84", "#E76412", "#9BC311", "#DC3545"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };

  constructor(private route: ActivatedRoute,
    private router: Router,) {}
  ngOnInit() {
   
  }
  ocean(){
   this.router.navigate(["/instantRates/shipment-mode"]);
  }

  air(){
    this.router.navigate(["/instantRates/air-route"]);
   }
    
}
