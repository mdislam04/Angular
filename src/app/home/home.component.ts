import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { AlertService } from '../services/alertService';
import { AlertTiggers } from './AlertTriggers';
import { Title } from '@angular/platform-browser';
import { LivePrice } from '../models/LivePriceModel';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service: DataService, private titleService: Title,
    private alertService: AlertService) {
    this.storage =  localStorage;

  }

  myControl = new FormControl();
  options: string[] = ["BTC", "ETH", "LTC", "XRP", "OMG", "REQ", "ZRX", "GNT", "BAT", "AE", "TRX", "XLM", "NEO", "GAS", "XRB", "NCASH", "EOS", "CMT", "ONT", "ZIL", "IOST", "ACT", "ZCO", "SNT", "POLY", "ELF", "REP"].sort();
  filteredOptions: Observable<string[]>;
  storage: any;
  coinToDisplayMaster: any;
  coinToDisplay: any;
  binanceData: any;
  koinexData: any;
  poloniexData: any;
  i = 0;
  inetrvalId: any;
  inetrvalId1: any;
  refreshInterval: number = 10;
  RequestedCoin: string;
  lastUpdated: string;
  alertCoin: string;
  alertPrice: string;
  isAlertOn: boolean;
  isHighAlert: boolean;
  isBinaceAlertSet: boolean = true;

  //
  alertTrigger: AlertTiggers = new AlertTiggers();
  prices: LivePrice[] = [];
  timer: Date;
  //
  ngOnInit() {

    if (!this.storage.getItem("timer")) {
      var date = new Date();
      this.timer = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() - 30, 0, 0);
      this.storage.setItem("timer", this.timer);
    }
    else {
      this.timer = this.storage.getItem("timer");
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));

    this.coinToDisplay = JSON.parse(this.storage.getItem('homePageCoin')) || [{ symbol: "BTC", koinexInitial: undefined, binanceInitial: undefined }];
    this.coinToDisplayMaster = JSON.parse(this.storage.getItem('homePageCoinMaster')) || [{ symbol: "BTC", koinexInitial: undefined, binanceInitial: undefined }];
    this.storage.setItem('homePageCoin', JSON.stringify(this.coinToDisplay));


    this.setKoinexData();
    this.setBinanceData();
    this.setPoloniexData();

    this.inetrvalId = setInterval(() => {
      this.setKoinexData();
      this.setBinanceData()
    }, this.refreshInterval * 1000);



    this.inetrvalId1 = setInterval(() => {
      this.setPoloniexData();
    }, 30000);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private setBinanceData() {
    this.service.GetBinanceTicker().subscribe(
      data => {
        this.binanceData = data;
        this.setPrices('binance');
        if (this.isAlertOn && this.alertTrigger.isBinanceChecked) {
          this.alertService.BinanceAlert(this.alertTrigger, this.binanceData);
        }
      }
    );
  }

  setPrices(exchange: any) {
    // Binance prices set
    if (exchange === 'binance') {
      if (this.prices.length > 0) {

        this.coinToDisplay.forEach(p => {
          this.prices.forEach(k => {
            if (k.symbol === p.symbol) {
              var match = this.binanceData.find(b => b.symbol === p.symbol + 'USDT');
              if (!match) {
                match = this.binanceData.find(b => b.symbol === p.symbol + 'BTC');
                k.prices.isBtcPrice = true;
              }
              k.prices.binacePrice = match.price;
              if (!k.prices.binaceInitialPrice) {
                var matchCoin = this.coinToDisplayMaster.find(c => c.symbol == p.symbol);
                k.prices.binaceInitialPrice = matchCoin.binanceInitial || k.prices.binacePrice;
                matchCoin.binanceInitial = k.prices.binaceInitialPrice;
              }
              k.prices.binacePriceDiff = (k.prices.binacePrice - k.prices.binaceInitialPrice).toFixed(8);
              if (this.koinexData)
              {                
                k.prices.binacePriceDiffINR = k.prices.isBtcPrice ? (Number.parseFloat(k.prices.binacePriceDiff) * Number.parseFloat(this.koinexData.prices.inr.BTC)) : (Number.parseFloat(k.prices.binacePriceDiff) * Number.parseFloat(this.koinexData.prices.inr.TUSD));
              }
            }

          });
        });
      }
      else {
        this.coinToDisplay.forEach(p => {
          var match = this.binanceData.find(b => b.symbol == p.symbol + 'USDT');
          let price = <LivePrice>{ symbol: p.symbol, prices: {} };
          if (!match) {
            match = this.binanceData.find(b => b.symbol === p.symbol + 'BTC');
            price.prices.isBtcPrice = true;
          }
          if (match) {
            price.prices.binacePrice = match.price;
            if (!price.prices.binaceInitialPrice)
              price.prices.binaceInitialPrice = price.prices.binacePrice;
            price.prices.binacePriceDiff = (price.prices.binacePrice - price.prices.binaceInitialPrice).toFixed(8);
            if (this.koinexData)
            {              
              price.prices.binacePriceDiffINR = price.prices.isBtcPrice ? (Number.parseFloat(price.prices.binacePriceDiff) * Number.parseFloat(this.koinexData.prices.inr.BTC)) : (Number.parseFloat(price.prices.binacePriceDiff) * Number.parseFloat(this.koinexData.prices.inr.TUSD));
            }
            this.prices.push(price);
          }
        });
      }
    }
    // koinex ......
    else if (exchange === 'koinex') {
      if (this.prices.length > 0) {

        this.coinToDisplay.forEach(p => {
          this.prices.forEach(k => {
            if (k.symbol === p.symbol) {
              k.prices.koinexPrice = this.koinexData.prices.inr[p.symbol];
              k.prices.koinexPriceDiff = Math.round((k.prices.koinexPrice - k.prices.koinexInitialPrice) * 100) / 100;
            }
          });
        });
      }
      else {
        this.coinToDisplay.forEach(p => {
          if (this.koinexData.prices.inr[p.symbol]) {
            let price = <LivePrice>{ symbol: p.symbol, prices: { koinexPrice: this.koinexData.prices.inr[p.symbol] } };
            if (!price.prices.koinexInitialPrice) {
              var match = this.coinToDisplayMaster.find(c => c.symbol == p.symbol);
              price.prices.koinexInitialPrice = match.koinexInitial || price.prices.koinexPrice;
              match.koinexInitial = price.prices.koinexInitialPrice;
            }
            price.prices.koinexPriceDiff = Math.round((price.prices.koinexPrice - price.prices.koinexInitialPrice) * 100) / 100;
            this.prices.push(price);
          }
        });
      }
    }
  }

  addCoin() {
    if (this.RequestedCoin != '') {
      if (!this.coinToDisplayMaster.find(o => o.symbol === this.RequestedCoin.toUpperCase())) {
        this.coinToDisplayMaster.push({ symbol: this.RequestedCoin.toUpperCase(), koinexInitial: undefined, binanceInitial: undefined });
      }
      console.log(JSON.stringify(this.coinToDisplayMaster));
      if (!this.coinToDisplay.find(o => o.symbol === this.RequestedCoin.toUpperCase())) {
        this.coinToDisplay.push({ symbol: this.RequestedCoin.toUpperCase(), koinexInitial: undefined, binanceInitial: undefined });
        console.log(JSON.stringify(this.coinToDisplay));
        this.prices = [];
        this.setPrices('koinex');
        this.setPrices('binance');

      }

      this.storage.setItem('homePageCoin', JSON.stringify(this.coinToDisplay));
      this.storage.setItem('homePageCoinMaster', JSON.stringify(this.coinToDisplayMaster));
      this.RequestedCoin = '';
    }

  }

  removeCoin(coinPara, coinIndex) {
    var index = this.coinToDisplay.indexOf(this.coinToDisplay.find(c => c.symbol == coinPara));
    if (index > -1) {
      this.coinToDisplay.splice(index, 1);
      this.prices.splice(coinIndex, 1)
      this.storage.setItem('homePageCoin', JSON.stringify(this.coinToDisplay));
      this.storage.setItem('homePageCoinMaster', JSON.stringify(this.coinToDisplayMaster));

    }

  }

  private setKoinexData() {
    this.service.GetKoinexTicker().subscribe(
      data => {
        this.koinexData = data;
        this.setPrices('koinex');
        var koinexXRPprice = this.koinexData.prices.inr['XRP'];
        if (this.binanceData) {
          var coin = this.binanceData.find(p => p.symbol === 'XRPUSDT');
          var newTitle = parseFloat(coin.price).toFixed(5) + ' | ' + koinexXRPprice + ' - XRP';
          this.titleService.setTitle(newTitle);

        }
        if (this.isAlertOn && this.alertTrigger.isKonexChecked) {
          this.alertService.koinexAlert(this.alertTrigger, this.koinexData);

        }

        var d = new Date();
        this.lastUpdated = d.toLocaleTimeString();
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
  changeInterval(ops) {
    if (ops === "+")
      this.refreshInterval += 5;
    else if (this.refreshInterval > 0) {
      this.refreshInterval -= 5;
    }
    this.restart();
  }

  public restart() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    this.inetrvalId = setInterval(() => { this.setKoinexData(); this.setBinanceData() },
      this.refreshInterval * 1000);
  }

  public opneAlertWindow(coin) {
    this.alertTrigger.coin = coin.toUpperCase();
    var coin = this.binanceData.find(p => p.symbol === this.alertTrigger.coin + 'USDT');
    this.alertTrigger.currentPriceBinance = coin.price;
    this.alertTrigger.currentPriceKoinex = this.koinexData.prices.inr[this.alertTrigger.coin];
  }
  public setPriceAlert(alertType) {
    if (alertType === "on") {
      this.isAlertOn = true;
    }
    else {
      this.isAlertOn = false;
    }

  }



}
