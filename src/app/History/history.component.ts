import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { CoinMarket, Coin } from '../models/coinmarket';
import * as xml2js from 'xml2js';
import { PagerService } from '../services/PagerService';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public coinData: CoinMarket;
  public coinDataCopy: CoinMarket;
  viewData: Coin[] = [];
  coinToDisplay = ["BTC", "XRP", "ZRX", "OMG", "GNT"];


  refreshInterval: number = 10;
  RequestedCoin: string;

  // array of all items to be paged
  pagingData: any[];
  selectedItem: any;
  nextMarker: any;



  constructor(private service: DataService, private pagerService: PagerService) { }

  ngOnInit() {
    // this.getCoinMarketDataHistory();
    this.getPriceHistoryEntryList();
  }

  updatePaging(action: any) {
    this.getPriceHistoryEntryList();
  }

  setPage(page: any) {

    this.selectedItem = page;
    this.service.getCoinMarketDataHistoryPrice(page.Url[0]).subscribe(
      data => {

        this.coinData = JSON.parse(data).data;
        var current = Object.values(this.coinData);
        
        // Set Coin to display
        this.viewData = [];
        this.coinToDisplay.sort().forEach(coin => {
          var match = current.find(o => o.symbol == coin);
          this.viewData.push(match);
        });


        this.coinDataCopy = data;
      });

  }

  public getPriceHistoryEntryList() {

    this.service.getCoinMarketDataHistoryList(this.nextMarker).subscribe(
      data => {
        var result;
        xml2js.parseString(data, (e, r) => { result = r });
        console.log(result);
        this.pagingData = result.EnumerationResults.Blobs[0].Blob;
        this.nextMarker = result.EnumerationResults.NextMarker[0];
        this.setPage(this.pagingData[0]);
      });

  }

  public getCoinMarketDataHistory() {
    this.service.getCoinMarketData().subscribe(
      data => {
        this.coinData = data;
        var current = Object.values(this.coinData.data);

        // Set Coin to display
        this.viewData = [];
        this.coinToDisplay.sort().forEach(coin => {
          var match = current.find(o => o.symbol == coin);
          this.viewData.push(match);
        });

        this.coinDataCopy = data;

      }
    );
  }

  removeCoin(coinPara) {
    var index = this.coinToDisplay.indexOf(coinPara);
    if (index > -1) {
      this.coinToDisplay.splice(index, 1);
      this.getCoinMarketDataHistory();
    }

  }

  addCoin() {
    if (!this.coinToDisplay.find(o => o === this.RequestedCoin.toUpperCase())) {
      var allCoins = Object.values(this.coinData.data);
      if (allCoins.find(c => c.symbol === this.RequestedCoin.toUpperCase()))
        this.coinToDisplay.push(this.RequestedCoin.toUpperCase());
      this.getCoinMarketDataHistory();
    }

  }
}