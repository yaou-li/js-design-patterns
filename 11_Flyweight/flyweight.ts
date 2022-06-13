/**
 * flyweight design pattern lets you fit more objects into the available RAM 
* by sharing common parts of state between multiple object
* instead of storing all of the data in each object individually
*/

class Book {
    name: string;
    price: number;
    publisherInfo: PublisherInfo;
    constructor(name: string, price: number, publisherInfo: PublisherInfo) {
        this.name = name;
        this.price = price;
        this.publisherInfo = publisherInfo;
    }
}


class PublisherInfo {
    publisher: string;
    address: string;
    data: object;
    constructor(publisher: string, address?: string, data?: object) {
        this.publisher = publisher;
        this.address = address;
        this.data = {
            ...data
        };
    }
}


class PublisherFactory {
    publishers: Map<string, PublisherInfo>;
    constructor() {
        this.publishers = new Map();
    }
    GetPublisherInfo(publisher: string, address?: string, data?: object): PublisherInfo {
        if (!this.publishers.has(publisher)) {
            this.publishers.set(publisher, new PublisherInfo(publisher, address, data));
        }
        return this.publishers.get(publisher);
    }
}

class BookStore {
    publisherFactory: PublisherFactory;
    books: Book[];
    
    constructor() {
        this.publisherFactory = new PublisherFactory();
        this.books = [];
    }

    Add(name: string, price: number, publisher: string, address?: string, data?: object) {
        this.books.push(new Book(name, price, this.publisherFactory.GetPublisherInfo(publisher, address, data)));
    }
}


main() {
    const store = new BookStore();
    store.Add("I feel good", 100, "Nice And Clean Factory", "Right next to your door")
    store.Add("I feel bad", 100, "Nice And Clean Factory", "Right next to your door")
    store.Add("Today's weather is perfect", 100, "Factory Perfectionist", "Left next to your door")
    store.Add("Mr.perfect", 100, "Factory Perfectionist", "Left next to your door")
}