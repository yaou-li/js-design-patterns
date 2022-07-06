/**
 * Allows an object alter its behavior when its internal state changes 
 */

interface PhoneState {
    phone: Phone;
    onHome(): void;
    onOffOn(): void;
}

class PhoneButton {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    addEventListener(cb: Function) {
        cb();
    }
}


class Phone {
    state: PhoneState;
    constructor() {
        this.SetState(new StateOff(this));
    }
    SetState(state: PhoneState) {
        this.state = state;
    }

    Lock() {
        console.log("your phone is locked");
    }

    Unlock() {
        console.log("your phone is unlocked");
    }

    Home() {
        console.log("Going to home screen");
    }

    TurnOn() {
        console.log("your phone is turning on");
    }

    TurnOff() {
        console.log("your phone is turnning off")
    }
}


class BasePhoneState implements PhoneState {
    phone: Phone;
    constructor(phone: Phone) {
        this.phone = phone;
    }

    onHome(): void {}
    onOffOn(): void {}
}

class StateReady extends BasePhoneState {
    onHome(): void {
        this.phone.Home();
    }
    onOffOn(): void {
        this.phone.SetState(new StateOff(this.phone));
        this.phone.TurnOff();
    }
}

class StateOff extends BasePhoneState {
    onHome() {
        this.phone.SetState(new StateLock(this.phone));
        this.phone.TurnOn();
    }

    onOffOn(): void {
        this.phone.SetState(new StateLock(this.phone));
        this.phone.TurnOn();
    }
}

class StateLock extends BasePhoneState {
    onHome() {
        this.phone.SetState(new StateReady(this.phone));
        this.phone.Unlock();
    }
    onOffOn(): void {
        this.phone.SetState(new StateOff(this.phone));
        this.phone.TurnOff();
    }
}

function main() {
    const phone = new Phone();
    const homeBtn = new PhoneButton("home");
    homeBtn.addEventListener((e) => phone.state.onHome());
    const onOffBtn = new PhoneButton("On/Off");
    onOffBtn.addEventListener((e) => phone.state.onOffOn());
}