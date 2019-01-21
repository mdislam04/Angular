import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';


@Component({
    selector: 'app-noti',
    templateUrl: './notificationmanagement.component.html',
    styleUrls: ['./notificationmanagement.component.css']
})
export class NotificationComponent {

    RequestedCoin: any;
    coinToTrack: any;
    storage: any;
    stoaregKey = "coinToTrack";
    message: any;
    constructor(private service: DataService) {
        this.storage = localStorage;;

    }

    ngOnInit() {
        this.coinToTrack = JSON.parse(this.storage.getItem(this.stoaregKey)) || [{ symbol: "BTC", koinexLow: 200000, koinexHigh: 1000000, binanceLow: 3000, binanceHigh: 10000 }];
        this.storage.setItem(this.stoaregKey, JSON.stringify(this.coinToTrack));
    }

    addCoin() {
        if (this.RequestedCoin && this.RequestedCoin != '') {
            this.coinToTrack.push({ symbol: this.RequestedCoin.toUpperCase(), koinexLow: undefined, koinexHigh: undefined, binanceLow: undefined, binanceHigh: undefined });
            this.storage.setItem(this.stoaregKey, JSON.stringify(this.coinToTrack));
        }
    }

    removeCoin(coin, coinIndex) {
        this.coinToTrack.splice(coinIndex, 1);
        this.storage.setItem(this.stoaregKey, JSON.stringify(this.coinToTrack));
    }

    setAlert() {
        console.log(JSON.stringify(this.coinToTrack));
        this.message = "";
        this.service.updateAlertTrigger(this.coinToTrack).subscribe(
            data => {
                this.message = data;
            }
        );
        this.storage.setItem(this.stoaregKey, JSON.stringify(this.coinToTrack));
    }
}