## Table of Contents

1. [Info General](#info-general)
2. [Tecnologías](#tecnologias)
3. [Instalación](#instalacion)
4. [Extras](#extras)

### Info General

---

La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el
nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo
año, y han iniciado con la gestión para desarrollar la plataforma web en la que los
participantes se podrán registrar y revisar el estado de su solicitud.
En esta prueba deberás ocupar todos tus conocimientos para desarrollar un sistema que
involucre tus habilidades como Full Stack Developer, consolidando tus competencias en el
frontend y backend.

## Tecnologías

---

Una lista de tecnologías utilizadas en el proyecto:

- [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript): Versión ECMAScript 2020
- [Jquery](https://jquery.com): Versión 8.5.1
- [Bootstrap](https://bootstrap.com): Versión 4.5.3
- [Express](https://expressjs.com/es/): Versión 4.17.1
- [Handlebars](https://handlebarsjs.com): Versión 5.3.4
- [PostgreSQL](https://www.postgresql.org): Versión 8.7.1
- [JWT](https://jwt.io): Versión 8.5.1
- [Express-fileupload](https://github.com/richardgirges/express-fileupload#readme): Versión 1.2.1
- [Bcript](https://github.com/kelektiv/node.bcrypt.js#readme): Versión 5.0.1

## Instalación

---

Pasos para la instalación desde github.

```
# clonar repositorio
$ git clone https://github.com/dozz1e/Prueba---Banco-Solar

# Ruta a directorio clonado
$ cd ../ruta/al/directorio/clonado

# instalar dependencias
$ npm install

# servidor con hot relad en localhost:3000
$ npm run dev

# construir para producción y lanzar servidor
$ npm run build
$ npm run start

# generar proyecto estático
$ npm run generate
```

## Extras

---

Lista de extras agregados al código

1. **Modificación index.html**

   - En los "options" se modificó el value, de nombre a las ids de los usuarios.
   - Al eliminar un usuario, en vez de cargar nuevamente usuarios y transacciones, opte mejor por recargar la página, ya que el select no se actulizaba y seguía mostrando el usuario eliminado.
   - Cambié el formato de moment a "DD/MM/YYYY HH:mm:ss" para mostrar el formato pedido.

2. **Estructura de proyecto**

   Archivo principal server.js

   Directorio modulos:
   -- transfencias

   - funciones: Manejo de datos del Front de las transferencias y lógica del JS.
   - index: Manejo de la conexión Pool de las transferencias.

   -- usuarios

   - funciones: Manejo de datos del Front de los usuarios y lógica del JS.
   - index: Manejo de la conexión Pool de los usuarios.

   Directorio public:

   - index.html
   - favicon PNG

3. **Conexión Pool**

   Una sola conexión creada en el archivo server.js y pasada vía parametros a todas las funciones que la necesiten.
