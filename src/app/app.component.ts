import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private titleService: Title, private router:Router) {
    
  }
  ngOnInit() {
    this.router.events
    .subscribe((event) => {
        if (event instanceof NavigationEnd) {
            switch(this.router.url)
            {
              case "/coinMarketLive":
              this.titleService.setTitle("Coin Market Live");
              break;
              case "/coinMarketHistory":
              this.titleService.setTitle("Coin Market History");
              break;
              case "/coinMarketHistoryListing":
              this.titleService.setTitle("Price Listing - CM");
              break;
              case "/koinexpricehistory":
              this.titleService.setTitle("Koinex History");
              break;
              case "/koinexpricehistorySortable":
              this.titleService.setTitle("Koinex History Sortable");
              break;
              case "/binancepricehistory":
              this.titleService.setTitle("Binanace History");
              break;
            }
        }
    });
  }

}
