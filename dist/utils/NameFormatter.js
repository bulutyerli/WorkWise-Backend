"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function NameFormatter(name) {
    const formattedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return formattedName;
}
exports.default = NameFormatter;
