export class AlertTiggers {
  coin: string;
  isKonexChecked: boolean = false;
  isBinanceChecked: boolean = true;
  lowPriceBinance: string;
  highPriceBinance: string;
  lowPriceKoinex: string;
  highPriceKoinex: string;
  currentPriceKoinex: string;
  currentPriceBinance: string;
}

export class Portfolio {
  quantity: number;
  PartitionKey : string;
  RowKey : string;
  Timestamp : string;
  manualPrice : number;
}
