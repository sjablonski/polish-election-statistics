import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chernoff-legend",
  templateUrl: "./chernoff-legend.component.html",
  styleUrls: ["./chernoff-legend.component.scss"],
})
export class ChernoffLegendComponent implements OnInit {
  isVisabled: boolean;

  constructor() {
    this.isVisabled = false;
  }

  ngOnInit(): void {}
}
