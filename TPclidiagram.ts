const Diagram = require("cli-diagram");
import * as ReadlineSync from "readline-sync";
let readKey = require('readline-sync');
import * as fs from "fs";


///////////////////////////////////////////////////////////////////// Clases

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
    
    public getDescription(): string {
        return this.description;
    }

    static EmptyType() : Type {
        return new Type ("","");
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

    public getDescription(): string {
        return this.description;
    }

    public getTypeComm(): Type {
        return this.type;
    }
    
}

let fileTypes : string = fs.readFileSync("tipos.txt","utf-8");
let arrayFileTypes : string[] = fileTypes.split("\r\n");
let fileCommands : string = fs.readFileSync("comandos.txt","utf-8");
let arrayFileCommands : string[] = fileCommands.split("\r\n");

/////////////////////////////////////////////////////// Crear los objetos de las Clases Comandos y tipos

let objTypes : Type[] = makeObjTypes(arrayFileTypes);
let objCommands : Command[] = makeObjCommand(arrayFileCommands);

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

function makeObjCommand(array : string[]) : Command[] {
    let arrayCommands : Command[] = [];
    for (let position : number = 0; position < array.length; position++){
        let arrayTemp : string[] = [];
        arrayTemp = array[position].split(",");
        let c : string = arrayTemp[0];     //Command
        let d : string = arrayTemp[1];     //Description
        let t : Type = FindType(arrayTemp[2], objTypes);       //Type
        let newCommand : Command = new Command(c,d,t);
        arrayCommands[position] = newCommand;
    }
    return arrayCommands;

    function FindType(t : string, arrayT : Type[]) : Type {
        let thisType : Type = Type.EmptyType();
        for (let i : number = 0; i < arrayT.length; i++){
            let TypeTemp : Type = arrayT[i];
            if (t == TypeTemp.getTypee()) {
                thisType = TypeTemp;   
            } 
        }
        return thisType;
    }
}

//////////////////////////////////////////////////////////////// Hacer los Diagramas

function makeTypeDiagram(arrayT : Type[]) {  
    for (let i : number = 0; i < arrayT.length; i++){
        const typeCliDiagram = new Diagram()
            .box(arrayT[i].getTypee())
            .arrow(['-->'])
            .box(arrayT[i].getDescription());
    
 
        console.log(typeCliDiagram.draw()); 
    }
    
    let goBack : string = readKey.question("Presione [ENTER] para volver al menu");
    menu();
}

function makeCommandsDiagram(arrayC : Command[]) {  
    for (let i : number = 0; i < arrayC.length; i++){
        const innerCommandCliDiagram = new Diagram()
            .box(arrayC[i].getCommand())
            .arrow(['-->'])
            .box(arrayC[i].getDescription());
    
        const outerCommandCliDiagram = new Diagram()
            .box(`${arrayC[i].getTypeComm().getTypee()}\n${innerCommandCliDiagram}`)
        
        console.log(outerCommandCliDiagram.draw()); 
    }
    
    let goBack : string = readKey.question("Presione [ENTER] para volver al menu");
    menu();
}

///////////////////////////////////////////////////////////////////////////// M E N U 

function menu() {
    const Diagram = require('cli-diagram');
    
    const myHeadPy = new Diagram()
        .box("  Lenguaje Python  ");
        
    console.log(myHeadPy.draw()); 

    const myOptions = new Diagram()
        .box("      OPCIONES     \n[1] Ver Tipos\n[2] Ver Comandos\n[3] Salir");
           
    console.log(myOptions.draw()); 
    let option : number = readKey.questionInt("Introduzca la opcion: ");
    validateOp(option);
}

function validateOp(option : number) {
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