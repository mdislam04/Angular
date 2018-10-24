import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service: DataService) {

  }
  oldResponse = undefined;
  oldResponse1 = undefined;
  binanceData: any;
  koinexData: any;
  poloniexData: any;
  i = 0;
  inetrvalId: any;
  inetrvalId1: any;
  ngOnInit() {
    this.setKoinexData();
    this.setBinanceData();
    this.setPoloniexData();

    this.inetrvalId = setInterval(() => {
      this.setKoinexData();
      this.setBinanceData()
    },
      5000);



    this.inetrvalId1 = setInterval(function () {
      this.setPoloniexData();
    }, 30000);
  }

  private setBinanceData() {
    this.service.GetBinanceTicker().subscribe(
      data => {
        this.binanceData = data;
      }
    );
  }

  private setKoinexData() {
    this.service.GetKoinexTicker().subscribe(
      data => {
        this.koinexData = data;
      }
    );
  }

  private setPoloniexData() {
    this.service.GetPoloniexTicker().subscribe(
      data => {
        this.poloniexData = data;
      }
    );
  }

  ngOnDestroy() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    if (this.inetrvalId1) {
      clearInterval(this.inetrvalId1);
    }
  }

}
