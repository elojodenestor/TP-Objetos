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
var Diagram = require("cli-diagram");
var readKey = require('readline-sync');
var fs = __importStar(require("fs"));
///////////////////////////////////////////////////////////////////// Clases
var Type = /** @class */ (function () {
    function Type(type, description) {
        this.type = type;
        this.description = description;
    }
    Type.prototype.getTypee = function () {
        return this.type;
    };
    Type.prototype.getDescription = function () {
        return this.description;
    };
    Type.EmptyType = function () {
        return new Type("", "");
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
    Command.prototype.getDescription = function () {
        return this.description;
    };
    Command.prototype.getTypeComm = function () {
        return this.type;
    };
    return Command;
}());
var fileTypes = fs.readFileSync("tipos.txt", "utf-8");
var arrayFileTypes = fileTypes.split("\r\n");
var fileCommands = fs.readFileSync("comandos.txt", "utf-8");
var arrayFileCommands = fileCommands.split("\r\n");
/////////////////////////////////////////////////////// Crear los objetos de las Clases Comandos y tipos
var objTypes = makeObjTypes(arrayFileTypes);
var objCommands = makeObjCommand(arrayFileCommands);
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
function makeObjCommand(array) {
    var arrayCommands = [];
    for (var position = 0; position < array.length; position++) {
        var arrayTemp = [];
        arrayTemp = array[position].split(",");
        var c = arrayTemp[0]; //Command
        var d = arrayTemp[1]; //Description
        var t = FindType(arrayTemp[2], objTypes); //Type
        var newCommand = new Command(c, d, t);
        arrayCommands[position] = newCommand;
    }
    return arrayCommands;
    function FindType(t, arrayT) {
        var thisType = Type.EmptyType();
        for (var i = 0; i < arrayT.length; i++) {
            var TypeTemp = arrayT[i];
            if (t == TypeTemp.getTypee()) {
                thisType = TypeTemp;
            }
        }
        return thisType;
    }
}
//////////////////////////////////////////////////////////////// Hacer los Diagramas
function makeTypeDiagram(arrayT) {
    for (var i = 0; i < arrayT.length; i++) {
        var typeCliDiagram = new Diagram()
            .box(arrayT[i].getTypee())
            .arrow(['-->'])
            .box(arrayT[i].getDescription());
        console.log(typeCliDiagram.draw());
    }
    var goBack = readKey.question("Presione [ENTER] para volver al menu");
    menu();
}
function makeCommandsDiagram(arrayC) {
    for (var i = 0; i < arrayC.length; i++) {
        var innerCommandCliDiagram = new Diagram()
            .box(arrayC[i].getCommand())
            .arrow(['-->'])
            .box(arrayC[i].getDescription());
        var outerCommandCliDiagram = new Diagram()
            .box(arrayC[i].getTypeComm().getTypee() + "\n" + innerCommandCliDiagram);
        console.log(outerCommandCliDiagram.draw());
    }
    var goBack = readKey.question("Presione [ENTER] para volver al menu");
    menu();
}
///////////////////////////////////////////////////////////////////////////// M E N U 
function menu() {
    var Diagram = require('cli-diagram');
    var myHeadPy = new Diagram()
        .box("  Lenguaje Python  ");
    console.log(myHeadPy.draw());
    var myOptions = new Diagram()
        .box("      OPCIONES     \n[1] Ver Tipos\n[2] Ver Comandos\n[3] Salir");
    console.log(myOptions.draw());
    var option = readKey.questionInt("Introduzca la opcion: ");
    validateOp(option);
}
function validateOp(option) {
    switch (option) {
        case 1:
            makeTypeDiagram(objTypes);
            return;
        case 2:
            makeCommandsDiagram(objCommands);
            return;
        case 3:
            console.log("¡Hasta luego!");
            return;
        default:
            console.log("Opcion incorrecta, elija una las opciones entre [ ]");
            return;
    }
}
menu();
