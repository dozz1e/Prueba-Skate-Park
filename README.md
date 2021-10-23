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
$ git clone https://github.com/dozz1e/Prueba-Skate-Park

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

1. **Creación vista**

   - Creación de vista desde cero.

2. **Estructura de proyecto**

   Archivo principal server.js

   Directorio modulos:

   - usuario
     -- getUsuario: Hace login del usuario.
     -- tkUsuario: Agrega token al usuario.
     -- setUsuario: Registra usuario.
     -- getUsuarios: Trae todos los participantes.
     -- updateUsuarioStatus: Actualiza estado del participante.
     -- updateUsuario: Actualiza participante.
     -- eliminarUsuario: Elimina participante.

   Directorio public:

   - assets/
     -- css
     -- images
     -- js

   - favicon SVG

   Views

   - Login
   - Main
   - Register
   - Usuario

   Partials

   - Admin: Vista de la página administrador.
   - Ingreso: Formuario para ingreso de usuario.
   - Listado: Muestra lista de participantes en la vista Main.
   - Menu: Menú principal.
   - Participante: Vista de la página de cada participante.
   - Portada: Portada de la vista Main.
   - Registro: Formulario de registro.

3. **Conexión Pool**

   Dentro del modulo usuario.js

4. **BBDD**

   Modificación de la base de datos incluído en el archivo database.sql

5. **Administrador**

   La vista busca a un administrador con cuenta "admin", agregado en el archivo sql.
