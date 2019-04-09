import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-pricehistory',
  templateUrl: './koinexpricehistory.componentSortable.html',
  styleUrls: ['./koinexpricehistory.component.css']
})
export class KoinexPriceHistoryComponentSortable implements OnInit {

  priceHistory: any;
  priceHistory1: Element[] = [];
  displayedColumns = ['time', 'BTC', 'XRP', 'ZRX', 'AE', 'GNT', 'OMG', 'BAT', 'ETH', 'TRX', 'ONT', 'LTC', 'EOS', 'NCASH', 'NEO', 'REQ', 'TUSD'];



  dataSource: MatTableDataSource<Element>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dateTime: Date;

  constructor(private service: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.dateTime = new Date();
    this.getPriceDetails();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    this.priceHistory1=[];
    var authToken = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-07-31T15:49:54Z&st=2019-04-01T07:49:54Z&spr=https&sig=kdyUoXqbjGoBU5ITRAP7ZGXihCNOYLOJ2eQF4u8v4Nk%3D';
    var url = 'https://cryptofunctionstorage.table.core.windows.net/koinexPriceHistory()?';
    var tableFilter = "&$filter=FilterKey eq " + "'" + this.getFileNamePrefix() + "'";
    url = url + authToken + tableFilter;
    this.service.getCoinMarketHistoryPriceDetail(url).subscribe(
      data => {
        this.priceHistory = data.value.reverse();
        this.priceHistory.forEach(p => {
          let tk = <Element>{
            time: p.time, BTC: p.BTC, XRP: p.XRP, AE: p.AE, ZRX: p.ZRX, GNT: p.GNT,
            OMG: p.OMG, BAT: p.BAT, ETH: p.ETH, TRX: p.TRX, ONT: p.ONT, LTC: p.LTC, EOS: p.EOS, NCASH: p.NCASH, NEO: p.NEO,
            REQ: p.REQ, TUSD: p.TUSD
          };
          this.priceHistory1.push(tk);
        });

        this.dataSource = new MatTableDataSource(this.priceHistory1);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      });
  }

}

export interface Element {
  time: string;
  BTC: number;
  XRP: number;
  AE: number;
  ZRX: number,
  GNT: number,
  OMG: number,
  BAT: number,
  ETH: number,
  TRX: number,
  ONT: number,
  LTC: number,
  EOS: number,
  NCASH: number,
  NEO: number,
  REQ: number,
  TUSD: number
}
