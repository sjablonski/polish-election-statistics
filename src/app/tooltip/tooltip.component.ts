import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  tooltip = {};

  constructor() {}

  ngOnInit(): void {
    // this.tooltip.candidates.sort((a, b) => b.votes - a.votes); // to naprawić, w momencie gdy danych jeszcze nie ma pokazuje błąd.
  }
}
