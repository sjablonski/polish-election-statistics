import { Component, Input } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() value: number;
  @Input() color: string;

  constructor(private percentPipe: PercentPipe) {
    this.value = 0;
    this.color = '#000000';
  }

  get style() {
    return {
      backgroundColor: this.color,
      width: this.percentPipe.transform(this.value, '2.2', 'en-US'),
    };
  }
}
