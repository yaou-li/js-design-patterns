/**
 * template method pattern keeps structure of your base algorithm intact
 * the code that varies is split between different implementations
 * eliminates code duplication by pulling the steps with similar implementations
 * into the superclass housing the template method
 */

interface GameLoader {
    tempFiles: Array<string>;
    Load(): void;
    LoadLocalData(): Array<string>;
    CreateResources(data: Array<string>): void;
    CleanTempFiles(): void;
}

class BaseTemplateMethod implements GameLoader {
    tempFiles: Array<string>;
    Load(): void {
        this.tempFiles = this.LoadLocalData();
        this.CreateResources(this.tempFiles);
        this.CleanTempFiles();
    }
    LoadLocalData(): Array<string> { return []; }
    CreateResources(data: Array<string>): void{}
    CleanTempFiles(): void {
        this.tempFiles.length = 0;
    }
}

class DotaLoader extends BaseTemplateMethod {
    CreateResources(data: string[]): void {
        console.log("Create Heros");
        console.log("Create Maps");
    }
}

class CSLoader extends BaseTemplateMethod {
    CreateResources(data: string[]): void {
        console.log("Create Guns");
        console.log("Create Characters");
        console.log("Create Maps");
    }
}

function main() {
    const l1 = new DotaLoader();
    const l2 = new CSLoader();
    l1.Load();
    l2.Load();
}