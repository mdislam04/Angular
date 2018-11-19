import { Injectable } from '@angular/core';
import { PushNotificationsService } from '../services/pushNotification';
import { AlertTiggers } from '../home/AlertTriggers';

@Injectable()
export class AlertService {

  constructor(private _notificationService: PushNotificationsService) {
    this._notificationService.requestPermission();
  }

  public koinexAlert(alertTiggers: AlertTiggers, priceData) {
    var coinPrice = priceData.prices.inr[alertTiggers.coin];

    if (parseFloat(coinPrice) >= parseFloat(alertTiggers.highPriceKoinex)) {

      this.playAudio('high');
      console.log('Koinex High ' + alertTiggers.coin + ' ==>> ' + coinPrice);
      this.notify('Koinex  ' + alertTiggers.coin + ' price HIGH ==>> ' + coinPrice);
    }
    else if (parseFloat(alertTiggers.lowPriceKoinex) >= parseFloat(coinPrice)) {
      this.playAudio('low');
      console.log('Koinex low ' + alertTiggers.coin + ' ==>> ' + coinPrice);
      this.notify('Koinex  ' + alertTiggers.coin + ' price LOW ==>> ' + coinPrice);
    }
  }

  public BinanceAlert(alertTiggers: AlertTiggers, binanceData) {
    var coin = binanceData.find(p => p.symbol === alertTiggers.coin + 'USDT');

    if (parseFloat(coin.price) >= parseFloat(alertTiggers.highPriceBinance)) {
      this.playAudio('high');
      console.log('Binance High ' + coin.symbol + ' ==>> ' + coin.price)
      this.notify('Binance  ' + alertTiggers.coin + ' price HIGH ==>> ' + parseFloat(coin.price).toFixed(5));
    }
    else if (parseFloat(alertTiggers.lowPriceBinance) >= parseFloat(coin.price)) {
      this.playAudio('low');
      this.notify('Binance  ' + alertTiggers.coin + ' price LOW ==>> ' + parseFloat(coin.price).toFixed(5));
      console.log('Binance low ' + coin.symbol + ' ==>> ' + coin.price)
    }
  }

  playAudio(alertType) {
    let audio = new Audio();
    if (alertType === "high")
      audio.src = "../../assets/alert.mp3";
    else
      audio.src = "../../assets/alertlow.mp3";
    audio.load();
    audio.play();
  }

  notify(message) {
    let data: Array<any> = [];
    data.push({
      'title': 'Price Alert',
      'alertContent': message
    });

    this._notificationService.generateNotification(data);
  }
}