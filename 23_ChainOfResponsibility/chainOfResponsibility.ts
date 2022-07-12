/**
 * Use chain of responsibility when you encounter the need to execute several handlers in a particular order
 * The client can trigger any handler in the chain
 * each handler must process request and pass it along to the chain
 */

type UserInfo = {
    name: string;
    password: string;
}

const Jack: UserInfo = {
    name: "jack",
    password: "jack123"
}

interface AuthChain {
    Process(u: UserInfo): void;
    Next(u: UserInfo): void;
}

class BaseAuthenticator implements AuthChain {
    next?: AuthChain;
    SetNext(next: AuthChain) {
        this.next = next;
    }

    Process(u: UserInfo) {}

    Next(u:UserInfo) {
        if (this.next) {
            this.next.Process(u);
        }
    }
}

class UsernameAuthenticator extends BaseAuthenticator {
    constructor() {
        super();
    }
    Process(u: UserInfo): void {
        if (u.name != Jack.name) {
            throw "wrong username";       
        }
        this.Next(u);
    }
}


class PasswordAuthenticator extends BaseAuthenticator {
    constructor() {
        super();
    }
    Process(u: UserInfo): void {
        if (u.password != Jack.password) {
            throw "wrong password";       
        }
        this.Next(u);
    }
}

function main() {
    const testUser: UserInfo = {
        name: "Jackie",
        password: "Jackie123"
    }
    const nameAuth = new UsernameAuthenticator();
    const pwdAuth = new UsernameAuthenticator();
    nameAuth.SetNext(pwdAuth);
    try {
        nameAuth.Process(testUser)
    } catch (e) {
        console.error(e);
        return;
    }
    console.log("Authentication success");

    
}