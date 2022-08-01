/**
 * The Iterator pattern extracts the traversal behaviorof a collection
 * into separate object called iterator
 */

interface IIterator<T> {
    HasMore(): boolean;
    GetNext(): T | void;
    Reset(): void;
}

class ArrayIterator<T> implements IIterator<T> {
    next: number;
    list: Array<T>;
    constructor(list? : Array<T>) {
        this.next = 0;
        this.list = list || [];
    }

    HasMore(): boolean {
        return this.next >= this.list.length;
    }

    GetNext(): T | void {
        if (!this.HasMore()) {
            return;
        }
        return this.list[this.next++];
    }

    Reset(): void {
        this.next = 0;
        this.list = [];
    }
}

type Stock = {
    name: string;
    code: string;
}

function main() {
    const stocks = new ArrayIterator<Stock>([{name: 'google', code: 'GOOGL'}, { name: 'apple', code: 'AAPL'}]);
    while (stocks.HasMore()) {
        console.log(stocks.GetNext());
    }
}