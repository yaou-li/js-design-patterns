"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseStorage = /** @class */ (function () {
    function BaseStorage(ops) {
    }
    BaseStorage.prototype.set = function () { };
    BaseStorage.prototype.get = function () { };
    return BaseStorage;
}());
var FileStorage = /** @class */ (function (_super) {
    __extends(FileStorage, _super);
    function FileStorage(ops) {
        var _this = _super.call(this, ops) || this;
        _this.baseDir = ops.baseDir;
        return _this;
    }
    FileStorage.prototype.set = function () { };
    FileStorage.prototype.get = function () { };
    return FileStorage;
}(BaseStorage));
var LocalStorage = /** @class */ (function (_super) {
    __extends(LocalStorage, _super);
    function LocalStorage(ops) {
        var _this = _super.call(this, ops) || this;
        _this.baseUri = ops.baseUri;
        return _this;
    }
    LocalStorage.prototype.set = function () { };
    LocalStorage.prototype.get = function () { };
    return LocalStorage;
}(BaseStorage));
function StorageFactory(type) {
    switch (type) {
        case 'file':
            return new FileStorage();
        case 'local':
            return new LocalStorage();
    }
}
exports["default"] = {
    StorageFactory: StorageFactory
};
