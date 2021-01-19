import { Component, Input, OnInit } from "@angular/core";
import { Candidates, Statistics } from "../statistics";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  candidates: Candidates[];
  @Input() data: Statistics[];

  constructor() {
    this.candidates = [];
    this.data = [];
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.candidates = this.data.reduce((prev: Candidates[], curr) => {
      curr.candidates.forEach((c) => {
        if (!prev.some((x) => x.type === c.type)) {
          prev.push(c);
        }
      });
      return prev;
    }, []);
  }
}
