const express = require("express");
const exphbs = require("express-handlebars");
const expressFU = require("express-fileupload");
const path = require("path");
const jwt = require("jsonwebtoken");
const secretKey = "Mi super clave";

const {
	getUsuario,
	tkUsuario,
	setUsuario,
	getUsuarios,
	updateUsuario,
	updateUsuarioStatus,
	eliminarUsuario,
} = require("./modulos/usuario");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
	expressFU({
		limits: { fileSize: 5000000 },
		abortOnLimit: true,
		responseOnLimit: "El tamaño de la imagen supera el límite permitido",
	})
);

//SET VIEW ENGINE-------------------------------------
app.set("view engine", "hbs");

//CONFIG HANDLEBARS-----------------------------------
app.engine(
	"hbs",
	exphbs({
		defaultLayout: "Main",
		layoutsDir: __dirname + "/views",
		partialsDir: __dirname + "/views/components/",
		extname: "hbs",
		helpers: {
			add: (valor) => {
				return valor + 1;
			},
			leyenda: (valor) => {
				if (valor > 9) {
					return "LEYENDA";
				} else {
					return "PRO";
				}
			},
		},
	})
);

//PUBLIC----------------------------------------------
app.use(
	"/bootstrap",
	express.static(__dirname + "/node_modules/bootstrap/dist/")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.use("/", express.static("public"));

//ROUTES----------------------------------------------

//route_home
app.get("/", async (req, res) => {
	const usuarios = await getUsuarios();
	res.render("Main", {
		layout: "Main",
		usuarios,
		helpers: {},
	});
});

app.get("/ingresar", (req, res) => {
	res.render("Login", {
		layout: "Login",
	});
});

app.post("/ingresar", async (req, res) => {
	const { email, password } = req.body;
	const usuario = await getUsuario(email, password);

	if (usuario.severity != "ERROR") {
		const token = await tkUsuario(usuario);
		res.status(200).send(token);
	} else {
		final = {
			mensaje: `Error al ingresar. ${usuario.detail}`,
		};
		res.status(404).send(final);
	}
});

app.get("/usuario", async (req, res) => {
	let { token } = req.query;

	jwt.verify(token, secretKey, async (err, decoded) => {
		const user = decoded.data;
		const usuarios = await getUsuarios();
		let valido = false;
		user.usuario.nombre == "admin" ? (valido = true) : false;
		err
			? res.status(401).send(
					res.send({
						error: "401 Unauthorized",
						messaege: "Usted no está autorizado para estar aquí",
						token_error: err.message,
					})
			  )
			: res.render("Usuario", {
					layout: "Usuario",
					usuario: user.usuario,
					valido,
					usuarios,
			  });
	});
});

app.get("/usuarios", async (req, res) => {
	const usuarios = await getUsuarios();
	res.json(usuarios);
});

app.get("/registrar", (req, res) => {
	res.render("Register", {
		layout: "Register",
		final: false,
	});
});

app.post("/registrar", async (req, res) => {
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send("No files were uploaded.");
	} else {
		let usuario = Object.values(req.body);
		let foto = req.files.fotoRegistro;
		let ext = foto.name.split(".");
		let name = usuario[1].toLowerCase();
		let urlImage =
			"/assets/images/participantes/" +
			name +
			new Date().valueOf() +
			"." +
			ext[ext.length - 1];
		const nuevo = await setUsuario(usuario, urlImage);
		let mensaje = "",
			error = false;
		if (nuevo.severity != "ERROR") {
			foto.mv(path.join(__dirname + "/public" + urlImage), (err) => {
				if (err) throw err;
			});
			mensaje = "Se agregó el usuario.";
		} else {
			mensaje = `Error al agregar al usuario. ${nuevo.detail}`;
			error = true;
		}
		res.render("Register", {
			layout: "Register",
			mensaje,
			error,
			final: true,
		});
	}
});

app.post("/editar/:id", async (req, res) => {
	const { id } = req.params;
	let usuario = Object.values(req.body);
	const editado = await updateUsuario(id, usuario);
	if (editado) {
		let valido = false;
		res.render("Usuario", {
			layout: "Usuario",
			usuario: editado,
			valido,
			mensaje: true,
			error: false,
			texto: "Usuario actualizado con éxito",
		});
	} else {
		res.render("Usuario", {
			layout: "Usuario",
			usuario: editado,
			valido,
			mensaje: true,
			error: true,
			texto: "Error al actualizar el usuario.",
		});
	}
});

app.put("/editarstatus/:id", async (req, res) => {
	const { id } = req.params;
	const auth = Object.values(req.body);
	const result = await updateUsuarioStatus(auth, id);
	result > 0
		? res.status(200).send(true)
		: console.log("Error al editar Estado");
});

app.post("/eliminar/:id", async (req, res) => {
	const { id } = req.params;
	const result = await eliminarUsuario(id);
	result > 0
		? res.status(301).redirect("http://localhost:3000")
		: console.log("Error al eliminar al usuario.");
});

//404 page
app.get("*", (req, res) => {
	res.send("<h1>Esta página no existe.</h1>");
});

//SERVER----------------------------------------------
const port = 3000;

app.listen(port, () => {
	console.log(`Server on port: ${port} http://localhost:${port}`);
});
