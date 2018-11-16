import { BrowserModule } from '@angular/platform-browser';
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



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NumberFormate,
    HighlighterDirective
  ],
  imports: [
    BrowserModule, RotingModule,HttpClientModule,FormsModule
  ],
  providers: [DataService,PushNotificationsService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
