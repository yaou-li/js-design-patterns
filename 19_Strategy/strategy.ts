/**
 * Strategy pattern lets the algorithm vary independently from clients that use it
 * Use strategy pattern when a class have one behavior that is similar to other behavior in a list
 */

interface PayStrategy {
    Pay();
}

class PayService {
    strategy: PayStrategy
    constructor() {}
    SetStrategy(strategy: PayStrategy): PayService {
        this.strategy = strategy
        return this;
    }
    
    TryToPay() {
        this.strategy.Pay()
    }
}

class PayWithDebit {
    Pay() {
        console.log("paying with debit card");
    }
}

class PayWithCredit {
    Pay() {
        console.log("paying with credit card");
    }
}

function main() {
    const ps1 = new PayService();
    const ps2 = new PayService();
    const debit = new PayWithDebit();
    const credit = new PayWithCredit();

    ps1.SetStrategy(debit).TryToPay();
    ps2.SetStrategy(credit).TryToPay();
}