import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as Chart from "chart.js";
import { ChernoffShape } from "../ChernoffShape";
import { Candidates, Statistics } from "../statistics";
import { StatisticsService } from "../statistics.service";
import { Map } from "../map.interface";

interface Datasets {
  label: string;
  data: number[];
  backgroundColor: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  mapData: Map[];
  tableData: Statistics[];
  totalData: Statistics;
  describeStats: { [key: string]: any };
  chernoffData: ChernoffShape[];
  tab: string;
  tab2: string;

  constructor(private statisticsService: StatisticsService) {
    this.mapData = [];
    this.tableData = [];
    this.totalData = {} as Statistics;
    this.describeStats = {};
    this.chernoffData = [];
    this.tab = "map";
    this.tab2 = "table";
  }

  @ViewChild("myChart") set content(content: ElementRef) {
    if (content) {
      const labels: string[] = [];
      const datasets: Datasets[] = [];
      this.tableData.forEach((data: Statistics) => {
        labels.push(data.voivodeship);
        data.candidates.forEach((c: Candidates) => {
          const found = datasets.find(
            (el) => el.label === c.name.surname + " " + c.name.forename
          );
          const percent = Math.ceil(c.percent * 10000) / 100;
          if (found) {
            found.data.push(percent);
          } else {
            datasets.push({
              label: c.name.surname + " " + c.name.forename,
              data: [percent],
              backgroundColor:
                c.type === 0 ? "rgb(87, 159, 245)" : "rgb(252, 169, 79)",
            });
          }
        });
      });

      new Chart(content.nativeElement, {
        type: "horizontalBar",
        data: {
          labels,
          datasets,
        },
        options: {},
      });
    }
  }

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe((statistics) => {
      this.fillMapData(statistics);
      this.fillTableData(statistics);
      this.fillTotalData(statistics);
    });
    this.statisticsService
      .getDescriptiveStatistics()
      .subscribe((statistics: any) => {
        this.describeStats = statistics;
      });
    this.statisticsService.getChernoffData().subscribe((statistics) => {
      this.chernoffData = statistics;
    });
  }

  fillMapData(statistics: Statistics[]) {
    this.mapData = statistics.map((statistic) => ({
      voivodeship: statistic.voivodeship,
      candidates: statistic.candidates,
    }));
  }

  fillTableData(statistics: Statistics[]) {
    this.tableData = statistics;
  }

  fillTotalData(statistics: Statistics[]) {
    const sum = statistics.reduce(
      (prev: Statistics, curr) => {
        prev.entitledVote += curr.entitledVote;
        prev.issuedBallots += curr.issuedBallots;
        prev.correspondenceVotes += curr.correspondenceVotes;
        prev.totalValidVotes += curr.totalValidVotes;
        prev.candidates = curr.candidates.map((c, i) => {
          if (!prev.candidates.find((el) => el.type === c.type)) {
            prev.candidates.push(c);
            return { ...prev.candidates[i] };
          }
          prev.candidates[i].votes += c.votes;
          return { ...prev.candidates[i] };
        });
        return prev;
      },
      {
        voivodeship: "",
        entitledVote: 0,
        issuedBallots: 0,
        correspondenceVotes: 0,
        totalValidVotes: 0,
        candidates: [],
      }
    );
    sum.candidates = sum.candidates.map((candidate) => ({
      ...candidate,
      percent: candidate.votes / sum.totalValidVotes,
    }));
    this.totalData = sum;
  }

  selectTab(tab: string) {
    this.tab = tab;
  }

  selectTab2(tab: string) {
    this.tab2 = tab;
  }
}
