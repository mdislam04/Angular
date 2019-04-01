import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-noti',
    templateUrl: './notificationmanagement.component.html',
    styleUrls: ['./notificationmanagement.component.css']
})
export class NotificationComponent {

    RequestedCoin: any;
    coinToTrack: any;        
    message: any;
    constructor(private service: DataService, private spinner:NgxSpinnerService) {
        

    }

    ngOnInit() {
        this.getAlertTriggers();
        this.coinToTrack = [{ symbol: "BTC", koinexLow: 200000, koinexHigh: 1000000, binanceLow: 3000, binanceHigh: 10000 }];
        
    }

    addCoin() {
        if (this.RequestedCoin && this.RequestedCoin != '') {
            this.coinToTrack.push({ symbol: this.RequestedCoin.toUpperCase(), koinexLow: undefined, koinexHigh: undefined, binanceLow: undefined, binanceHigh: undefined });            
        }
    }

    removeCoin(coin, coinIndex) {
        this.coinToTrack.splice(coinIndex, 1);        
    }

    setAlert() {
        this.spinner.show();
        this.message = "";
        this.service.updateAlertTrigger(this.coinToTrack).subscribe(
            data => {
                this.message = data;
                this.spinner.hide();
            }
        );        
    }

    getAlertTriggers() {        
        var authToken = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-07-31T15:49:54Z&st=2019-04-01T07:49:54Z&spr=https&sig=kdyUoXqbjGoBU5ITRAP7ZGXihCNOYLOJ2eQF4u8v4Nk%3D';
        var url = 'https://cryptofunctionstorage.table.core.windows.net/notificationTrigger()?';
        
        url = url + authToken;
        this.service.getNotificationTriggers(url).subscribe(
          data => {
              console.log(data.value);
            this.coinToTrack = data.value;
    
           
          });
      }
}
