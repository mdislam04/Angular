import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { PushNotificationsService } from '../services/pushNotification';
import { AlertService } from '../services/alertService';
import { AlertTiggers } from './AlertTriggers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service: DataService, private titleService: Title,
    private alertService: AlertService) {
    
  }
  oldResponse = undefined;
  oldResponse1 = undefined;
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
  //
  ngOnInit() {
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

  private setBinanceData() {
    this.service.GetBinanceTicker().subscribe(
      data => {
        this.binanceData = data;
        if (this.isAlertOn && this.alertTrigger.isBinanceChecked) {
          this.alertService.BinanceAlert(this.alertTrigger, this.binanceData);
        }
      }
    );
  }



  private setKoinexData() {
    this.service.GetKoinexTicker().subscribe(
      data => {
        this.koinexData = data;
        var koinexXRPprice = this.koinexData.prices.inr['XRP'];
        if (this.binanceData) {
          var coin = this.binanceData.find(p => p.symbol === 'XRPUSDT');
          var newTitle = parseFloat(coin.price).toFixed(5) + ' | ' +koinexXRPprice+' - XRP';
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
