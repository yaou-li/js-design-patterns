/**
 * Memento pattern can keep the state private
 * while delegates creating the state snapshots to the actual owner of that state
 * the original class can make the snapshots since it has full access to it's own class
 */

class Memento {
    text: string;
    constructor(text: string) {
        this.text = text;
    }

}

class TextArea {
    text: string;
    constructor(text?: string) {
        this.text = text || "";
    }

    set(text: string): void {
        this.text = text;
    }

    snapshot(): Memento {
        return new Memento(this.text);
    }

    restore(m: Memento | undefined) {
        if (m) {
            this.text = m.text;    
        }
    }
}

class Notebook {
    mementos: Array<Memento>;
    textArea: TextArea;
    constructor() {
        this.mementos = [];
        this.textArea = new TextArea();
    }

    Write(text: string) {
        this.textArea.set(text);
        this.mementos.push(this.textArea.snapshot());
    }

    Undo() {
        this.textArea.restore(this.mementos.pop());
    }
}

function main() {
    const n = new Notebook();
    n.Write("Hello");
    n.Write("Hello world!");
    n.Undo();
}