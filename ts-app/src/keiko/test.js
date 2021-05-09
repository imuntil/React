"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var common_module_1 = __importDefault(require("./common.module"));
var n;
n = 100;
// n = null
// n = undefined
function getNumber() {
    var r = Math.random();
    if (r > 0.6) {
        return r;
    }
    else if (r > 0.3) {
        return null;
    }
    return undefined;
}
// let xx: number
// if (xx === undefined) {
//   // xxx
// }
var weight = undefined;
if (weight === undefined) {
    // todo
}
console.log(common_module_1["default"]);
