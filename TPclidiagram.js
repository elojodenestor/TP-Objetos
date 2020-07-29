"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var readKey = require('readline-sync');
var fs = __importStar(require("fs"));
//////////////////////////////////////////////////////// Clases
var Type = /** @class */ (function () {
    function Type(type, description) {
        this.type = type;
        this.description = description;
    }
    Type.prototype.getTypee = function () {
        return this.type;
    };
    return Type;
}());
var Command = /** @class */ (function () {
    function Command(command, description, type) {
        this.command = command;
        this.description = description;
        this.type = type;
    }
    Command.prototype.getCommand = function () {
        return this.command;
    };
    return Command;
}());
/////////////////// Box
var Diagram = require('cli-diagram');
var myHeadPy = new Diagram()
    .box("  Lenguaje Python  ");
console.log(myHeadPy.draw());
var myOptions = new Diagram()
    .box("      OPCIONES     \n[1] Ver Tipos\n[2] Ver Comandos\n[3] Salir");
console.log(myOptions.draw());
//let option : number = readKey.questionInt("Introduzca la opcion: ");
var fileTypes = fs.readFileSync("tipos.txt", "utf-8");
var arrayFileTypes = fileTypes.split("\r\n");
var fileCommands = fs.readFileSync("comandos.txt", "utf-8");
var arrayFileCommands = fileCommands.split("\r\n");
//console.log(arrayTypes);
//console.log(arrayCommands);
////// Crear los objetos de las Clases Comandos y tipos
var objTypes = new Type(makeObjTypes(arrayFileTypes));
var objCommands = new Type(makeObjTypes(arrayFileTypes));
function makeObjTypes(array) {
    var arrayTypes = [];
    for (var position = 0; position < array.length; position++) {
        var arrayTemp = [];
        arrayTemp = array[position].split(",");
        var t = arrayTemp[0]; //Type
        var d = arrayTemp[1]; //Description
        var newType = new Type(t, d);
        arrayTypes[position] = newType;
    }
    return arrayTypes;
}
