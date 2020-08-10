export class LivePrice {
    symbol: string;
    prices: LivePriceDetail;    
}

export class LivePriceDetail {
    koinexPrice:number;
    binacePrice:number;
    poloniexPrice:number;
    koinexInitialPrice:number;
    binaceInitialPrice:number;
    poloniexInitialPrice:number;
    koinexPriceDiff:number;
    binacePriceDiff:string;
    binacePriceDiffINR:any;
    poloniexPriceDiff:number;
    isBtcPrice:boolean;
    priceChangePercent:string;
    highPrice:string;
    lowPrice:string;
    bidPrice:string;
    askPrice:string;



}