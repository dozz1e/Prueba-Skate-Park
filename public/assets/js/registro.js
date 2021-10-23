// Formulario de registro
$("#btnRegistrar").on("click", (e) => {
	e.preventDefault();
	const pass1 = $("#pass1Registro").val();
	const pass2 = $("#pass2Registro").val();
	if (pass1 === pass2) $("#formRegistro").submit();
	else alert("Las contraseñas deben ser iguales.");
});
