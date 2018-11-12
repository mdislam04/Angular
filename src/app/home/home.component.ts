import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { PushNotificationsService } from '../services/pushNotification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service: DataService,private _notificationService: PushNotificationsService) {
    this._notificationService.requestPermission();
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
  isHighAlert:boolean;
  ngOnInit() {
    this.setKoinexData();
    this.setBinanceData();
    this.setPoloniexData();

    this.inetrvalId = setInterval(() => {
      this.setKoinexData();
      this.setBinanceData()
    },
      this.refreshInterval * 1000);



    this.inetrvalId1 = setInterval(function () {
      this.setPoloniexData();
    }, 30000);
  }

  private setBinanceData() {
    this.service.GetBinanceTicker().subscribe(
      data => {
        this.binanceData = data;
        if(this.isAlertOn)
        {
          var coin= this.binanceData.find(p => p.symbol ===this.alertCoin.toUpperCase()+'USDT');
         
          if(this.isHighAlert && parseFloat(coin.price) >= parseFloat (this.alertPrice))
          {
            
            this.notify('Price reached the set alert level for '+coin.symbol +' ==>> '+coin.price);
          }
          else if(!this.isHighAlert && parseFloat (this.alertPrice) >= parseFloat(coin.price))
          {
            this.notify('Price reached the set alert level for '+coin.symbol +' ==>> '+coin.price);
          }
        }
      }
    );
  }

  private setKoinexData() {
    this.service.GetKoinexTicker().subscribe(
      data => {
        this.koinexData = data;
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

  public setAlertData(alertType) {    
    if (alertType === "low")
    {
      this.isAlertOn = true;
      this.isHighAlert = false;
    }
      else if(alertType === "high")
      {
        this.isAlertOn = true;
        this.isHighAlert = true;
      }
    else
    {
      this.isAlertOn = false;
      this.alertPrice='';
      this.alertCoin='';
    }
      
  }

  notify(message) {
    let data: Array < any >= [];
    data.push({
        'title': 'Price Alert',
        'alertContent': message
    });
    
    this._notificationService.generateNotification(data);
}

}
