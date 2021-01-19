import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  candidates;

  @Input() data;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.candidates = this.data.reduce((prev, curr) => {
      curr.candidates.forEach((c) => {
        if (!prev.some((x) => x.type === c.type)) {
          prev.push(c);
        }
      });
      return prev;
    }, []);
  }
}
