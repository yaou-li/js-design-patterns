/**
 * Proxy pattern is used to limit access to another class
 */

type APIResponse = {
    Code: number;
    Msg?: string;
    Data?: object;
}

type APIRequest = {
    Headers?: object;
    Body: object;
}

interface Handler {
    GetURI(): string;
    Handle(req: APIRequest): APIResponse;
    RateLimit?(): boolean;
}

class APIHandlerProxy implements Handler {
    handler: HTTPHandler;
    constructor(uri: string) {
        this.handler = new HTTPHandler(uri);
    }
    GetURI(): string {
        return this.handler.GetURI();
    }
    Handle(req: APIRequest): APIResponse {
        if (this.RateLimit()) {
            return this.handler.Handle(req);
        } else {
            return {
                Code: -1,
                Msg: "Exceeded rate limit"
            };
        }
    }
    RateLimit(): boolean {
        return true;
    }
}


class HTTPHandler implements Handler {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }
    GetURI() {
        return this.uri;
    }
    Handle(req: APIRequest): APIResponse {
        return {
            Code: 0,
            Msg: "success"
        };
    }
}

function main() {
    const h = new APIHandlerProxy("/test");
    h.Handle({
        Body: {
            name: "noname",
            age: "98"
        }
    })
}