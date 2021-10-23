// Formulario Ingreso
$("#formIngreso").on("submit", async (e) => {
	e.preventDefault();
	const email = $("#emailIngreso").val().toLowerCase();
	const password = $("#passwordIngreso").val();

	let payload = { email, password };
	axios
		.post("/ingresar", payload)
		.then((data) => {
			const token = data.data;
			sessionStorage.setItem("token", JSON.stringify(token));
			window.location.href = `/usuario?token=${token}`;
		})
		.catch(({ response }) => {
			$("#errorIngreso").removeClass("d-none");
			$("#errorIngreso").html(response.data.mensaje);
			$("#emailIngreso").val("");
			$("#passwordIngreso").val("");
		});
});
