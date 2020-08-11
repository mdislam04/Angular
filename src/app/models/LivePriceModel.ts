export class LivePrice {
    symbol: string;
    prices: LivePriceDetail;    
}

export class LivePriceDetail {
    koinexPrice:number;
    binacePrice:string;
 
  
    isBtcPrice:boolean;
    priceChangePercent:string;
    highPrice:string;
    lowPrice:string;
    bidPrice:string;
    askPrice:string;



}