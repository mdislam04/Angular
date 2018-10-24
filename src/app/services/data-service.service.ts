import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CoinMarket } from '../profile/coinmarket';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  proxyURL = 'https://cors-anywhere.herokuapp.com';
  requestURL = 'https://api.binance.com/api/v3/ticker/price';
  binanaceUrl = this.proxyURL + '/' + this.requestURL;

  

  public GetBinanceTicker(): Observable<any> {

    return this.http.get(this.binanaceUrl);
  }

  public GetKoinexTicker(): Observable<any> {

    return this.http.get('https://koinex.in/api/ticker');
  }

  public GetPoloniexTicker(): Observable<any> {

    return this.http.get('https://poloniex.com/public?command=returnTicker');
  }

  public getCoinMarketData(): Observable<any> {

    return this.http.get('https://api.coinmarketcap.com/v2/ticker/');
  }

}
