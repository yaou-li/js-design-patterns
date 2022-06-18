/**
 * The command design pattern is used to represent and encapsulate the information needed to call a method at a later time
 */

interface Command {
    Execute(): void;
}

interface Device {
    On(): void;
    Off(): void;
    VolumeUp(): void;
    VolumeDown(): void;
}

interface DeviceButton {
    Press(): void;
}

class TV implements Device {
    volume: number;
    constructor() {
        this.volume = 0;
    }

    On(): void {
        console.log("TV turned on");
    }

    Off(): void {
        console.log("TV turned off");
    }

    VolumeUp(): void {
        this.volume++;
        console.log(`TV Volume up to: ${this.volume}`);
    }

    VolumeDown(): void {
        this.volume--;
        console.log(`TV Volume down to: ${this.volume}`);
    }
}

class Radio implements Device {
    volume: number;
    constructor() {
        this.volume = 0;
    }

    On(): void {
        console.log("Radio turned on");
    }

    Off(): void {
        console.log("Radio turned off");
    }

    VolumeUp(): void {
        this.volume++;
        console.log(`Radio Volume up to: ${this.volume}`);
    }

    VolumeDown(): void {
        this.volume--;
        console.log(`Radio Volume down to: ${this.volume}`);
    }
}

class BaseCommand implements Command {
    tv: Device;
    constructor(tv: Device) {
        this.tv = tv;
    }
    Execute(): void {}
}

class TurnOnCommand extends BaseCommand {
    Execute(): void {
        this.tv.On();    
    }
}

class TurnOffCommand extends BaseCommand {
    Execute(): void {
        this.tv.On();    
    }
}

class TurnVolumeUpCommand extends BaseCommand {
    Execute(): void {
        this.tv.VolumeUp();
    }
}

class TurnVolumeDownCommand extends BaseCommand {
    Execute(): void {
        this.tv.VolumeDown();
    }
}

class Button implements DeviceButton {
    command: Command;
    SetCommand(command: Command): DeviceButton {
        this.command = command;
        return this;
    }
    Press(): void {
        this.command.Execute();
    }
}

main () {
    const tv = new TV();
    const radio = new Radio();

    const turnTVOnCommand = new TurnOnCommand(tv);
    const turnTVOffCommand = new TurnOffCommand(tv);
    const turnRadioOnCommand = new TurnOnCommand(radio);
    const turnRaidioOffCommand = new TurnOffCommand(radio);

    const b1 = new Button().SetCommand(turnTVOffCommand);
    b1.Press();
    const b2 = new Button().SetCommand(turnTVOnCommand);
    b2.Press();
}