export class Token {
    symbol: string;
    price: number;
    time: string;
}

export class PriceHistory {
    coinMarketCap: Token[] = [];
    koinex: Token[] = [];
    binance: Token[] = [];

}