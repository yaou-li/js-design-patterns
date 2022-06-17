/**
 * Allow subscribers to receive notifications sent by distributor on time
 */

interface Notifier {
    observers: Map<Observer, Set<string>>;
    topics: Map<string, Set<Observer>>;
    Subscribe(topic: string, o: Observer): void;
    Unsubscribe(topic: string, o: Observer): void;
    Notify(topic: string): void;
}

interface Observer {
    Send(msg: string): void;
}

class GameBuyer implements Observer {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    Send(msg: string): void {
        console.log(msg);
    }
}

class BaseNotifier implements Notifier {
    observers: Map<Observer, Set<string>>;
    topics: Map<string, Set<Observer>>;
    constructor() {
        this.observers = new Map();
        this.topics = new Map();
    }
    Subscribe(topic: string, o: Observer): void {
        const t = this.topics.get(topic) || new Set();
        t.add(o);
        this.topics.set(topic, t);
        const ob = this.observers.get(o) || new Set();
        ob.add(topic);
        this.observers.set(o, ob);
    }

    Unsubscribe(topic: string, o: Observer): void {
        const t = this.topics.get(topic) || new Set();
        t.delete(o);
        this.topics.set(topic, t);
        const ob = this.observers.get(o) || new Set();
        ob.delete(topic);
        if (ob.size < 1) {
            this.observers.delete(o);
        } else {
            this.observers.set(o, ob);
        }
    }

    Notify(topic: string): void {
        const t = this.topics.get(topic);
        t.forEach((o) => {
            o.Send(topic);
        });
    }
}


class GameStore extends BaseNotifier {
    Games: Set<string>;
    constructor() {
        super();
        this.Games = new Set();
    }

    Preorder(game: string, o: Observer) {
        this.Subscribe(game, o);
    }

    CancelOrder(game: string, o: Observer) {
        this.Unsubscribe(game, o);
    }

    NewGameArrived(game: string) {
        this.Games.add(game);
        this.Notify(game);
    }
}

function main() {
    const gs = new GameStore();
    const buy1 = new GameBuyer("Mike");
    const buy2 = new GameBuyer("Jack");
    gs.Preorder("DiaboII", buy1);
    gs.Preorder("DiaboII", buy2);
    gs.Preorder("TorchLight", buy1);
    gs.CancelOrder("DiaboII", buy2);
}