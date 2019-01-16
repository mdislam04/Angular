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
    binacePriceDiff:number;
    poloniexPriceDiff:number;


}