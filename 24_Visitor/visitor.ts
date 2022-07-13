/**
 * Double Dispatch: delegates choosing the proper method to the object itself instead of letting the client select a method
 * Visitor pattern isolate particular behaviors from the objects on which they operate
 * And places them in a single class
 */

interface Visitor {
    Visit(client: Client): void;
}


interface Client {
    name: string;
    address: string;
    phone: string;
    Accept(visitor: Visitor): void;
}

class BaseClient implements Client {
    name: string;
    address: string;
    phone: string;
    constructor(name: string, address: string, phone: string) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    Accept(visitor: Visitor): void {}
}

class Bank extends BaseClient {
    employees: Array<string>;
    constructor(name: string, address: string, phone: string) {
        super(name, address, phone);
        this.employees = [];
    }
    Accept(visitor: Visitor): void {
        visitor.Visit(this);
    }
}

class School extends BaseClient {
    students: Array<string>;
    constructor(name: string, address: string, phone: string) {
        super(name, address, phone);
        this.students = [];
    }
    Accept(visitor: Visitor): void {
        visitor.Visit(this);
    }
}


class Messenger implements Visitor {
    clients: Array<Client>;
    constructor() {
        this.clients = [];
    }
    AddClient(client: Client) {
        this.clients.push(client);
    }
    sendCustomizedMessage() {
        for (let client of this.clients) {
            client.Accept(this);
        }
    }
    Visit(client: Client): void {
        if (this.IsBank(client)) {
            console.log("Sending specific ads to bank");
        } else if (this.IsSchool(client)) {
            console.log("Sending specific ads to school");
        }
    }

    IsBank(client: Client) {
        return (client as Bank).employees !== undefined;
    }

    IsSchool(client: Client) {
        return (client as School).students !== undefined;
    }
}


function main() {
    const v = new Messenger();
    v.AddClient(new School("NYU", "Manhattan", "123-456-7890"));
    v.AddClient(new Bank("Chase", "Manhattan", "234-567-8901"));
    v.sendCustomizedMessage();
}