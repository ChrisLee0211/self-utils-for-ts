var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as fs from 'fs';
import * as path from 'path';
var Scaner = /** @class */ (function () {
    function Scaner(entry) {
        this.entry = '';
        this.fileNodes = [];
        this.entry = entry;
    }
    /**
     * 扫描一个路径下的所有文件夹并返回一个文件夹名称数组
     * @param path 扫描路径
     * @returns {Array}
     * @author chris lee
     * @Time 2022/04/09
     */
    Scaner.prototype.scanFolder = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            fs.readdir(path, { withFileTypes: true }, function (err, files) {
                                if (!err) {
                                    resolve(files);
                                }
                                else {
                                    reject(err);
                                }
                            });
                        }
                        catch (e) {
                            reject(e);
                            console.error(e);
                        }
                    })];
            });
        });
    };
    /**
     * 异步读取文件内容
     * @param path 文件路径
     * @param opts encoding：返回内容编码类型，默认为null，即为buffer
     * @param opts flag: 文件系统标志
     * @returns {Buffer}
     * @author chrislee
     * @Time 2022/04/09
     */
    Scaner.prototype.readFileContent = function (path, opt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            fs.readFile(path, opt, function (err, data) {
                                if (!err) {
                                    resolve(data);
                                }
                            });
                        }
                        catch (e) {
                            reject(e);
                            console.error(e);
                        }
                    })];
            });
        });
    };
    /**
     * 判断一个文件是否已经在当前目录下存在
     * @param path 文件路径
     * @author chris lee
     * @Time 2022/04/09
     */
    Scaner.prototype.checkFileIsBuilt = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            fs.access(path, fs.constants.F_OK, function (err) {
                                if (!err) {
                                    resolve(true);
                                }
                                else {
                                    resolve(false);
                                }
                            });
                        }
                        catch (e) {
                            console.error(e);
                            reject(e);
                        }
                    })];
            });
        });
    };
    /**
    * 根据路径返回模块名称
    * @param path 路径
    * @returns {string}
    * @author chris lee
    * @Time 2022/04/09
    */
    Scaner.prototype.getModuleName = function (filePath) {
        var reg = /^(index)(\.).*$/;
        var baseName = path.basename(filePath);
        var splitPath = filePath.split(path.sep);
        if (baseName.match(reg) && splitPath.length > 1) {
            return "" + splitPath[splitPath.length - 2] + path.sep + baseName;
        }
        else {
            return splitPath[splitPath.length - 1];
        }
    };
    Scaner.prototype.flushEffectCb = function (cb) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var i, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof cb === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, cb.apply(void 0, args)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        i = 0, len = cb.length;
                        _a.label = 3;
                    case 3:
                        if (!i++) return [3 /*break*/, 6];
                        return [4 /*yield*/, cb[i].apply(cb, args)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Scaner.prototype.scan = function (effect) {
        return __awaiter(this, void 0, void 0, function () {
            var stack, e_1, files, i, isFolder, name_1, filePath, curNode, currentFileNode, files_1, i, isFolder, filePath, name_2, curNode, content, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stack = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.flushEffectCb(effect, this.entry, 'beforeScan')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 16, 17, 19]);
                        return [4 /*yield*/, this.scanFolder(this.entry)];
                    case 6:
                        files = _a.sent();
                        if (files) {
                            for (i = 0; i < files.length; i++) {
                                isFolder = files[i].isDirectory();
                                name_1 = files[i].name;
                                filePath = path.resolve(this.entry, files[i].name);
                                curNode = {
                                    name: name_1, isFolder: isFolder,
                                    path: filePath,
                                };
                                stack.push(curNode);
                                this.fileNodes.push(curNode);
                            }
                        }
                        _a.label = 7;
                    case 7:
                        if (!stack.length) return [3 /*break*/, 15];
                        currentFileNode = stack.pop();
                        if (!currentFileNode.isFolder) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.scanFolder(currentFileNode.path)];
                    case 8:
                        files_1 = _a.sent();
                        if (files_1.length) {
                            for (i = 0; i < files_1.length; i++) {
                                isFolder = files_1[i].isDirectory();
                                filePath = path.resolve(currentFileNode.path, files_1[i].name);
                                name_2 = this.getModuleName(filePath);
                                curNode = {
                                    name: name_2,
                                    isFolder: isFolder,
                                    path: filePath,
                                };
                                stack.push(curNode);
                            }
                        }
                        return [3 /*break*/, 14];
                    case 9:
                        _a.trys.push([9, 12, , 13]);
                        return [4 /*yield*/, this.readFileContent(currentFileNode.path, { encoding: 'utf-8' })];
                    case 10:
                        content = _a.sent();
                        return [4 /*yield*/, this.flushEffectCb(effect, { fileName: currentFileNode.path, content: content }, 'scaning')];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 13];
                    case 13:
                        this.fileNodes.push(currentFileNode);
                        _a.label = 14;
                    case 14: return [3 /*break*/, 7];
                    case 15: return [3 /*break*/, 19];
                    case 16:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, this.flushEffectCb(effect, this.fileNodes.slice(), 'afterScan')];
                    case 18:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    return Scaner;
}());
export default Scaner;
//# sourceMappingURL=fileScaner.js.map