import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RotingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoolToNumberPipe } from './pipes/boolToNumber.pipe';
import { DataService } from './services/data-service.service';
import { HighlighterDirective } from './directives/highlighter.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    BoolToNumberPipe,
    HighlighterDirective
  ],
  imports: [
    BrowserModule, RotingModule,HttpClientModule,FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
