/**
 * Adapter pattern will transfer the utility of the adaptee to be able to satified the outer interface 
 */
interface IDE {
    WriteCode()
    DeleteCode()
    AutoFormat()
}

class WordEditorAdapter implements IDE {
    editor: WordEditor;
    constructor(editor: WordEditor) {
        this.editor = editor;
    }
    WriteCode() {
        this.editor.Write().AddIndent();
    }
    DeleteCode() {
        this.editor.Delete().DeleteIndent();
    }
    AutoFormat() {
        this.editor.Format();
    }
}

class WordEditor {
    Write(): WordEditor {
        return this;
    }
    Delete(): WordEditor {
        return this;
    }
    AddIndent(): WordEditor {
        return this;
    }
    DeleteIndent(): WordEditor {
        return this;
    }
    Format(): WordEditor {
        return this;
    }
}