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

   openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
   closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
