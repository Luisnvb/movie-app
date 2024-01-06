# MovieDB Web App
A web app for exploring movies from The Movie Database built with JavaScript

Este repositorio contiene el código fuente para una página web que hace uso de la API de The Movie Database (TMDb). La aplicación está construida con HTML, CSS, JavaScript, Bootstrap, SweetAlert, FontAwesome, y utiliza diferentes métodos para realizar peticiones asíncronas, incluyendo async/await, XMLHttpRequest, jQuery y Axios. Además, permite almacenar títulos localmente mediante localStorage.

![alt text](https://github.com/Luisnvb/movie-app/preview1.jpg)

![alt text](https://github.com/Luisnvb/movie-app/preview2.jpg)

## Configuración inicial
Antes de ejecutar la aplicación, asegúrate de tener una clave de API válida de TMDb. Puedes obtener una clave registrándote en TMDb Developer. Después de obtener tu clave, reemplaza <TU_CLAVE_API> en el archivo script.js con tu clave.

```javascript
const apiKey = '<TU_CLAVE_API>';
```

## Estructura del proyecto
El proyecto sigue una estructura clara:

* index.html: La página principal de la aplicación.
* styles/: Carpeta que contiene los archivos de estilo CSS.
* scripts/: Carpeta que contiene los archivos JavaScript.
* assets/: Carpeta para almacenar cualquier recurso adicional, como imágenes.

## Tecnologías utilizadas
* HTML y CSS: Estructura y estilo de la página web.
* JavaScript: Lenguaje de programación principal.
* Bootstrap: Framework CSS para un diseño rápido y receptivo.
* SweetAlert: Biblioteca para mostrar alertas personalizadas.
* FontAwesome: Conjunto de iconos vectoriales.
* async/await, XMLHttpRequest, jQuery, Axios: Métodos para realizar peticiones asíncronas a la API de TMDb.
* localStorage: Almacenamiento local para guardar títulos.

## Ejecución
Abre el archivo index.html en tu navegador web para cargar la aplicación.

## Funcionalidades
1. Buscar Películas y Series: Utiliza la barra de búsqueda para encontrar títulos en la base de datos de TMDb.
2. Detalles de la Película o Serie: Haz clic en un resultado para ver información detallada.
3. Almacenamiento Local: Guarda tus títulos favoritos mediante localStorage.
4. Interfaz Atractiva: Diseño moderno y atractivo gracias a Bootstrap y FontAwesome.
5. Alertas Personalizadas: SweetAlert para alertas más atractivas y amigables.
   
## Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejoras o encuentras algún problema, crea un issue o realiza un pull request.

## Agradecimientos
Agradecemos a The Movie Database por proporcionar una API robusta y accesible.

---
¡Disfruta explorando el mundo del cine con MovieDB Web App!
