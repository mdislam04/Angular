import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pricehistory',
  templateUrl: './koinexpricehistory.component.html',
  styleUrls: ['./koinexpricehistory.component.css']
})
export class KoinexPriceHistoryComponent implements OnInit {


  public dateTime: Date;
  priceHistory: any;

  public visibilityControl = {
    isBTCVisible: true,
    isXRPVisible: true,
    isZRXVisible: true,
    isGNTVisible: true,
    isOMGVisible: true,
    isETHVisible: true,
    isNCASHVisible: false,
    isTRXVisible: true,
    isBATVisible: true,
    isAEVisible: true,
    isLTCVisible: true,
    isONTVisible: false,
    isEOSVisible: false,
    isNEOVisible: false,
    isREQVisible: false,
    isTUSDVisible: false,
  };

  constructor(private service: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.dateTime = new Date();
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

  getData() {
    this.getPriceDetails();

  }


  getPriceDetails() {
    this.spinner.show();
    var authToken = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rl&se=2019-03-31T13:07:07Z&st=2019-01-07T05:07:07Z&spr=https,http&sig=ujyQjO13AcWRMCFlb9a5PRPWAhddfvI76eJGSGyymOc%3D';
    var url = 'https://cryptofunctionstorage.table.core.windows.net/koinexPriceHistory()?';
    var tableFilter = "&$filter=FilterKey eq " + "'" + this.getFileNamePrefix() + "'";
    url = url + authToken + tableFilter;
    this.service.getCoinMarketHistoryPriceDetail(url).subscribe(
      data => {
        this.priceHistory = data.value.reverse();
        this.spinner.hide();
      });
  }

  ToggleColumn(column) {
    switch (column) {
      case 'btc':
        this.visibilityControl.isBTCVisible = !this.visibilityControl.isBTCVisible;
        break;
      case 'xrp':
        this.visibilityControl.isXRPVisible = !this.visibilityControl.isXRPVisible;
        break;
      case 'zrx':
        this.visibilityControl.isZRXVisible = !this.visibilityControl.isZRXVisible;
        break;
      case 'gnt':
        this.visibilityControl.isGNTVisible = !this.visibilityControl.isGNTVisible;
        break;
      case 'omg':
        this.visibilityControl.isOMGVisible = !this.visibilityControl.isOMGVisible;
        break;
      case 'eth':
        this.visibilityControl.isETHVisible = !this.visibilityControl.isETHVisible;
        break;
      case 'ncash':
        this.visibilityControl.isNCASHVisible = !this.visibilityControl.isNCASHVisible;
        break;
      case 'trx':
        this.visibilityControl.isTRXVisible = !this.visibilityControl.isTRXVisible;
        break;
      case 'bat':
        this.visibilityControl.isBATVisible = !this.visibilityControl.isBATVisible;
        break;
      case 'ae':
        this.visibilityControl.isAEVisible = !this.visibilityControl.isAEVisible;
        break;
      case 'ltc':
        this.visibilityControl.isLTCVisible = !this.visibilityControl.isLTCVisible;
        break;
      case 'ont':
        this.visibilityControl.isONTVisible = !this.visibilityControl.isONTVisible;
        break;

      case 'eos':
        this.visibilityControl.isEOSVisible = !this.visibilityControl.isEOSVisible;
        break;
      case 'neo':
        this.visibilityControl.isNEOVisible = !this.visibilityControl.isNEOVisible;
        break;
      case 'req':
        this.visibilityControl.isREQVisible = !this.visibilityControl.isREQVisible;
        break;
      case 'tusd':
        this.visibilityControl.isTUSDVisible = !this.visibilityControl.isTUSDVisible;
        break;
      case 'all':
        this.visibilityControl.isAEVisible = true;
        this.visibilityControl.isBATVisible = true;
        this.visibilityControl.isBTCVisible = true;
        this.visibilityControl.isEOSVisible = true;
        this.visibilityControl.isETHVisible = true;
        this.visibilityControl.isGNTVisible = true;
        this.visibilityControl.isLTCVisible = true;
        this.visibilityControl.isNCASHVisible = true;
        this.visibilityControl.isNEOVisible = true;
        this.visibilityControl.isOMGVisible = true;
        this.visibilityControl.isONTVisible = true;
        this.visibilityControl.isREQVisible = true;
        this.visibilityControl.isTRXVisible = true;
        this.visibilityControl.isTUSDVisible = true;
        this.visibilityControl.isXRPVisible = true;
        this.visibilityControl.isZRXVisible = true;        

        break;
    }
  }

}