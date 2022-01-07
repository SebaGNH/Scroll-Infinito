'use strict'
let pagina = 1;
let peliculas = "";

let ultimaPelicula; /* variable indefinida <-- Para que limpie el observador y solo esté en el último */



//Creamos el observador
let observador = new IntersectionObserver((entradas, observador)=>{
    //console.log(entradas);
    entradas.forEach(entrada =>{
        if(entrada.isIntersecting){
            pagina ++;
            cargarProyecto();
        }
    });
},{
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.5 /*  <-- Para que cargue cuando la imagen esté a la mitad */
});




const cargarProyecto = async () =>{

    try {
        const apiKey = `https://api.themoviedb.org/3/movie/popular?api_key=094387692d60e64212bac949a60c19bc&languaje=es-AR&page=${pagina}`;
        const respuesta = await fetch(apiKey);
        //console.log(respuesta);

        const datos = await respuesta.json();
        //console.log(datos.results[0]);

        
        datos.results.forEach(pelicula => {
            //console.log(pelicula.title);
            const imgPortada = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
            
            peliculas += `
            <div class="pelicula">
                <img class="imgPortada" src="${imgPortada}" alt="">
                <h2 class="tituloOriginal">${pelicula.original_title}</h2>
            </div>
            `;
        });
        document.getElementById("contenedor").innerHTML = peliculas;

        const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
        //console.log(peliculasEnPantalla);


        if (pagina < 1000) { /*  <-- Como tenemos un límite de páginas evitamos que el sitio se rompa */
            if(ultimaPelicula){
                observador.unobserve(ultimaPelicula); /*  <-- Hacemos que deje de mirarla con unobserve para optimizar el código */
            }
            ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length -1];
            //console.log(ultimaPelicula);
            observador.observe(ultimaPelicula);
            
        }
        
    } catch (error) {
        console.log(error);
    }

}


cargarProyecto();
