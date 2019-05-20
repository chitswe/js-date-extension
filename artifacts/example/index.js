"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
lib_1.setPreference({ date: { long: "YYYY-MM-DD hh:mm" } });
var now = new Date();
console.log(now.format("YYMMDDhhmmssSSSSS0"));
//# sourceMappingURL=index.js.map