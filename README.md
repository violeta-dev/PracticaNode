<h1 align="center">Welcome to mipractica 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/violeta-dev/PracticaNode#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/violeta-dev/PracticaNode/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/violeta-dev/PracticaNode/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/violeta-dev/mipractica" />
  </a>
</p>

> Mi Practica Node

### 🏠 [Homepage](https://github.com/violeta-dev/PracticaNode#readme)

## Install

```sh
npm install
```
## Configure environment variables

Copy .env.example to .env and review the settings.

```sh
cp .env.example .env
```

## Load initial data

You can load the database with initial data with:

```sh
npm run init-db
```
NOTA: Se inicializa la base da datos llamada "anuncios" con el archivo anuncios.json. Este archivo se actualiza también cuando se añade un anuncio en la vista /new-items. Para acceder a new items, en el browser ponemos localhost:5000 y en el tab "Añadir anuncio" metemos los anuncios nuevos. Para adjuntar las fotos ponemos el URL de la foto directamente, por ejemplo: img/bici.jpeg. También se actualiza la base de datos desde aquí.
En la vista localhost:5000 se ve la foto, tags, nombre, precio, sale (false o true)


**Warning! this script delete database contents before the load.**

Use in production only in the first deployment.


## Usage

```sh
npm start
```
## Development start

```sh
npm run dev

```
## Autenticación

Hecemos un POST con POSTMAN a http://localhost:3000/api/loginJWT con Body elegimos x-www-form-urlencoded que es lo que tenemos para parsear el body en index.js y ponemos email  user@example.com y password 1234. Nos devuleve un token y ese lo usamos como Authorization header en nuestros API requests en http://localhost:3000/api/anuncios
Si no existe token, está mal o está expirado nos dará un error distinto.

También he hecho un login en http://localhost:3000/login y la web se autentica con user@example.com y password 1234

## Internacionalización
En la web en http://localhost:3000/ hay un menú para cambiar de español a inglé y viceversa

## Trabajo en segundo plano
NOTA: Tiene que estar " npm run dev" lanzado, el publisher está en anuncios.js
En /src/routes/api lanzar el worker con 
```sh
node consumer.js

```
Cuando se haga un post de un archivo tipo file en POSTMAN a http://localhost:3000/api/anuncios/upload con una imagen, con campo llamado "photo", se crea un thumbnail con prefijo fecha de hoy un thumbnail.jpg en el mismo  /src/routes/api/anuncios por el worker(consumer.js). En /src/routes/api/anuncios.js está el publisher usando Rabbitmq, que se llama al hacer el POST en la API.


## Las URLs de las imagenes las devuelve GET /api/anuncios
Ejemplo:
http://localhost:3000/api/anuncios
http://localhost:3000/img/umbrella.jpeg

## Filtrar anuncios por ID

http://localhost:5000/id
Por ejemplo: 
http://localhost:5000/5f560623c8b93ddecec04d60

## Query a imágenes
http://localhost:5000/img/bici.jpeg

## API Methods
http://localhost:5000/api/anuncios/id
Por ejemplo: 
http://localhost:5000/api/anuncios/5f560623c8b93ddecec04d60

### List of anuncios

GET /api/anuncios
[
    {
        "id": "5f50008a822e0d55360b50d4",
        "name": "bici",
        "price": "300",
        "sale": "true",
        "tags": [
            "work",
            "lifestyle"
        ],
        "photo": "img/bici.jpeg"
    },
]

Example filters:

* Lista todos los tags existentes
http://localhost:5000/api/anuncios/?fields=tags
* Por nombre:
http://localhost:5000/api/anuncios?name=bici

* Que empiece por una letra (ejemplo "b")
http://localhost:5000/api/anuncios/?name=b
* Máximo 3
http://localhost:5000/api/anuncios?limit=3
* Máximo 3 y salto el primero
http://localhost:5000/api/anuncios?limit=3&skip=1
* Precio igual a 300
http://localhost:5000/api/anuncios/?price=300
* Ordenar por precio de menor a mayor
http://localhost:5000/api/anuncios?sort=price
* Ordenar de mayor a menor
http://localhost:5000/api/anuncios?sort=-price
* Ordenar por precio y nombre
http://localhost:5000/api/anuncios?sort=price name
* Filtrar por campo
http://localhost:5000/api/anuncios?fields=price
* Filtrar por campo sin el id
http://localhost:5000/api/anuncios?fields=price%20-_id
* Filtrar por tags
http://localhost:5000/api/anuncios?tags=work lifestyle
* Precio menor que 15. Solamente hice al final $lte y precio igual a X.
http://localhost:5000/api/anuncios/?price=-15
* Precio mayor que 40 por URL
http://localhost:5000/api/anuncios?price[$gte]=40
* Precio entre 40 y 400 euros por URL
http://localhost:5000/api/anuncios?price[$gte]=40&price[$lte]=400
* Si se vende o no
http://localhost:5000/api/anuncios?sale=true


## How to start a local mongodb instance for development

```sh
./bin/mongod --dbpath ./data/db --directoryperdb
```



## Author

👤 **Violeta Canela**

* Github: [@violeta-dev](https://github.com/violeta-dev/PracticaNode)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/violeta-dev/PracticaNode/issues). You can also take a look at the [contributing guide](https://github.com/violeta-dev/PracticaNode/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Violeta Canela](https://github.com/violeta-dev).<br />
This project is [ISC](https://github.com/violeta-dev/PracticaNode/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_