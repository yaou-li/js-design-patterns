/**
 * Button and Form interface defined the signature of components
 * WindowButton/MacButton、WindowForm/MacForm are concrete products classes
 * to create concrete components
 * UIFactory defined the signature of the concrete factory
 * WindowsUIFactory/MacUIFactory are the concrete factory classes
 * to create the factory object
 */
interface Button {
    font: string;
    render(): void;
    click(): void;
}

class WindowsButton implements Button {
    font: string;
    constructor(font: string) {
        this.font = font;
    }
    render(): void {}
    click(): void {}
}

class MacButton implements Button {
    font: string;
    constructor(font: string) {
        this.font = font;
    }
    render(): void {}
    click(): void {}
}


interface Form {
    render(): void;
    submit(): boolean;
}

class WindowsForm implements Form {
    render(): void {}
    submit(): boolean {
        // some api calls
        return true;
    }
}

class MacForm implements Form {
    render(): void {}
    submit(): boolean {
        // some api calls
        return true;
    }
}

interface UIFactory {
    OS: string;
    createButton(font: string): Button;
    createForm(): Form;
}

class WindowsUIFactory implements UIFactory {
    OS: string;
    constructor() {
        this.OS = "windows";
    }
    createButton(font: string): WindowsButton {
        return new WindowsButton(font);
    }
    createForm(): WindowsForm {
        return new WindowsForm();
    }
}

class MacUIFactory implements UIFactory {
    OS: string;
    constructor() {
        this.OS = "Mac";
    }
    createButton(font: string): MacButton {
        return new MacButton(font);
    }
    createForm(): MacForm {
        return new MacForm();
    }
}

function main(OS: string): { button: Button, form: Form } {
    let factory: UIFactory;
    switch(OS) {
        case "windows":
            factory = new WindowsUIFactory();
            break;
        case "mac":
            factory = new MacUIFactory();
            break;
    }    
    return { button: factory.createButton("fangsong"), form: factory.createForm() };
}
