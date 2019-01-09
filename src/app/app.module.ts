import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RotingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NumberFormate } from './pipes/boolToNumber.pipe';
import { DataService } from './services/data-service.service';
import { HighlighterDirective } from './directives/highlighter.directive';
import { FormsModule } from '@angular/forms';
import { PushNotificationsService } from './services/pushNotification';
import { AlertService } from './services/alertService';
import { HistoryComponent } from './History/history.component';
import { PagerService } from './services/PagerService';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PriceHistoryComponent } from './CoinMarketCapPriceHistory/pricehistory.component';
import { KoinexPriceHistoryComponent } from './KoinexPriceHistory/koinexpricehistory.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NumberFormate,
    HighlighterDirective,
    HistoryComponent,
    PriceHistoryComponent,
    KoinexPriceHistoryComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
     RotingModule,HttpClientModule,FormsModule, OwlDateTimeModule,OwlNativeDateTimeModule,NgxSpinnerModule
  ],
  providers: [DataService,PushNotificationsService,AlertService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
