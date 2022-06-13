/**
 * decorator allows you to attach new behavior to an object
 * Use it when you want the capabilities of inheritance with subclasses,
 * but you need to add functionality at runtime
 */
type UserInfo = {
    email: string;
    phone: string;
    wechat: string;
}

class DataService {
    userInfo: Map<String, UserInfo>;
    constructor() {
        this.userInfo = new Map();
        this.userInfo.set("Mike", {
            email: "mike@gmail.com",
            phone: "1-852-254-2542",
            wechat: "123456"
        });
    }

    GetEmail(name: string): string {
        return this.userInfo.get(name).email;
    }

    GetPhone(name: string): string {
        return this.userInfo.get(name).phone;
    }

    GetWechat(name: string): string {
        return this.userInfo.get(name).wechat;
    }
}

interface INotifier {
    Send(msg: string): void;
    GetUsername(): string;
}


class BaseNotifier implements INotifier {
    name: string;
    wrapped: INotifier;
    dataService: DataService;
    
    constructor(wrapped?: INotifier, name?: string) {
        if (wrapped) {
            this.wrapped = wrapped;
        } else {
            this.name = name;
        }        
        this.dataService = new DataService();
    }

    Send(msg: string) {
        if (this.wrapped) {
            this.wrapped.Send(msg);
        }
    }

    GetUsername(): string {
        return this.wrapped.GetUsername();
    }
}

class EmailNotifier extends BaseNotifier {
    constructor(wrapped?: INotifier, name?: string) {
        super(wrapped, name);
    }

    Send(msg: string) {
        super.Send(msg);
        const email = this.dataService.GetEmail(this.GetUsername());
        console.log(`Sent msg: ${msg} to email: ${email}`);
    }
}


class SMSNotifier extends BaseNotifier {
    constructor(wrapped?: INotifier, name?: string) {
        super(wrapped, name);
    }

    Send(msg: string) {
        super.Send(msg);
        const phone = this.dataService.GetPhone(this.GetUsername());
        console.log(`Sent msg: ${msg} to phone: ${phone}`);
    }
}

class WechatNotifier extends BaseNotifier {
    constructor(wrapped?: INotifier, name?: string) {
        super(wrapped, name);
    }
    
    Send(msg: string) {
        super.Send(msg);
        const wechat = this.dataService.GetWechat(this.GetUsername());
        console.log(`Sent msg: ${msg} to wechat: ${wechat}`);
    }
}

function main() {
    const emailNotifier = new EmailNotifier(null, "Mike");
    const smsNotifier = new SMSNotifier(emailNotifier);
    const wechatNotifier = new WechatNotifier(smsNotifier);
    
    wechatNotifier.Send("hello");
}