import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  proxyURL = 'https://cors-anywhere.herokuapp.com';
  requestURL = 'https://api.binance.com/api/v3/ticker/price';
  binanaceUrl = this.proxyURL + '/' + this.requestURL;
  alertFunctionUrl = "https://cryptopricehistory.azurewebsites.net/api/setNotificationTrigger";

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

  public getCoinMarketDataHistoryList(marker: any, prefix:any): Observable<any> {
    var url = 'https://cryptofunctionstorage.blob.core.windows.net/pricehistory?restype=container&comp=list';
    if (marker)
      url = url + '&marker=' + marker;
      if (prefix)
      url = url + '&prefix=' + prefix;
    let headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
    return this.http.get(url, { headers: headers, responseType: 'text' });
  }

  public getCoinMarketDataHistoryPrice(url: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
    return this.http.get(url, { headers: headers, responseType: 'text' });
  }

  public getCoinMarketHistoryPriceDetail(url: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json;odata=nometadata'
    });
    return this.http.get(url,{ headers: headers});
  }

  public getNotificationTriggers(url: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json;odata=nometadata'
    });
    return this.http.get(url,{ headers: headers});
  }

  public updateAlertTrigger(data: any): Observable<any> {

    return this.http.post(this.alertFunctionUrl, data);
  }

}
