import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { ChernoffShape } from '../ChernoffShape';
import { Statistics } from '../statistics';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  statistic: Statistics;
  chernoffData: ChernoffShape[];

  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {
    this.statistic = {} as Statistics;
    this.chernoffData = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.statisticsService
        .getStatistic(params.get('voivodeshipId') || '')
        .subscribe((statistic) => {
          this.statistic = statistic[0];
          const ctx = document.getElementById('myChart') as HTMLCanvasElement;
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: this.statistic.candidates.map(
                (candidate) => candidate.name.surname
              ),
              datasets: [
                {
                  label: '# of Votes',
                  data: this.statistic.candidates.map(
                    (candidate) => Math.ceil(candidate.percent * 10000) / 100
                  ),
                  backgroundColor: ['rgb(87, 159, 245)', 'rgb(252, 169, 79)'],
                },
              ],
            },
          });
        });
      this.statisticsService
        .getChernoffDataById(params.get('voivodeshipId') || '')
        .subscribe((statistic) => {
          this.chernoffData = [statistic];
        });
    });
  }
}
