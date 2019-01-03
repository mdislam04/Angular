import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket, Coin } from '../models/coinmarket';
import * as xml2js from 'xml2js';
import { PagerService } from '../services/PagerService';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public coinData: CoinMarket;
  public coinDataCopy: CoinMarket;
  viewData: Coin[] = [];
  coinToDisplay = ["BTC", "ETH", "XRP", "ZRX", "OMG", "GNT", "BAT", "AE"];


  refreshInterval: number = 10;
  RequestedCoin: string;

  // array of all items to be paged
  pagingData: any[];
  selectedItem: any;
  nextMarker: any;
  public dateTime: Date;
  priceDate: any;



  constructor(private service: DataService, private pagerService: PagerService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.dateTime = new Date();
    this.getPriceHistoryEntryList();
  }

  updatePaging(action: any) {
    this.getPriceHistoryEntryList();
  }

  getData() {
    this.nextMarker = null;
    this.getPriceHistoryEntryList();

  }

  getFileNamePrefix(): string {

    if (this.dateTime) {
      var month = this.dateTime.getMonth() + 1;
      var day = this.dateTime.getDate();
      var output = (day < 10 ? '0' : '') + day
        + (month < 10 ? '0' : '') + month
        + this.dateTime.getFullYear() % 100;

      return output;
    }

  }

  setDate(timestamp: any) {
    var theDate = new Date(timestamp * 1000);
    this.priceDate = theDate.toDateString() + ' ' + theDate.toLocaleTimeString();

  }
  setPage(page: any) {
    this.spinner.show()
    this.selectedItem = page;
    this.service.getCoinMarketDataHistoryPrice(page.Url[0]).subscribe(
      data => {


        this.coinData = JSON.parse(data);
        this.setDate(this.coinData.metadata.timestamp);
        var current = Object.values(this.coinData.data);

        // Set Coin to display
        this.viewData = [];
        this.coinToDisplay.sort().forEach(coin => {
          var match = current.find(o => o.symbol == coin);
          this.viewData.push(match);
        });
        this.coinDataCopy = data;
        this.spinner.hide();
      });

  }

  public getPriceHistoryEntryList() {
    this.spinner.show();
    var fileNamePrefix = 'price_' + this.getFileNamePrefix();
    this.service.getCoinMarketDataHistoryList(this.nextMarker, fileNamePrefix).subscribe(
      data => {
        var result;
        xml2js.parseString(data, (e, r) => { result = r });        
        this.pagingData = result.EnumerationResults.Blobs[0].Blob;
        this.nextMarker = result.EnumerationResults.NextMarker[0];
        this.setPage(this.pagingData[0]);
      });

  }



  removeCoin(coinPara) {
    var index = this.coinToDisplay.indexOf(coinPara);
    if (index > -1) {
      this.coinToDisplay.splice(index, 1);
      var current = Object.values(this.coinData.data);

      // Set Coin to display
      this.viewData = [];
      this.coinToDisplay.sort().forEach(coin => {
        var match = current.find(o => o.symbol == coin);
        this.viewData.push(match);
      });
    }

  }

  addCoin() {
    if (!this.coinToDisplay.find(o => o === this.RequestedCoin.toUpperCase())) {
      var allCoins = Object.values(this.coinData.data);
      if (allCoins.find(c => c.symbol === this.RequestedCoin.toUpperCase()))
        this.coinToDisplay.push(this.RequestedCoin.toUpperCase());

      var current = Object.values(this.coinData.data);

      // Set Coin to display
      this.viewData = [];
      this.coinToDisplay.sort().forEach(coin => {
        var match = current.find(o => o.symbol == coin);
        this.viewData.push(match);
      });
    }

  }
}