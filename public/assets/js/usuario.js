// Formulario de edición de participante
$("#btnEditar").on("click", (e) => {
	e.preventDefault();
	const pass1 = $("#pass1Editar").val();
	const pass2 = $("#pass2Editar").val();
	if (pass1 === pass2) $("#formEditar").submit();
	else alert("Las contraseñas deben ser iguales.");
});
