import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket, Coin } from './coinmarket';
import { element } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public coinData: CoinMarket;
  public coinDataCopy: CoinMarket;
  viewData: Coin[] = [];
  coinToDisplay = ["XRP", "ZRX", "OMG", "GNT"];
  inetrvalId: any;
  refreshInterval: number = 5;
  RequestedCoin: string;
  constructor(private service: DataService) { }

  ngOnInit() {
    this.getCoinMarketData();

    this.inetrvalId = setInterval(() => this.getCoinMarketData(), this.refreshInterval * 1000);


  }

  ngOnDestroy() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }
  }

  public restart() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    this.inetrvalId = setInterval(() => this.getCoinMarketData(), this.refreshInterval * 1000);
  }

  addCoin() {
    if (!this.coinToDisplay.find(o => o === this.RequestedCoin.toUpperCase()))
      this.coinToDisplay.push(this.RequestedCoin.toUpperCase());
  }

  public getCoinMarketData() {
    this.service.getCoinMarketData().subscribe(
      data => {
        this.coinData = data;
        var current = Object.values(this.coinData.data);

        //Set Coin to display
        this.viewData = [];
        this.coinToDisplay.sort().forEach(coin => {
          var match = current.find(o => o.symbol == coin);
          this.viewData.push(match);
        });


        if (this.coinDataCopy) {
          // var Prev = Object.values(this.coinDataCopy.data);
          // Prev.forEach(cur => {
          //   if (document.getElementById(cur.name)) {
          //     var price = parseFloat(document.getElementById(cur.name).innerText);
          //     console.log(document.getElementById(cur.name));
          //     if (price >= parseFloat(cur.quotes.USD.price.toFixed(5))) {
          //       document.getElementById(cur.name).className = "low";
          //     }
          //     else {
          //       document.getElementById(cur.name).className = 'high';
          //       console.log('applied -> ' + document.getElementById(cur.name).innerText + ' > cur price ' + cur.quotes.USD.price);
          //     }
          //   }

          // });

        }

        this.coinDataCopy = data;






      }
    );
  }

  ngAfterViewChecked() {
    if (this.coinDataCopy) {
      var Prev = Object.values(this.coinDataCopy.data);
      Prev.forEach(old => {
        if (document.getElementById(old.name)) {
          var price = parseFloat(document.getElementById(old.name).innerText);          
          if (price >= parseFloat(old.quotes.USD.price.toFixed(5))) {
            document.getElementById(old.name).className = "high";
          }
          else {
            document.getElementById(old.name).className = 'low';            
          }
        }

      });
      
    }
  }

}
