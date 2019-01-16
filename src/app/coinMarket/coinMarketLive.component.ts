import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket, Coin } from '../models/coinmarket';
import { PriceHistory, Token } from '../models/Token';


@Component({
  selector: 'app-coinMarketLive',
  templateUrl: './coinMarketLive.component.html',
  styleUrls: ['./coinMarketLive.component.css']
})
export class CoinMarketLiveComponent implements OnInit {

  public coinData: CoinMarket;
  public coinDataCopy: CoinMarket;
  viewData: Coin[] = [];
  private storage: any;
  coinToDisplay: any
  inetrvalId: any;
  priceHistoryinetrvalId: any;
  refreshInterval: number = 10;
  RequestedCoin: string;
  lastUpdated: string;
  minutes: number = 10;
  priceHistoryMaster = <PriceHistory>{ coinMarketCap: [] };
  priceHistory = <PriceHistory>{ coinMarketCap: [] };
  constructor(private service: DataService) {
    this.storage = localStorage;
  }

  ngOnInit() {
    this.getCoinMarketData();
    if (this.storage.getItem('coinToDisplay'))
      this.coinToDisplay = JSON.parse(this.storage.getItem('coinToDisplay'));
    else
      this.coinToDisplay = ["BTC", "ETH", "XRP", "ZRX", "OMG", "GNT", "BAT", "AE"];
    this.inetrvalId = setInterval(() => this.getCoinMarketData(), this.refreshInterval * 1000);
    this.priceHistoryinetrvalId = setInterval(() => this.storePriceHistory(), this.minutes * 1000 * 60);



  }

  showPriceHistory(symbol) {
    this.priceHistory.coinMarketCap = this.priceHistoryMaster.coinMarketCap.filter(p => p.symbol === symbol);
  }

  private storePriceHistory() {


    var d = new Date();
    var time = d.toDateString() + ' ' + d.toLocaleTimeString();
    var current = Object.values(this.coinData.data);
    this.coinToDisplay.sort().forEach(coin => {
      var match = current.find(o => o.symbol == coin);
      if (match) {
        let tk = <Token>{ price: match.quotes.USD.price, symbol: match.symbol, time: time };
        this.priceHistoryMaster.coinMarketCap.push(tk);

      }

    });
  }

  ngOnDestroy() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }
    if (this.priceHistoryinetrvalId) {
      clearInterval(this.priceHistoryinetrvalId);
    }
  }

  public restart() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    this.inetrvalId = setInterval(() => this.getCoinMarketData(), this.refreshInterval * 1000);
  }

  addCoin() {
    if (!this.coinToDisplay.find(o => o === this.RequestedCoin.toUpperCase())) {
      var allCoins = Object.values(this.coinData.data);
      if (allCoins.find(c => c.symbol === this.RequestedCoin.toUpperCase())) {
        this.coinToDisplay.push(this.RequestedCoin.toUpperCase());
        this.storage.setItem('coinToDisplay', JSON.stringify(this.coinToDisplay));
      }
      this.getCoinMarketData();
    }

  }

  changeInterval(ops) {
    if (ops === "+")
      this.refreshInterval += 5;
    else if (this.refreshInterval > 0) {
      this.refreshInterval -= 5;
    }
    this.restart();
  }
  removeCoin(coinPara) {
    var index = this.coinToDisplay.indexOf(coinPara);
    if (index > -1) {
      this.coinToDisplay.splice(index, 1);
      this.storage.setItem('coinToDisplay', JSON.stringify(this.coinToDisplay));
      this.getCoinMarketData();
    }

  }

  public getCoinMarketData() {
    this.service.getCoinMarketData().subscribe(
      data => {
        this.coinData = data;
        var current = Object.values(this.coinData.data);

        // Set Coin to display
        this.viewData = [];
        console.log(this.coinToDisplay);
        this.coinToDisplay.sort().forEach(coin => {
          var match = current.find(o => o.symbol == coin);
          this.viewData.push(match);
        });

        this.coinDataCopy = data;
        var d = new Date();
        this.lastUpdated = d.toDateString() + ' ' + d.toLocaleTimeString();






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
            // document.getElementById(old.name).className = 'low';
          }
        }

      });

    }
  }

}