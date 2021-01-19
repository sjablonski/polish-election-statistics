import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-nav-tab',
  template: '<div *ngIf="!active"><ng-content></ng-content></div>',
  styles: [''],
})
export class NavTabComponent {
  @Input() title: string;
  @Input() active = false;

  constructor() {
    this.title = '';
    this.active = false;
  }
}

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss'],
})
export class NavTabsComponent implements AfterContentInit {
  @ContentChildren(NavTabComponent) tabs: QueryList<NavTabComponent>;
  constructor() {
    this.tabs = new QueryList<NavTabComponent>();
  }

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: NavTabComponent) {
    [...this.tabs].forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
