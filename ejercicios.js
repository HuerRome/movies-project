/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*Programa una clase llamada Pelicula.
    La clase recibira un objeto al momento de instanciarse con los siguientes datos: id de la pelicula en IMDB, titulo, 
    director, año de extreno, pais o paises de origen generos y calificacionen IMBD.
      -Todo los datos delmobjeto son obligatorios.
      -Valida que el director no rebase los 50 caracteres.
      -Valida que el año de extreno sea un numero entero de 4 digitos.
      -Valida que el pais o paises sea introducidos en forma de arreglo.
      -Valida que los generos introducidos esten dentro de los generos aceptados.
      -Crea un metodo estático que devuelve los generos aceptados.
      -Valida que la calificacion sea un numero entre 0 y 10 pudiendo ser decimal de una posicion.
      -Crea un metodo que devuelve toda la ficha tecnica de la pelicula.
      -Apartir de un arreglo con la informacion de 3 peliculas genera 3 instancias de la clase de
      forma automatizada e imprime la ficha tecnica de cada pelicula.
    *Generos Aceptados: Action, Adult, Adventure, Animation, Biography, Comedy, Crime, Documentary,
    Drama, Family, Fantasy, Film Noir, Game-show, History, Horror, Musical, Music, Mystery News, 
    Reality-TV, Romance, Sci-Fi, Short, Sport, Talk-Show, Thriller, War, Western
*/

class Pelicula {
    constructor({id, titulo, director, estreno, pais, generos, calificacion}){
        this.id = id;
        this.titulo = titulo;
        this.director = director;
        this.estreno = estreno;
        this.pais = pais;
        this.generos = generos;
        this.calificacion = calificacion;

        this.validarMDB(id);
        this.validarTitulo(titulo);
        this.validarDirector(director);
        this.validarEstreno(estreno);
        this.validarPais(pais);
        this.validarGeneros(generos);
        this.validarCalificacion(calificacion);
    }
    
    static get listaGeneros(){
        return ["Action", "Adult", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Film Noir", "Game-show", "History", "Horror", "Musical", "Music", "Mystery News", 
        "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", "War", "Western"];
    }

    //Como es un metodo estatico no hace faltra instanciar la clase. directamnete llamamos el nombre de la clase y el nimbredel atributo
    static generosAceptados(){
        return console.info(`Los generos aceptados son: ${Pelicula.listaGeneros.join(", ")}`);
    }
   
    validarCadena(propiedad,valor){
        //Si estos dos if no se activan significa que la validacion es correcta y retorna el true.
        //el metodo validar cadena sirve para validar idMDB, el titulo y director
        if(!valor) return console.warn(`${propiedad} "${valor}"esta vacio`);

        if(typeof valor !== "string")return console.error(`${propiedad} "${valor}" ingresado. NO es una cadena de texto`);
        return true;
    }

    validarLongitudCadena(propiedad,valor,longitud) {
        if(valor.length > longitud) return console.error(`${propiedad} "${valor}" excede el numero de 
        caracteres permitidos (${longitud}).`);

        return true;
    }

    validarNumero(propiedad,valor){
        if(!valor) return console.warn(`${propiedad} "${valor}" esta vacio`);

        if(typeof valor !== "number") return console.error(`${propiedad} "${valor}" ingresado, NO es un numero`);
        return true;
    }

    //validar arreglo  va a contener las 4 validaciones
    validarArreglo(propiedad,valor){
        if(!valor) return console.warn(`${propiedad} "${valor}" esta vacio`);
    
        if(!(valor instanceof Array)) return console.error(`${propiedad} "${valor}" ingresado no es un arreglo`);

        if(valor.length === 0) return console.error(`${propiedad} "${valor}" no tiene datos`);

        for (let cadena of valor){
            if(typeof cadena !== 'string') return console.error(`El valor "${cadena}" ingresado, No es un cadena de texto`);
        }
        return true;
    }

    validarMDB(id){
        if (this.validarCadena("IMDB id",id))
            if (!(/^([a-z]){2}([0-9]){7}$/.test(id)))
                return console.error(`IMDBid "${id}" no es valido, debe tener 9 caracteres, los 2 primeros 
                letras minusculas, los 7 restantes numeros.`);
    }

    validarTitulo(titulo){
        if (this.validarCadena("Titulo",titulo))                   //validar que es un acadena  de texto
            this.validarLongitudCadena("Titulo",titulo,100);       //validar hasta 100 caracteres dentro de la propiedad titulo
    }

    validarDirector(director){
        if (this.validarCadena("Director",director))                   //validar que es un acadena  de texto
            this.validarLongitudCadena("Director",director,50);       //validar hasta 50 caracteres dentro de la propiedad director
    }

    validarEstreno(estreno){
        if(this.validarNumero("Año de Estreno", estreno))
            if(!(/^([0-9]){4}$/.test(estreno)))
                return console.error(`Año de Estreno "${estreno}" no es valido, debe ser un numero de 4 digitos`);  
    }

    validarPais(pais){
        this.validarArreglo("Pais",pais);
    }

    //lista genersoe es un metodo estatico con get por ende podemos tratarla como una varibale
    //el this no hace falta en los metodos estaticos no hace flatan instancia para invocarlos
    validarGeneros(generos){
        if(this.validarArreglo("Generos",generos)){
            for(let genero of generos){
                //console.log(genero,Pelicula.listaGeneros.includes(genero));
                if(!Pelicula.listaGeneros.includes(genero)){
                    console.error(`Genero(s) incorrectos "${generos.join(",")}"`);
                    Pelicula.generosAceptados();
                }
            }
        }  
    }
    validarCalificacion(calificacion){
        if(this.validarNumero("Calificacion", calificacion))
            return (calificacion < 0 || calificacion > 10) 
            ? console.error(`La calificacion tiene que estar en un rango del 0 y 10`)
            : this.calificacion = calificacion.toFixed(1); //toFixed permite indicar a cuantos numeros voy a cortar la extencion del numero
             
    }

    //Metods que ya utilizamos en el objeto hay que llamarlos despues de hacer la instacia
    fichaTecnica(){
        console.info(`Fecha Tecnica:\nTitulo:"${this.titulo}"\nDirectorio:"${this.director}"\nAño:"${this.estreno}"\nPais:"${this.pais.join("-")}"\nGeneros:"${this.generos.join(",")}"\nCalificacion:"${this.calificacion}"\nLMDB id:"${this.id}""`);
    }
}

//para acceder a la lista de generos
//Pelicula.generosAceptados();
/*
const peli = new Pelicula({
    id: "tt1234567",
    titulo: "Titulo de la peli",
    director: "Director de la peli",
    estreno: 2020,
    pais: ['Mexico','Alemania'],
    generos: ['Comedy'],
    calificacion: 2.39
});

peli.fichaTecnica();*/

const misPelis =[
    {
    id: "tt1234567",
    titulo: "Titulo de la peli",
    director: "Director de la peli",
    estreno: 2020,
    pais: ['Mexico','Alemania'],
    generos: ['Comedy'],
    calificacion: 2.39
    },
    {
    id: "tt2468100",
    titulo: "Spider man",
    director: "Director de la peli",
    estreno: 2018,
    pais: ['Mexico','Alemania'],
    generos: ['Comedy'],
    calificacion: 2.39
    },
    {
    id: "tt7654321",
    titulo: "Pelicula",
    director: "Director de la peli",
    estreno: 2021,
    pais: ['Mexico','Alemania'],
    generos: ['Comedy'],
    calificacion: 2.39
    },
]

misPelis.forEach(el => new Pelicula(el).fichaTecnica());   //Para inprimir toda la informacion de las tre peliculas instancias
