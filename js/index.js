// Datos para conectar con la API
const apiKey = "85b3db480d272d3d657c91aa5f728589";

// Seleccionar elementos para mostrar resultados
const resultadoElement = document.getElementById("resultado");

// Películas más populares
// Petición asíncrona usando async/await
const urlPopular = "https://api.themoviedb.org/3/movie/popular";
const popularesLink = document.querySelector(".popular");

popularesLink.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const response = await fetch(`${urlPopular}?api_key=${apiKey}&language=es`);
    const data = await response.json();
    const peliculas = data.results;
    const totalPaginas = data.total_pages;

    // Ordenar las películas por popularidad (orden descendente)
    ordenarPorPopularidad(peliculas);
    mostrarPeliculas(peliculas);

    // Mostrar el número de página
    const paginaActual = data.page;
    mostrarNotificacion(`Mostrando página ${paginaActual} de ${totalPaginas} páginas`);
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  }
});


// Películas en cartelera hoy
// Petición asíncrona usando XMLHttpRequest
const urlHoy = "https://api.themoviedb.org/3/movie/now_playing";
const hoyLink = document.querySelector(".hoy");
hoyLink.addEventListener("click", obtenerPeliculasEnCartelera);

function obtenerPeliculasEnCartelera() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const peliculas = response.results;
        const totalPaginas = response.total_pages;

        // Ordenar las películas por popularidad (orden descendente)
        ordenarPorPopularidad(peliculas);

        mostrarPeliculas(peliculas);

        // Mostrar el número de página en un toast
        const paginaActual = response.page;
        mostrarNotificacion(
          `Mostrando página ${paginaActual} de ${totalPaginas} páginas`
        );
      } else {
        console.error("Error al obtener las películas:", xhr.status);
      }
    }
  };

  xhr.open("GET", `${urlHoy}?api_key=${apiKey}&language=es`);
  xhr.send();
}


// Películas que se visionarán próximamente
// Petición asíncrona usando JQuery
const urlProximamente = "https://api.themoviedb.org/3/movie/upcoming";
const proximoLink = $(".proximo");
proximoLink.on("click", obtenerPeliculasProximas);

function obtenerPeliculasProximas() {
  $.ajax({
    url: `${urlProximamente}?api_key=${apiKey}&language=es`,
    method: "GET",
    success: function (response) {
      const peliculas = response.results;
      const totalPaginas = response.total_pages;

      // Ordenar las películas por fecha de lanzamiento (orden descendente)
      peliculas.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );

      mostrarPeliculas(peliculas);

      // Mostrar el número de página en un toast
      const paginaActual = response.page;
      mostrarNotificacion(
        `Mostrando página ${paginaActual} de ${totalPaginas} páginas`
      );
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener las películas:", error);
    },
  });
}


// Películas mejor valoradas
// Petición asíncrona usando Axios
const urlValoradas = "https://api.themoviedb.org/3/movie/top_rated";
const valoradaLink = document.querySelector(".valorada");
valoradaLink.addEventListener("click", obtenerPeliculasMejorValoradas);

async function obtenerPeliculasMejorValoradas(event) {
  event.preventDefault();

  try {
    const response = await axios.get(`${urlValoradas}?api_key=${apiKey}`);
    const peliculas = response.data.results;
    const totalPaginas = response.data.total_pages;

    // Ordenar las películas por popularidad (orden descendente)
    ordenarPorPopularidad(peliculas);

    mostrarPeliculas(peliculas);

    // Mostrar el número de página en un toast
    const paginaActual = response.data.page;
    mostrarNotificacion(
      `Mostrando página ${paginaActual} de ${totalPaginas} páginas`
    );
  } catch (error) {
    console.error('Error al obtener las películas:', error);
  }
}

// Ordenar las películas por popularidad (orden descendente)
function ordenarPorPopularidad(peliculas) {
  peliculas.sort((a, b) => b.popularity - a.popularity);
}



// Mensaje con sweetAlert2. 
function mostrarNotificacion(texto) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: "info",
    title: `${texto}`,
  });
}


// Mostrar películas
function mostrarPeliculas(peliculas, contenedor = resultadoElement) {
  $(contenedor).empty(); // Limpiar el contenido anterior

  // Recorrer cada película en la lista proporcionada
  $.each(peliculas, (index, pelicula) => {
    const peliculaCard = $("<div>")
      .addClass("card mb-3")
      .css("max-width", "250px");
    const cardBody = $("<div>").addClass("card-body");

    // Carátula de la película
    const posterImg = $("<img>")
      .addClass("img-fluid")
      .attr("src", `https://image.tmdb.org/t/p/w200/${pelicula.poster_path}`)
      .attr("alt", pelicula.title);

    cardBody.append(posterImg);

    // Título de la película
    const tituloEnlace = $("<br><a>")
      .addClass("card-title fs-5 fw-bold")
      .attr("href", "#")
      .text(pelicula.title);

    // Agregar evento al enlace del título
    tituloEnlace.on("click", function () {
      obtenerDetallesPelicula(pelicula.id);
    });

    cardBody.append(tituloEnlace);

    // Valoración de la película
    const valoracion = $("<p>")
      .addClass("card-text fw-bold text-center")
      .text(`${pelicula.vote_average.toFixed(1)}`)
      .addClass("text-white bg-primary p-1 rounded")
      .css("max-width", "100px");

    cardBody.append(valoracion);

    // Fecha de la película
    const fecha = $("<p>").addClass("card-text fw-bold");
    const fechaEstreno = new Date(pelicula.release_date);
    fecha.text(
      `${fechaEstreno.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}`
    );

    cardBody.append(fecha);

    peliculaCard.append(cardBody);
    $(contenedor).append(peliculaCard);
  });
}


// Formato para mostrar duración de la película
const formatoDuracion = minutes => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}


// Obtener detalles de la película por ID
function obtenerDetallesPelicula(id) {
  // Realizar la solicitud GET al servidor para obtener los detalles de la película
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es`
  )
    .then((response) => response.json())
    .then((data) => {
      // Actualizar la ventana modal con los detalles de la película
      const modalTitle = document.querySelector("#staticBackdropLabel");
      const modalBody = document.querySelector(".modal-body");
      const modalFooter = document.querySelector(".modal-footer");

      // Obtener el año de lanzamiento de la película
      const year = data.release_date.split("-")[0];

      modalTitle.textContent = `${data.title} (${year})`;

      modalBody.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200/${data.poster_path}" alt="${
        data.title
      }" class="img-fluid">
        <p><strong>Duración: ${formatoDuracion(data.runtime)} </strong></p>
        <p>${data.genres.map((genre) => genre.name).join(", ")}</p>
        <p><h4>Sinopsis</h4>${data.overview}</p>
      `;

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorite = favorites.some((favorite) => favorite.id === data.id);

      modalFooter.innerHTML = `
        <button type="button" class="btn btn-danger" id="guardarBtn">${
          isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"
        }</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      `;

      // Mostrar la ventana modal
      const modal = new bootstrap.Modal(document.getElementById("modal"), {
        keyboard: false,
      });
      modal.show();

      // Manejar el evento clic del botón Guardar
      const guardarBtn = document.getElementById("guardarBtn");
      guardarBtn.addEventListener("click", () => {
        if (isFavorite) {
          // Eliminar la película de favoritos
          const updatedFavorites = favorites.filter(
            (favorite) => favorite.id !== data.id
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          mostrarNotificacion("Película eliminada de Mis Favoritas");
        } else {
          // Guardar la película en favoritos
          const newFavorite = { id: data.id};
          const updatedFavorites = [...favorites, newFavorite];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          mostrarNotificacion("Película añadida a Mis Favoritas");
        }

        modal.hide();
      });
    })
    .catch((error) => {
      console.error("Error al obtener los detalles de la película:", error);
    });
}


// Menú Mis favoritas
const mostrFavoritosLink = document.querySelector(".mostrFavoritos");
mostrFavoritosLink.addEventListener("click", mostrarPeliculasFavoritas);

// Mostrar películas almacenadas en localStorage
function mostrarPeliculasFavoritas() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const resultadoElement = document.getElementById("resultado");

  if (favorites.length === 0) {
    mostrarNotificacion("No has guardado ninguna película");
  } else {
    resultadoElement.innerHTML = ""; // Limpiar el contenido anterior
    mostrarNotificacion("Mostrando películas favoritas")
    const requests = favorites.map((favorite) => {
      return fetch(
        `https://api.themoviedb.org/3/movie/${favorite.id}?api_key=${apiKey}&language=es`
      ).then((response) => response.json());
    });

    Promise.all(requests)
      .then((peliculas) => {
        mostrarPeliculas(peliculas, resultadoElement);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}