import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { Chart } from 'chart.js';

@Component({
  selector: 'app-donight-chart',
  standalone: true,
  imports: [],
  templateUrl: './donight-chart.component.html',
  styleUrl: './donight-chart.component.css'
})
export class DonightChartComponent implements OnInit {


  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }
  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this donutes tha type of chart===>>>typee

      data: {// values on X-Axis =>>>>from db
        labels: ['Female', 'Male','Child'],
	       datasets: [{
    label: 'My First Dataset',
    data: [200, 400, 100],
    backgroundColor: [
      '#664b92',
      '#9a8fcc',
      '#2e1d31',
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:1
      }

    });
  }
}
