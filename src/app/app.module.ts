import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { PercentPipe, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { DOMStackOrderDirective } from './domstack-order.directive';
import { DetailsComponent } from './details/details.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip/tooltip.component';
import { VoivodeshipPipe } from './voivodeship.pipe';
import { TableComponent } from './table/table.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { DescriptiveStatisticsPipe } from './descriptive-statistics.pipe';
import { ChernoffFaceComponent } from './chernoff-face/chernoff-face.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    DOMStackOrderDirective,
    DetailsComponent,
    TooltipDirective,
    TooltipComponent,
    VoivodeshipPipe,
    TableComponent,
    ProgressBarComponent,
    NavTabsComponent,
    DescriptiveStatisticsPipe,
    ChernoffFaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [
    PercentPipe,
    VoivodeshipPipe,
    { provide: LOCALE_ID, useValue: 'pl-PL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
