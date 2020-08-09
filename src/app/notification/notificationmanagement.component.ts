import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';


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
        // set trgigger data with operation this.coinToTrack
        //var payload = [];
        this.coinToTrack.forEach(element => {
            element.PartitionKey = 'trigger',
            element.RowKey = element.symbol
             
        });
            
       
        this.service.updateAlertTrigger({ "ops": "trigger", "payload":this.coinToTrack}).subscribe(
            data => {
                
                this.message = data.message;
                this.spinner.hide();
            }
        );        
    }

    getAlertTriggers() {        
        //var authToken = 'sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-12-31T00:30:39Z&st=2020-03-31T16:30:39Z&spr=https&sig=5JvB34r9rlNALJlnIicllhUXKXF0cT5XoUiBJeDaAyk%3D';
        var url = 'https://cryptofunctionstorage.table.core.windows.net/notificationTrigger()?';
        
        url = url + environment.token;
        this.service.getNotificationTriggers(url).subscribe(
          data => {
            
            this.coinToTrack = data.value;
    
           
          });
      }
}
