interface Storage {
    set(): void;
    get(): void;
}

interface BaseStorageConf {}
interface FileStorageConf extends BaseStorageConf {
    baseDir: string;
}
interface LocalStorageConf extends BaseStorageConf {
    baseUri: string;
}

class BaseStorage implements Storage {
    constructor(ops?: BaseStorageConf) {}
    set() {}
    get() {}
}

class FileStorage extends BaseStorage {
    private baseDir: string;
    constructor(ops?: FileStorageConf) {
        super(ops as BaseStorageConf)
        this.baseDir = ops.baseDir;
    }
    set() {}
    get() {}
}

class LocalStorage extends BaseStorage {
    private baseUri: string;
    constructor(ops?: LocalStorageConf) {
        super(ops)
        this.baseUri = ops.baseUri;
    }
    set() {}
    get() {}
}

function StorageFactory(type) {
    switch(type) {
        case 'file':
            return new FileStorage();
        case 'local':
            return new LocalStorage();
    }
}

export default {
    StorageFactory
}