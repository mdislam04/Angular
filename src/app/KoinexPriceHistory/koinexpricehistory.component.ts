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
  priceHistory : any;
  
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
    var tableFilter = "&$filter=FilterKey eq " + "'"+this.getFileNamePrefix()+"'";
    url = url + authToken + tableFilter;
    this.service.getCoinMarketHistoryPriceDetail(url).subscribe(
      data => {
        this.priceHistory=data.value.reverse();
        this.spinner.hide();    
        
      });
  }

}