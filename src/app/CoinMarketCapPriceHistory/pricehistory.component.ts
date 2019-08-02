import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pricehistory',
  templateUrl: './pricehistory.component.html',
  styleUrls: ['./pricehistory.component.css']
})
export class PriceHistoryComponent implements OnInit {

  
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
    var authToken = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-03-31T12:55:09Z&st=2019-08-02T04:55:09Z&spr=https,http&sig=S7Q8GcpHxGCAEYNJl5FdINNrlzh0%2BU%2F9UxL8RsTfpyU%3D';
    var url = 'https://cryptofunctionstorage.table.core.windows.net/priceHistory()?';
    var tableFilter = "&$filter=FilterKey eq " + "'"+this.getFileNamePrefix()+"'";
    url = url + authToken + tableFilter;
    this.service.getCoinMarketHistoryPriceDetail(url).subscribe(
      data => {
        this.priceHistory=data.value.reverse();  
        this.spinner.hide();    
        
      });
  }

}
