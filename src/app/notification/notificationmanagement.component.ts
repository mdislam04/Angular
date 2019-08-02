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
        var authToken = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-03-31T12:55:09Z&st=2019-08-02T04:55:09Z&spr=https,http&sig=S7Q8GcpHxGCAEYNJl5FdINNrlzh0%2BU%2F9UxL8RsTfpyU%3D';
        var url = 'https://cryptofunctionstorage.table.core.windows.net/notificationTrigger()?';
        
        url = url + authToken;
        this.service.getNotificationTriggers(url).subscribe(
          data => {
              console.log(data.value);
            this.coinToTrack = data.value;
    
           
          });
      }
}
