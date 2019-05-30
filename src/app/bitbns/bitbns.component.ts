import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { BitBnsData } from './bitbnsdata';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
    selector: 'app-bitbns',
    templateUrl: './bitbns.component.html',
    styleUrls: ['./bitbns.component.css']
})

export class BitBNSComponent {

    constructor(private service: DataService, private spinner: NgxSpinnerService) {
        this.getBitbnsPrices();
    }

    @HostListener('window:focus', ['$event'])
    onFocus(event: any): void {
        this.timerId = setInterval(() => this.updateCounter(), 1000);
        console.log('back in focus');
    }

    @HostListener('window:blur', ['$event'])
    onBlur(event: any): void {
        this.stopCounter();
        console.log('lost focus');
    }


    viewData: BitBnsData[] = [];
    coinToDisplay: any;
    RequestedCoin: string;
    bitBnsData: any;
    binanceData: any;
    timerId: any;
    refreshInterval: number = 30;
    refreshIntervalMaster: number = 30;
    lastUpdated: string;

    ngOnInit() {

        if (localStorage.getItem('bitbnsCoin'))
            this.coinToDisplay = JSON.parse(localStorage.getItem('bitbnsCoin'));
        else
            this.coinToDisplay = ["BTC", "XRP", "OMG", "TRX", "ZRX"];

        this.timerId = setInterval(() => this.updateCounter(), 1000);
    }

    ngOnDestroy() {

        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    updateCounter() {
        if (this.refreshInterval > 0)
            this.refreshInterval--;
        else {
            this.refreshInterval = this.refreshIntervalMaster;
            this.getBitbnsPrices();
        }
    }

    stopCounter() {

        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    public restart() {
        this.refreshIntervalMaster = this.refreshInterval;
        this.timerId = setInterval(() => this.updateCounter(), 1000);


    }



    getBitbnsPrices() {

        this.service.getBitBnsData().subscribe(
            data => {
                this.bitBnsData = data;

                this.getBinancePrices();

            }
        );
    }

    getBinancePrices() {
        this.service.GetBinanceTicker().subscribe(
            data => {
                this.binanceData = data;
                //

                if (this.viewData.length == 0) {
                    this.coinToDisplay.forEach(coinObj => {
                        if (this.bitBnsData[coinObj])
                            this.viewData.push(<BitBnsData>{ coin: coinObj, bitbnsPrice: this.bitBnsData[coinObj].last_traded_price });
                    });
                }
                else {
                    this.coinToDisplay.forEach(coinObj => {
                        if (this.bitBnsData[coinObj]) {
                            var match = this.viewData.find(b => b.coin === coinObj);
                            if (match)
                                match.bitbnsPrice = this.bitBnsData[coinObj].last_traded_price;
                            else
                                this.viewData.push(<BitBnsData>{ coin: coinObj, bitbnsPrice: this.bitBnsData[coinObj].last_traded_price });

                        }
                    });
                }

                ///
                this.viewData.forEach(p => {
                    var match = this.binanceData.find(b => b.symbol === p.coin + 'USDT');
                    if (!match) {
                        match = this.binanceData.find(b => b.symbol === p.coin + 'BTC');
                        p.isBtcPrice = true;
                    }
                    p.binancePrice = match.price;

                });
            }
        );
        var d = new Date();
        this.lastUpdated = d.toLocaleTimeString();
        this.spinner.hide();
    }

    addCoin() {
        if (!this.coinToDisplay.find(o => o === this.RequestedCoin.toUpperCase())) {
            this.coinToDisplay.push(this.RequestedCoin.toUpperCase());
            localStorage.setItem('bitbnsCoin', JSON.stringify(this.coinToDisplay));
        }
        this.spinner.show();
        this.getBitbnsPrices();
        this.RequestedCoin = '';
    }

    removeCoin(coinPara) {
        var index = this.coinToDisplay.indexOf(coinPara);
        if (index > -1) {
            this.coinToDisplay.splice(index, 1);
            localStorage.setItem('bitbnsCoin', JSON.stringify(this.coinToDisplay));
            this.spinner.show();
            this.getBitbnsPrices();
        }

    }

    toggleClass(coinPara) {

        var match = this.viewData.find(b => b.coin === coinPara);
        if (match.iselargeFont)
            match.iselargeFont = !match.iselargeFont;
        else
            match.iselargeFont = true;
    }




}