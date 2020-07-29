//import * as clidiagram from "cli-diagram";
import * as ReadlineSync from "readline-sync";
let readKey = require('readline-sync');
import * as fs from "fs";


//////////////////////////////////////////////////////// Clases

class Type {
    private type : string;
    private description : string;

    public constructor (type : string, description : string) {
        this.type = type;
        this.description = description;
    }

    public getTypee(): string {
        return this.type;
    }
}

class Command {
    private command : string;
    private description : string;
    private type : Type;

    public constructor (command : string, description : string, type : Type) {
        this.command = command;
        this.description = description;
        this.type = type;
    }

    public getCommand(): string {
        return this.command;
    }
}

/////////////////// Box

const Diagram = require('cli-diagram');
 
const myHeadPy = new Diagram()
    .box("  Lenguaje Python  ");
    
 
console.log(myHeadPy.draw()); 

const myOptions = new Diagram()
    .box("      OPCIONES     \n[1] Ver Tipos\n[2] Ver Comandos\n[3] Salir");
    
 
console.log(myOptions.draw()); 
//let option : number = readKey.questionInt("Introduzca la opcion: ");

let fileTypes : string = fs.readFileSync("tipos.txt","utf-8");
let arrayFileTypes : string[] = fileTypes.split("\r\n");
let fileCommands : string = fs.readFileSync("comandos.txt","utf-8");
let arrayFileCommands : string[] = fileCommands.split("\r\n");
//console.log(arrayTypes);
//console.log(arrayCommands);


////// Crear los objetos de las Clases Comandos y tipos

let objTypes : Type = new Type(makeObjTypes(arrayFileTypes))
let objCommands : Type = new Type(makeObjTypes(arrayFileTypes))

function makeObjTypes(array : string[]) : Type[] {
    let arrayTypes : Type[] = [];
    for (let position : number = 0; position < array.length; position++){
        let arrayTemp : string[] = [];
        arrayTemp = array[position].split(",");
        let t : string = arrayTemp[0];     //Type
        let d : string = arrayTemp[1];     //Description
        
        let newType : Type = new Type(t,d);
        arrayTypes[position] = newType;
    }
    return arrayTypes;
}

