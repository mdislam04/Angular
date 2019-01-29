import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket, Coin } from '../models/coinmarket';
import * as xml2js from 'xml2js';
import { PagerService } from '../services/PagerService';
import { NgxSpinnerService } from 'ngx-spinner';
import { PriceHistory, Token } from '../models/Token';

@Component({
  selector: 'app-history',
  templateUrl: './coinMarkethistory.component.html',
  styleUrls: ['./coinMarkethistory.component.css']
})
export class CoinMarkeHistoryComponent implements OnInit {

  public coinData: CoinMarket;
  public coinDataCopy: CoinMarket;
  viewData: Coin[] = [];

  private storage: any;
  coinToDisplay: any;


  refreshInterval: number = 10;
  RequestedCoin: string;

  // array of all items to be paged
  pagingData: any[];
  pagingDataMaster: any[];
  page_number: number = 0;
  pageSize: number = 10;
  isPrevEnabled = false;
  isNextEnabled = true;
  selectedItem: any;
  nextMarker: any;
  public dateTime: Date;
  priceDate: any;

  priceHistoryMaster: any;
  priceHistory = <PriceHistory>{ coinMarketCap: [] };

  public min_max = {
    low: undefined,
    high: undefined,
    lowTime: undefined,
    highTime: undefined
  };



  constructor(private service: DataService, private pagerService: PagerService,
    private spinner: NgxSpinnerService) {
    this.storage = localStorage;
  }

  ngOnInit() {
    if (this.storage.getItem('coinToDisplay'))
      this.coinToDisplay = JSON.parse(this.storage.getItem('coinToDisplay'));
    else
      this.coinToDisplay = ["BTC", "ETH", "XRP", "ZRX", "OMG", "GNT", "BAT", "AE"];
    this.dateTime = new Date();
    this.getPriceHistoryEntryList();
    this.getPriceDetails();
  }

  updatePaging(action: any) {
    if (action === "next" && (this.page_number * this.pageSize) <= this.pagingDataMaster.length) {
      this.page_number += 1;
      this.isPrevEnabled = true;
    }

    else if (action === "prev" && this.page_number != 0) {
      this.page_number -= 1;
      this.isNextEnabled = true;
    }


    this.getPagingData();
  }

  getData() {
    this.nextMarker = null;
    this.getPriceHistoryEntryList();
    this.getPriceDetails();

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
        this.pagingDataMaster = result.EnumerationResults.Blobs[0].Blob;
        this.pagingDataMaster.reverse();
        this.getPagingData();
      });

  }

  getPagingData() {
    if ((this.page_number * this.pageSize) <= this.pagingDataMaster.length)
      this.pagingData = this.pagingDataMaster.slice(this.page_number * this.pageSize, (this.page_number + 1) * this.pageSize);

    if (this.pagingData.length < this.pageSize)
      this.isNextEnabled = false;
    if (this.page_number == 0)
      this.isPrevEnabled = false;
    this.setPage(this.pagingData[0]);
  }



  removeCoin(coinPara) {
    var index = this.coinToDisplay.indexOf(coinPara);
    if (index > -1) {
      this.coinToDisplay.splice(index, 1);
      this.storage.setItem('coinToDisplay', JSON.stringify(this.coinToDisplay));
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
      if (allCoins.find(c => c.symbol === this.RequestedCoin.toUpperCase())) {
        this.coinToDisplay.push(this.RequestedCoin.toUpperCase());
        this.storage.setItem('coinToDisplay', JSON.stringify(this.coinToDisplay));
      }

      var current = Object.values(this.coinData.data);

      // Set Coin to display
      this.viewData = [];
      this.coinToDisplay.sort().forEach(coin => {
        var match = current.find(o => o.symbol == coin);
        this.viewData.push(match);
      });
    }

  }

  showPriceHistory(symbol) {

       
    this.priceHistory.coinMarketCap = [];
    this.priceHistoryMaster.forEach(coin => {
      let tk = <Token>{ price: coin[symbol], symbol: symbol, time: coin.time };
      this.priceHistory.coinMarketCap.push(tk);
      this.priceHistory.coinMarketCap;
    });

    var filterCoin = this.priceHistoryMaster.map(function (item) {
      return item[symbol];
    });

    this.min_max.high = Math.max(...filterCoin);
    this.min_max.low =  Math.min(...filterCoin);
    this.min_max.highTime = this.priceHistory.coinMarketCap.find(c => c.price == this.min_max.high).time;
    this.min_max.lowTime = this.priceHistory.coinMarketCap.find(c => c.price == this.min_max.low).time;
    console.log(JSON.stringify(this.priceHistory.coinMarketCap.find(c => c.price == this.min_max.high)));
    
    

  }

  getPriceDetails() {
    var authToken = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rl&se=2019-03-31T13:07:07Z&st=2019-01-07T05:07:07Z&spr=https,http&sig=ujyQjO13AcWRMCFlb9a5PRPWAhddfvI76eJGSGyymOc%3D';
    var url = 'https://cryptofunctionstorage.table.core.windows.net/priceHistory()?';
    var tableFilter = "&$filter=FilterKey eq " + "'" + this.getFileNamePrefix() + "'";
    url = url + authToken + tableFilter;
    this.service.getCoinMarketHistoryPriceDetail(url).subscribe(
      data => {
        this.priceHistoryMaster = data.value;        
      });
  }

}