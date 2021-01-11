class BaseStorage {
}

class FileStorage extends BaseStorage {
    constructor(args) {
        super(args)
    }
    set() {}
    get() {}
}

class LocalStorage extends BaseStorage {
    constructor(args) {
        super(args)
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