/**
 * Facade pattern is a interface that can perform many other actions behind the scene
 */
interface BaseATM {
    Withdraw(num: number): boolean;
    Deposit(num: number): boolean;
}

interface BaseRobot {
    SendWelcomeMsg(): string;
}

interface BaseAccountManager {
    IsValid(): boolean;
    IsPasswordValid(): boolean;
    HasFrozen(): boolean;
}

interface BaseBalanceManager {
    GetBalance(): number;
    HasEnoughMoney(num: number): boolean;
    Lock(): void;
    Unlock(): void;
    Deduct(num: number): boolean;
    Increase(num: number): boolean;
}

class ATMFacade implements BaseATM {
    robot: WelcomeRobot;
    amanager: AccountManager;
    bmanager: BalanceManager;
    constructor(account, password: string) {
        this.robot = new WelcomeRobot();
        this.amanager = new AccountManager(account, password);
        this.bmanager = new BalanceManager();
        this.robot.SendWelcomeMsg();
    }
    Withdraw(num: number):boolean {
        if (!this.amanager.IsValid() || !this.amanager.IsPasswordValid() || this.amanager.HasFrozen()) {
            return false;
        }
        if (!this.bmanager.HasEnoughMoney(num)) {
            return false;
        }
        return this.bmanager.Deduct(num);
    }
    Deposit(num: number): boolean{
        if (!this.amanager.IsValid() || !this.amanager.IsPasswordValid() || this.amanager.HasFrozen()) {
            return false;
        }
        return this.bmanager.Increase(num);
    }
}


class AccountManager implements BaseAccountManager {
    account: string;
    password: string;
    constructor(account, password: string){
        this.account = account;
        this.password = password;
    }
    IsValid(): boolean {
        return true;
    }
    IsPasswordValid(): boolean {
        return true;
    }
    HasFrozen(): boolean {
        return false;
    }
}

class BalanceManager implements BaseBalanceManager {
    balance: number;
    lock: boolean;
    constructor() {
        this.balance = 1000;
    }
    GetBalance(): number {
        return this.balance;
    }
    HasEnoughMoney(num: number): boolean {
        return this.balance > num;
    }
    Lock() {
        this.lock = true;
    }
    Unlock() {
        this.lock = false;
    }
    Deduct(num: number): boolean {
        if (this.lock) {
            return false;
        }
        this.Lock();
        this.balance = this.balance - num;
        this.Unlock();
    }
    Increase(num: number): boolean {
        if (this.lock) {
            return false;
        }
        this.Lock();
        this.balance = this.balance + num;
        this.Unlock();
    }
}

class WelcomeRobot implements BaseRobot {
    SendWelcomeMsg(): string {
        return "Welcome to CIBC.";
    }
}