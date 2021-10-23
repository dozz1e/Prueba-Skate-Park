const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { unlink } = require("fs");

// CONFIG SECRETS -----------------
const rondas = 10;
const secretKey = "Mi super clave";

// CONFIG POOL --------------------
const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	password: "123",
	database: "skatepark",
	port: 5432,
});

// FUNCIONES ----------------------
// Login usuario
const getUsuario = async (email, password) => {
	try {
		// Solo cosulta si existe el correo
		const consulta = {
			text: "SELECT * FROM skaters WHERE email = $1;",
			values: [email],
		};
		const result = await pool.query(consulta);
		if (result.rowCount > 0) {
			let pass = result.rows[0].password;
			// Comparación de contraseñas
			let valor = bcrypt.compareSync(password, pass);
			if (valor) {
				return {
					severity: "SUCCESS",
					detail: "Login.",
					usuario: result.rows[0],
				};
			} else {
				return {
					severity: "ERROR",
					detail: "Error al ingresar el correo o la contraseña.",
				};
			}
		} else {
			return {
				severity: "ERROR",
				detail: "Error al ingresar el correo o la contraseña.",
			};
		}
	} catch (e) {
		return e;
	}
};

// Token
const tkUsuario = async (usuario) => {
	const token = jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 180,
			data: usuario,
		},
		secretKey
	);
	return token;
};

// Crear usuario
const setUsuario = async (usuario, url) => {
	const passHash = bcrypt.hashSync(usuario[2], rondas);
	const correo = usuario[0].toLowerCase();
	try {
		const consulta = {
			text: "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *;",
			values: [
				correo,
				usuario[1],
				passHash,
				usuario[4],
				usuario[5],
				url,
				false,
			],
		};
		const result = await pool.query(consulta);
		return result.rows[0];
	} catch (e) {
		return e;
	}
};

// Listado de todos los participantes
const getUsuarios = async () => {
	try {
		const result = await pool.query(
			"SELECT * FROM skaters WHERE nombre <> 'admin' ORDER BY anos_experiencia DESC;"
		);
		return result.rows;
	} catch (e) {
		console.log(e);
		return e;
	}
};

// Actualizar estado de participante
const updateUsuarioStatus = async (auth, id) => {
	try {
		const result = await pool.query(
			`UPDATE skaters SET estado = ${auth} WHERE id = ${id} RETURNING *;`
		);
		return result.rowCount;
	} catch (e) {
		console.log(e);
		return false;
	}
};

// Actualizar participante
const updateUsuario = async (id, datos) => {
	const nombre = datos[0],
		password = datos[1],
		exp = datos[3],
		especialidad = datos[4];
	try {
		let consulta = {};
		// Distintas consultas dependiendo si se actualizó la contraseña
		if (password) {
			let passHash = bcrypt.hashSync(password, rondas);
			consulta = {
				text: "UPDATE skaters SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE id = $1 RETURNING *;",
				values: [id, nombre, passHash, exp, especialidad],
			};
		} else {
			consulta = {
				text: "UPDATE skaters SET nombre = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $1 RETURNING *;",
				values: [id, nombre, exp, especialidad],
			};
		}
		const result = await pool.query(consulta);
		const usuario = result.rows[0];
		return usuario;
	} catch (e) {
		console.log(e);
		return false;
	}
};

// Eliminar participante
const eliminarUsuario = async (id) => {
	try {
		const imagen = await pool.query(
			`SELECT foto FROM skaters WHERE id = '${id}'`
		);
		const urlImg = "./public" + imagen.rows[0].foto;
		const consulta = {
			text: "DELETE FROM skaters WHERE id = $1 RETURNING *;",
			values: [id],
		};
		const result = await pool.query(consulta);
		// Borrar imagen del participante
		if (result.rowCount > 0) {
			unlink(urlImg, () => true);
		}
		return result.rowCount;
	} catch (e) {
		console.log(e);
		return false;
	}
};

module.exports = {
	getUsuario,
	tkUsuario,
	setUsuario,
	getUsuarios,
	updateUsuarioStatus,
	updateUsuario,
	eliminarUsuario,
};
