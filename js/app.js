'use strict'

const cargarProyecto = async () =>{

    try {
        const apiKey = "https://api.themoviedb.org/3/movie/popular?api_key=094387692d60e64212bac949a60c19bc";
        const respuesta = await fetch(apiKey);
        //console.log(respuesta);

        const datos = await respuesta.json();
        console.log(datos.results[0]);

        let peliculas = "";
        datos.results.forEach(pelicula => {
            //console.log(pelicula.title);
            const imgPortada = `https://image.tmdb.org/t/p/w500/${pelicula.backdrop_path}`;
            
            peliculas += `
            <div class="pelicula">
                <img class="portada" src="${imgPortada}" alt="">
                <h2 class="titulo">${pelicula.original_title}</h2>
            </div>
            `;
        });
        document.getElementById("contenedor").innerHTML = peliculas;
        
    } catch (error) {
        console.log(error);
    }

}


cargarProyecto();
