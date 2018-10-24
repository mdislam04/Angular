import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket } from './coinmarket';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public coinData: CoinMarket;
  inetrvalId: any;
  constructor(private service: DataService) { }

  ngOnInit() {
    this.getCoinMarketData();

    this.inetrvalId = setInterval(() => this.getCoinMarketData(), 10000);


  }

  ngOnDestroy() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }
  }

  public getCoinMarketData() {
    this.service.getCoinMarketData().subscribe(
      data => {
        this.coinData = data;        
      }
    );
  }

}
