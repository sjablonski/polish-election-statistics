import { Component, Input, OnChanges } from '@angular/core';
import { polandPathsSVG, PathSVG } from '../path-svg';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  pathsSVG;
  candidates;
  @Input() data: [];

  constructor() {
    this.pathsSVG = polandPathsSVG;
    this.data = [];
  }

  change() {
    const max = this.data.map((d) =>
      d.candidates.reduce((prev, curr) => {
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
    this.candidates = this.data.reduce((prev, curr) => {
      curr.candidates.forEach((c) => {
        if (!prev.some((x) => x.type === c.type)) {
          prev.push(c);
        }
      });
      return prev;
    }, []);
  }

  getTooltipData(voivodeship) {
    return this.data.filter((d) => d.voivodeship === voivodeship)[0];
  }

  ngOnChanges() {
    this.change();
  }
}
