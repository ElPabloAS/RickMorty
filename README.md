# Proyecto Final - Rick and Morty API

**Fecha:** 10 de marzo de 2025  
**Participantes:** Elena Diaz, Alejandro Navarro, Pablo Alvaro  
**Curso:** S2DAW

## Descripción

Este proyecto consiste en una aplicación web creada con **React Router** y **TypeScript**, que permite acceder y consumir la [API de Rick and Morty](https://rickandmortyapi.com/). A través de esta app, los usuarios pueden explorar los personajes, episodios y ubicaciones del universo de Rick y Morty.

El diseño de la aplicación ha sido realizado utilizando **Tailwind CSS** para asegurar una interfaz limpia, moderna y responsive.

## Funcionalidades

- **Visualización de personajes**: Los usuarios pueden ver una lista de personajes, filtrarlos y conocer sus detalles.
- **Filtrado de datos**: Los usuarios pueden filtrar los personajes por especie, estado o género, entre otras características.
- **Rutas con React Router**: Se han implementado rutas para navegar entre las diferentes secciones de la aplicación.
  - Al menos **dos rutas distintas** para búsquedas en la API.
  - **Ruta con parámetro dinámico**: Se ha implementado una ruta dinámica, como por ejemplo `/characters/:id`, para mostrar la información detallada de un personaje específico.
  - - **Juego de adivinar el personaje**:
  - **Imagen pixelada**: Se muestra una imagen pixelada del personaje, y los usuarios deben adivinar quién es.
  - **5 vidas**: Los jugadores tienen 5 intentos para adivinar correctamente el personaje y se va despixelando por cada intento para hacerlo más fácil.
  - **Sugerencias de nombres**: Mientras el usuario escribe, la aplicación va sugiriendo nombres de personajes, basándose en lo que se escribe, para ayudar en la adivinanza.
  - **Retardo en la solicitud a la API**: Se implementa un retardo de unos segundos para que la aplicación empiece a solicitar sugerencias de nombres a la API mientras el usuario escribe.

## Tecnologías utilizadas

- **React Router**: Para la gestión de rutas y navegación entre vistas.
- **TypeScript**: Lenguaje de programación para una experiencia de desarrollo más robusta y con tipado estático.
- **Tailwind CSS**: Framework CSS para un diseño rápido y flexible.
- **API de Rick and Morty**: Fuente de datos para obtener información sobre personajes, episodios y ubicaciones.

## Cumplimiento de requisitos

- **Uso complejo de rutas e integraciones de API**: La aplicación hace uso de rutas con parámetros dinámicos y está integrada con la API de Rick and Morty.
- **Al menos dos rutas distintas**: Hemos implementado rutas para diferentes tipos de búsquedas, como por ejemplo, una para visualizar los personajes y otra para explorar los episodios.
- **Filtrado de datos**: La app permite filtrar los personajes por diferentes criterios, como estado, especie y género.
- **Ruta con parámetro dinámico**: Se ha creado una ruta dinámica (`/characters/:id`) para mostrar los detalles específicos de un personaje.

## Estructura del Proyecto

La estructura del proyecto se organiza de la siguiente manera:

- **`/app`**: Contiene las principales carpetas y archivos del proyecto.
  - **`/Components`**: Aquí se encuentran los componentes reutilizables.
    - **`allCharacter`**: Contiene todos los componentes necesarios para crear las tarjetas de los personajes.
    - **`guessCharacter`**: Agrupa los componentes del juego de adivinanza de personajes.
  - **`/Home`**: Incluye los componentes relacionados con la página principal, como el contenedor del Home.
  - **`/Hooks`**: Carpeta donde se almacenan los hooks personalizados que se utilizan a lo largo del proyecto.
  - **`/Layouts`**: Aquí se encuentran los componentes de diseño, como el encabezado (Header) y el pie de página (Footer).
  - **`/Utils`**: Carpeta dedicada a las funciones utilitarias que se utilizan en todo el proyecto.
  - **`/Interfaces`**: Contiene todas las interfaces que utilizamos en el proyecto para la tipificación de datos.
  - **`/Routes`**: Aquí se definen las rutas del proyecto, así como las funciones para realizar peticiones a la API.



## Instrucciones de instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/rick-and-morty-api.git

