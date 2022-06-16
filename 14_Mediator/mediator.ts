/**
 * Defines an object that encasuplates how a set of other objects interact with one another
 * Restricts direct communications between objects and forces them to collaborate via a mediator
 */

interface Mediator {
    Sale(stockCode: string, price: number, shares: number, tradeCode: number): void;
    Buy(stockCode: string, price: number, shares: number, tradeCode: number): void;
    AddBroker(broker: Broker): void;
}

type StockOffer = {
    stockCode: string;
    price: number;
    shares: number;
    tradeCode: number;
}

class StockMediator implements Mediator {
    brokers: Map<number, Broker>;
    buyOffers: StockOffer[];
    saleOffers: StockOffer[];
    tradeCodeSeed: number;
    constructor() {
        this.tradeCodeSeed = 0;
    }

    Sale(stockCode: string, price: number, shares: number, tradeCode: number) {
        let success = false;
        for (let offer of this.buyOffers) {
            if (offer.stockCode === stockCode 
                && offer.price === price 
                && offer.shares === shares) {
                    console.log(`Trade complete, stock: ${stockCode}, buyer: ${offer.tradeCode}, saler: ${tradeCode}`);
                    const idx = this.buyOffers.indexOf(offer);
                    this.buyOffers.splice(idx, 1);
                    success = true;
                    break;
                }
        }
        if (!success) {
            this.saleOffers.push({
                stockCode,
                price,
                shares,
                tradeCode
            });
        }
    }

    Buy(stockCode: string, price: number, shares: number, tradeCode: number) {
        let success = false;
        for (let offer of this.saleOffers) {
            if (offer.stockCode === stockCode 
                && offer.price === price 
                && offer.shares === shares) {
                    console.log(`Trade complete, stock: ${stockCode}, buyer: ${tradeCode}, saler: ${offer.tradeCode}`);
                    const idx = this.saleOffers.indexOf(offer);
                    this.saleOffers.splice(idx, 1);
                    success = true;
                    break;
                }
        }
        if (!success) {
            this.buyOffers.push({
                stockCode,
                price,
                shares,
                tradeCode
            });
        }
    }

    AddBroker(broker: Broker): void {
        if (broker.tradeCode) return;
        this.tradeCodeSeed++;
        broker.SetTradeCode(this.tradeCodeSeed);
    }
}

interface Broker {
    mediator: Mediator;
    tradeCode: number;
    Sale(stockCode: string, price: number, shares: number): void;
    Buy(stockCode: string, price: number, shares: number): void;
    SetTradeCode(tradeCode: number): void;
}

class StockBroker implements Broker {
    mediator: Mediator;
    tradeCode: number;
    constructor(mediator: Mediator) {
        this.mediator = mediator;
        this.mediator.AddBroker(this);
    }
    
    SetTradeCode(tradeCode: number) {
        this.tradeCode = tradeCode;
    }

    Sale(stockCode: string, price: number, shares: number) {
        this.mediator.Sale(stockCode, price, shares, this.tradeCode);
    }

    Buy(stockCode: string, price: number, shares: number) {
        this.mediator.Sale(stockCode, price, shares, this.tradeCode);
    }
}

class JPMorgan extends StockBroker {
    name: string;
    constructor(mediator: Mediator) {
        super(mediator);
        this.name = "JPMorgan";
    }
}

class Robinhood extends StockBroker {
    name: string;
    constructor(mediator: Mediator) {
        super(mediator);
        this.name = "Robinhood";
    }    
}

function main() {
    const me = new StockMediator();
    const jp = new JPMorgan(me);
    const ro = new Robinhood(me);
    
    jp.Sale("MSFT", 1.5, 10);
    ro.Buy("MSFT", 1, 10);

    jp.Sale("GOOG", 1, 10);
    ro.Buy("GOOG", 1, 10);
}

