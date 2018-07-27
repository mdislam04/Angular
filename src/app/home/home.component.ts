import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message : string = 'Welcome to Home page !!!';
  date : Date;
  amount : number;
  userInput: number=1;
  constructor() {
    this.date=new Date();
    this.amount=200;
   }

  ngOnInit() {
  }

}
