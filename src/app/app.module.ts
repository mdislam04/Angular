import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RotingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NumberFormate } from './pipes/boolToNumber.pipe';
import { DataService } from './services/data-service.service';
import { HighlighterDirective } from './directives/highlighter.directive';
import { FormsModule } from '@angular/forms';
import { PushNotificationsService } from './services/pushNotification';
import { AlertService } from './services/alertService';
import { PagerService } from './services/PagerService';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PriceHistoryComponent } from './CoinMarketCapPriceHistory/pricehistory.component';
import { KoinexPriceHistoryComponent } from './KoinexPriceHistory/koinexpricehistory.component';
import { BinanacePriceHistoryComponent } from './binance/binanacepricehistory.componet';
import {MatTableModule, MatSortModule, MatPaginatorModule} from '@angular/material';
import { KoinexPriceHistoryComponentSortable } from './KoinexPriceHistory/koinexpricehistory.componentSortable';
import { CoinMarketLiveComponent } from './coinMarket/coinMarketLive.component';
import { CoinMarkeHistoryComponent } from './coinMarketHistory/coinMarkethistory.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoinMarketLiveComponent,
    NumberFormate,
    HighlighterDirective,
    CoinMarkeHistoryComponent,
    PriceHistoryComponent,
    KoinexPriceHistoryComponentSortable,
    BinanacePriceHistoryComponent,
    KoinexPriceHistoryComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
     RotingModule,HttpClientModule,FormsModule, 
     OwlDateTimeModule,OwlNativeDateTimeModule,NgxSpinnerModule,
     MatTableModule,
     MatSortModule,
     MatPaginatorModule 
  ],
  providers: [DataService,PushNotificationsService,AlertService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
