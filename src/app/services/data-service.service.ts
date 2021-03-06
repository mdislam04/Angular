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
  alertFunctionUrl = "https://cryptonotifications.azurewebsites.net/api/trigger";

  public GetBinanceTicker(): Observable<any> {

    return this.http.get(this.requestURL);
  }

  public GetBinancePriceChange(): Observable<any> {

    return this.http.get('https://api.binance.com/api/v1/ticker/24hr');
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

  public getBitBnsData(): Observable<any> {

    return this.http.get('https://cors-anywhere.herokuapp.com/https://bitbns.com/order/getTickerWithVolume/');
  }

  public getTotalMarketCapData(): Observable<any> {

   
    return this.http.get('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=a1cab950-642b-4b79-8f89-f96bc8fb4c18');
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
 
    return this.http.post(this.alertFunctionUrl, data, );
  }

}
