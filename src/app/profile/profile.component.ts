import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket } from './coinmarket';
import { element } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public coinData: CoinMarket;
  public coinDataCopy: CoinMarket;
  inetrvalId: any;
  refreshInterval:number = 5;
  constructor(private service: DataService) { }

  ngOnInit() {
    this.getCoinMarketData();

    this.inetrvalId = setInterval(() => this.getCoinMarketData(), this.refreshInterval*1000);


  }

  ngOnDestroy() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }
  }

  public restart()
  {
    console.log('Restart -- '+this.inetrvalId);
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    this.inetrvalId = setInterval(() => this.getCoinMarketData(), this.refreshInterval*1000);
  }

  public getCoinMarketData() {
    this.service.getCoinMarketData().subscribe(
      data => {
        this.coinDataCopy = data;
        if (this.coinDataCopy) {
          var current = Object.values(this.coinDataCopy.data);
          //var prev = Object.values(this.prevCoinData.data);

          current.forEach(cur => {
            if (document.getElementById(cur.name)) {
              var price = parseFloat(document.getElementById(cur.name).innerText);
              
              if (price >= parseFloat(cur.quotes.USD.price.toFixed(5))) {
                document.getElementById(cur.name).className='high';
              }
              else {
                document.getElementById(cur.name).className='low';
                console.log(document.getElementById(cur.name).innerText + 'cur price '+cur.quotes.USD.price);
              }
            }

          });
        }
        this.coinData = this.coinDataCopy;
      }
    );
  }

}
