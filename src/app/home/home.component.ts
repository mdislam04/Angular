import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data-service.service";
import { AlertService } from "../services/alertService";
import { AlertTiggers, Portfolio } from "./AlertTriggers";
import { Title } from "@angular/platform-browser";
import { LivePrice } from "../models/LivePriceModel";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../environments/environment';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: DataService,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {
    this.storage = localStorage;
  }

  myControl = new FormControl();
  options: string[] = [
    "BTC",
    "ETH",
    "LTC",
    "XRP",
    "OMG",
    "REQ",
    "ZRX",
    "GNT",
    "BAT",
    "AE",
    "TRX",
    "XLM",
    "NEO",
    "GAS",
    "XRB",
    "NCASH",
    "EOS",
    "CMT",
    "ONT",
    "ZIL",
    "IOST",
    "ACT",
    "ZCO",
    "SNT",
    "POLY",
    "ELF",
    "REP",
  ].sort();
  filteredOptions: Observable<string[]>;
  storage: any;
  coinToDisplayMaster: any;
  coinToDisplay: any;
  binanceData: any;
  koinexData: any;
  poloniexData: any;
  i = 0;
  inetrvalId: any;
  inetrvalId1: any;
  intervalIdTitle: any;
  refreshInterval: number = 10;
  titleRefreshInterval: number = 6;
  RequestedCoin: string;
  lastUpdated: string;
  alertCoin: string;
  alertPrice: string;
  isAlertOn: boolean;
  isHighAlert: boolean;
  isBinaceAlertSet: boolean = true;
  showDetails: boolean = true;
  titleCoinIndex: number = 0;

  //
  alertTrigger: AlertTiggers = new AlertTiggers();
  prices: LivePrice[] = [];
  timer: Date;
  portfolioData: Portfolio[] = [];
  portfolioValue: number = 0;
  progressValue : number = 0;
  message : any;


  //
  ngOnInit() {
    if (!this.storage.getItem("timer")) {
      var date = new Date();
      this.timer = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes() - 30,
        0,
        0
      );
      this.storage.setItem("timer", this.timer);
    } else {
      this.timer = this.storage.getItem("timer");
    }

 
    this.portfolioData.push({ quantity: 100, RowKey : "OMG", PartitionKey : "portfolio", Timestamp : "" });
    this.getPortfolio();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.coinToDisplay = JSON.parse(this.storage.getItem("homePageCoin")) || [
      { symbol: "BTC", koinexInitial: undefined, binanceInitial: undefined },
    ];
    this.coinToDisplayMaster = JSON.parse(
      this.storage.getItem("homePageCoinMaster")
    ) || [
      { symbol: "BTC", koinexInitial: undefined, binanceInitial: undefined },
    ];
    this.storage.setItem("homePageCoin", JSON.stringify(this.coinToDisplay));

    this.setBinanceData();

    this.inetrvalId = setInterval(() => {
      this.setBinanceData();
      this.getPriceChange();
    }, this.refreshInterval * 1000);

    this.intervalIdTitle = setInterval(() => {
      this.updateProgress();
    }, 1000/3);
  }

  updateProgress()
  {
    this.progressValue += (100/(this.refreshInterval*3));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private setBinanceData() {
    this.service.GetBinanceTicker().subscribe((data) => {
      this.progressValue = 0;
      var d = new Date();
        this.lastUpdated = d.toLocaleTimeString();
      this.binanceData = data;
      this.setPrices("binance");
      this.setPortfolio();
    });
  }

  private getPriceChange() {
    this.service.GetBinancePriceChange().subscribe((data) => {
     // find the price symbol and set percent

     if(this.prices && this.prices.length > 0 && data)
     {
      this.prices.forEach(p => {
        var match = data.find(d => d.symbol == p.symbol +'USDT');
        if(match)
        {
          p.prices.priceChangePercent = match.priceChangePercent;
         
          p.prices.highPrice = Number.parseFloat(match.highPrice) < 1 ? Number.parseFloat(match.highPrice).toFixed(5).toString() : 
          Number.parseFloat(match.highPrice).toFixed(2).toString();
          p.prices.lowPrice = Number.parseFloat(match.lowPrice) < 1 ? Number.parseFloat(match.lowPrice).toFixed(5).toString() : 
          Number.parseFloat(match.lowPrice).toFixed(2).toString();
          p.prices.askPrice = match.askPrice;
          p.prices.bidPrice = match.bidPrice;
        }
      });
     }
     
    });
  }

  setPrices(exchange: any) {
    // Binance prices set

    if (this.prices.length > 0) {
      this.coinToDisplay.forEach((p) => {
        this.prices.forEach((k) => {
          if (k.symbol === p.symbol) {
            var match = this.binanceData.find(
              (b) => b.symbol === p.symbol + "USDT"
            );
            if (!match) {
              match = this.binanceData.find(
                (b) => b.symbol === p.symbol + "BTC"
              );
              k.prices.isBtcPrice = true;
            }
            if(match.symbol === "BTCUSDT")
            k.prices.binacePrice =  Number.parseFloat(match.price).toFixed(1) ; 
            else
            k.prices.binacePrice =  Number.parseFloat(match.price).toFixed(6) ; 
           
      
      
      
          }
        });
      });
    } else {
      this.coinToDisplay.forEach((p) => {
        var match = this.binanceData.find((b) => b.symbol == p.symbol + "USDT");
        let price = <LivePrice>{ symbol: p.symbol, prices: {} };
        if (!match) {
          match = this.binanceData.find((b) => b.symbol === p.symbol + "BTC");
          price.prices.isBtcPrice = true;
        }
        if (match) {
          price.prices.binacePrice = match.price;
         
        
          this.prices.push(price);
        }
      });
    }
  }

  addCoin() {
    if (this.RequestedCoin != "") {
      if (
        !this.coinToDisplayMaster.find(
          (o) => o.symbol === this.RequestedCoin.toUpperCase()
        )
      ) {
        this.coinToDisplayMaster.push({
          symbol: this.RequestedCoin.toUpperCase(),
          koinexInitial: undefined,
          binanceInitial: undefined,
        });
      }
      console.log(JSON.stringify(this.coinToDisplayMaster));
      if (
        !this.coinToDisplay.find(
          (o) => o.symbol === this.RequestedCoin.toUpperCase()
        )
      ) {
        this.coinToDisplay.push({
          symbol: this.RequestedCoin.toUpperCase(),
          koinexInitial: undefined,
          binanceInitial: undefined,
        });
        console.log(JSON.stringify(this.coinToDisplay));
        this.prices = [];
        this.setPrices("koinex");
        this.setPrices("binance");
      }

      this.storage.setItem("homePageCoin", JSON.stringify(this.coinToDisplay));
      this.storage.setItem(
        "homePageCoinMaster",
        JSON.stringify(this.coinToDisplayMaster)
      );
      this.RequestedCoin = "";
    }
  }

  removeCoin(coinPara, coinIndex) {
    var index = this.coinToDisplay.indexOf(
      this.coinToDisplay.find((c) => c.symbol == coinPara)
    );
    if (index > -1) {
      this.coinToDisplay.splice(index, 1);
      this.prices.splice(coinIndex, 1);
      this.storage.setItem("homePageCoin", JSON.stringify(this.coinToDisplay));
      this.storage.setItem(
        "homePageCoinMaster",
        JSON.stringify(this.coinToDisplayMaster)
      );
    }
  }

 

  toggleTitleTimer() {
  
      if (this.intervalIdTitle) {
        clearInterval(this.intervalIdTitle);
      
    } else {
      this.intervalIdTitle = setInterval(() => {
       
      }, this.titleRefreshInterval * 1000);
    }
  }

  ngOnDestroy() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    if (this.inetrvalId1) {
      clearInterval(this.inetrvalId1);
    }

    if (this.intervalIdTitle) {
      clearInterval(this.intervalIdTitle);
    }
  }

  changeInterval(ops) {
    if (ops === "+") this.refreshInterval += 5;
    else if (this.refreshInterval > 0) {
      this.refreshInterval -= 5;
    }
    this.restart();
  }

  public restart() {
    if (this.inetrvalId) {
      clearInterval(this.inetrvalId);
    }

    this.inetrvalId = setInterval(() => {
      this.setBinanceData();
    }, this.refreshInterval * 1000);
  }

  public opneAlertWindow(coin) {
    this.alertTrigger.coin = coin.toUpperCase();
    var coin = this.binanceData.find(
      (p) => p.symbol === this.alertTrigger.coin + "USDT"
    );
    this.alertTrigger.currentPriceBinance = coin.price;
    this.alertTrigger.currentPriceKoinex = this.koinexData.prices.inr[
      this.alertTrigger.coin
    ];
  }
  public setPriceAlert(alertType) {
    if (alertType === "on") {
      this.isAlertOn = true;
    } else {
      this.isAlertOn = false;
    }
  }

  setPortfolio() {
    if (this.binanceData) {
      this.portfolioValue = 0;
      this.portfolioData.forEach((c) => {
        var match = this.binanceData.find((b) => b.symbol === c.RowKey + "USDT");
        if (match)
          this.portfolioValue = this.portfolioValue + c.quantity * match.price;
      });

      var usdt = this.portfolioData.find(c => c.RowKey == "USDT");
      if(usdt)
      this.portfolioValue =
        this.portfolioValue + Number.parseFloat(usdt.quantity.toString());
        this.titleService.setTitle('Portfolio : '+ this.portfolioValue );
    }
  }

  updatePortfolio() {
    this.storage.setItem("portfolioData", JSON.stringify(this.portfolioData));
    this.setPortfolio();
 // call service to update portfolio data
     this.spinner.show();
      this.message = "";
      this.portfolioData.forEach(element => {
        element.PartitionKey = 'portfolio'
      });

       
      this.service.updateAlertTrigger({ "ops": "portfolio", "payload": this.portfolioData}).subscribe(
        data => {
            this.message = data.message;
            this.spinner.hide();
        }
    );   
    
  }

  getPortfolio() {        
    //var authToken = 'sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-12-31T00:30:39Z&st=2020-03-31T16:30:39Z&spr=https&sig=5JvB34r9rlNALJlnIicllhUXKXF0cT5XoUiBJeDaAyk%3D';
    var url = 'https://cryptofunctionstorage.table.core.windows.net/portfolio()?';
    
    url = url + environment.token;
    this.service.getNotificationTriggers(url).subscribe(
      data => {
        
        this.portfolioData = data.value;

       
      });
  }

  addToPortfolio() {
    this.portfolioData.push({ quantity: 0 , PartitionKey: "portfolio", RowKey : "BTC", Timestamp : "" });
  }

  removeFromPortfolio(coin, cindex) {
    var index = this.portfolioData.indexOf(
      this.portfolioData.find((c) => c.RowKey == coin)
    );
    if (index > -1) {
      this.portfolioData.splice(index, 1);
      
    }
    // alert("Updated");
  }
}
