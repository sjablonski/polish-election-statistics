import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { PercentPipe, registerLocaleData } from "@angular/common";
import localePl from "@angular/common/locales/pl";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/in-memory-data.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { MapComponent } from "./pages/map/map.component";
import { DOMStackOrderDirective } from "./directive/domstack-order.directive";
import { DetailsComponent } from "./pages/details/details.component";
import { TooltipDirective } from "./directive/tooltip.directive";
import { TooltipComponent } from "./components/tooltip/tooltip.component";
import { VoivodeshipPipe } from "./pipes/voivodeship.pipe";
import { TableComponent } from "./pages/table/table.component";
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";
import {
  NavTabsComponent,
  NavTabComponent,
} from "./components/nav-tabs/nav-tabs.component";
import { DescriptiveStatisticsPipe } from "./pipes/descriptive-statistics.pipe";
import { ChernoffFaceComponent } from "./components/chernoff-face/chernoff-face.component";
import { ChernoffLegendComponent } from './components/chernoff-legend/chernoff-legend.component';

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
    NavTabComponent,
    DescriptiveStatisticsPipe,
    ChernoffFaceComponent,
    ChernoffLegendComponent,
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
    { provide: LOCALE_ID, useValue: "pl-PL" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
