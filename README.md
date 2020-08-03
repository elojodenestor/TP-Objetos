# TP-Objetos
---
PROYECTO: TPCLIDIAGRAM
    Este proyecto toma información de comandos (instrucciones) del lenguaje de programación Python, de dos archivos TXT
    y los organiza y grafica, de modo que sea un poco mas sencillo de ver la información correspondiente a cada comando 
    o tipo de comando y lo que hace. 
    
    Para dicha organización y graficación se emplearon clases y objetos y una librería NPM llamada Cli-Diagram, permitiendo
    así procesar la información contenida en los TXT de forma mas ordenada y sencilla. Y presentadas al usuario, a través de
    la librería antes mencionada, igualmente de forma ordenada y sencilla.

    
    LIBRERIA CLI-DIAGRAM:
    En la página de la librería Cli-Diagram en NPM dice: "Dibuje diagramas innecesariamente complejos en la consola", lo
    cual quizá no sea necesariamente del todo preciso. Es decir, después de haberla usado no coincido mucho en el uso de la
    expresión "innecesariamente complejos", pues los comandos que proporciona esta libreria me parecen, muy por el contrario,
    que facilitan muchísimo la realización de diagramas por consola.

    Los diagramas se construyen a partir de "Elementos", que son simplemente comandos que permitirán combinarse y unirse unos
    con otros en función de las necesidades o inquietudes del desarrollador. Algunos de estos "Elementos" son:

                * BOX
                        Dibuja un cuadro contorneado con algunos contenidos de cadena. El contenido puede 
                        ser multilínea. Los cuadros son lo suficientemente flexibles como para contener otros 
                        diagramas que le permiten crear estructuras anidadas complejas.

                    EJEMPLO:    .box('Soy un cuadro!')
                                .box(content, options)
                                ┌────────────────────┐
                                │                    │
                                │   Soy un cuadro!   │
                                │                    │
                                └────────────────────┘
                * LINE
                        Dibuja una o más líneas para vincular elementos. Las líneas se extienden para aprovechar
                        la altura disponible.
                    
                    EJEMPLO:    .line(2)
                                .line(count, options)
                                ────
                                ────
                * ARROW
                        Dibuja una o más flechas para vincular elementos. Las flechas se extienden para aprovechar 
                        la altura disponible.

                    EJEMPLO:    .arrow(['<--'])
                                .arrow(['-->'])
                                ◀───
                                ───▶
    
    La libreria se instala en el proyecto mediante "npm i cli-diagram", y se llama mediante la declaracion de una constante (digamos)
    Diagram así: "const Diagram = require("cli-diagram")".

    Posteriormente para implementarla se declara de la siguiente forma:
                    const nombreDeLaConstanteDiagram = new Diagram()
    
    Esta constante es sobre la que aplicaremos los "Elementos" (por ejemplo los que ejemplifiqué arriba), y que permitirán "configurar" cómo
    lucirá el diagrama y cuál será su contenido. 

    Por último, se dibuja el diagrama a través de la propiedad "draw", así:
                    console.log(nombreDeLaConstanteDiagram.draw()); 

    
    Toda la información de esta librería se encuentra en: https://www.npmjs.com/package/cli-diagram


PROYECTO REALIZADO POR NESTOR LUIS BERMÚDEZ, EN TANDIL - 2020.