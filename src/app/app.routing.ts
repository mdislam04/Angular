import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KoinexPriceHistoryComponent } from './KoinexPriceHistory/koinexpricehistory.component';
import { PriceHistoryComponent } from './CoinMarketCapPriceHistory/pricehistory.component';
import { BinanacePriceHistoryComponent } from './binance/binanacepricehistory.componet';
import { KoinexPriceHistoryComponentSortable } from './KoinexPriceHistory/koinexpricehistory.componentSortable';
import { CoinMarkeHistoryComponent } from './coinMarketHistory/coinMarkethistory.component';
import { CoinMarketLiveComponent } from './coinMarket/coinMarketLive.component';
import { NotificationComponent } from './notification/notificationmanagement.component';

const appRoutes: Routes = [
    {
        path: '',
        component:HomeComponent     
    },
    
    {
        path: 'home',
        component:HomeComponent     
    },
    {
        path: 'coinMarketLive',
        component:CoinMarketLiveComponent     
    },
    {
        path: 'coinMarketHistory',
        component:CoinMarkeHistoryComponent     
    },
    {
        path: 'coinMarketHistoryListing',
        component:PriceHistoryComponent     
    },
    {
        path: 'koinexpricehistory',
        component:KoinexPriceHistoryComponent     
    },
    {
        path: 'koinexpricehistorySortable',
        component:KoinexPriceHistoryComponentSortable     
    },
    {
        path: 'binancepricehistory',
        component:BinanacePriceHistoryComponent     
    },
    {
        path: 'notification',
        component:NotificationComponent     
    }
];

export const RotingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);