import { Component, Input, OnChanges } from "@angular/core";
import { polandPathsSVG } from "../path-svg";
import { Candidates } from "../statistics";
import { Map } from "../map.interface";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnChanges {
  pathsSVG;
  candidates: Candidates[];
  @Input() data: Map[];

  constructor() {
    this.pathsSVG = polandPathsSVG;
    this.data = [];
    this.candidates = [];
  }

  change() {
    const max = this.data.map((d: any) =>
      d.candidates.reduce((prev: any, curr: any) => {
        const win = prev.votes > curr.votes ? prev : curr;
        return {
          voivodeship: d.voivodeship,
          type: win.type,
          percent: Math.floor((win.percent * 100) / 5) * 5,
        };
      })
    );

    let merged = [];
    for (let i = 0; i < this.pathsSVG.length; i++) {
      merged.push(
        Object.assign(
          {},
          this.pathsSVG[i],
          max.find((itmInner) => itmInner.voivodeship === this.pathsSVG[i].id)
        )
      );
    }

    this.pathsSVG = merged;
    this.candidates = this.data.reduce((prev: Candidates[], curr: Map) => {
      curr.candidates.forEach((c: Candidates) => {
        if (!prev.some((x) => x.type === c.type)) {
          prev.push(c);
        }
      });
      return prev;
    }, []);
  }

  getTooltipData(voivodeship: string) {
    return this.data.filter((d: Map) => d.voivodeship === voivodeship)[0];
  }

  ngOnChanges() {
    this.change();
  }
}
