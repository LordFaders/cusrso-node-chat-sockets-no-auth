const socket = io();

// const params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
	window.location = 'index.html';
	throw new Error('El nombre y sala son necesarios');
}

var usuario = {
	nombre: params.get('nombre'),
	sala: params.get('sala'),
};

socket.on('connect', () => {
	console.log('Conectado al servidor');

	socket.emit('entrar-chat', usuario, (resp) => {
		// console.log('Usuarios conectados', resp);
		renderizarUsuarios(resp);
	});
});

// escuchar
socket.on('disconnect', () => {
	console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit(
// 	'crear-mensaje',
// 	{
// 		usuario: 'Fernando',
// 		mensaje: 'Hola Mundo',
// 	},
// 	function (resp) {
// 		console.log('respuesta server: ', resp);
// 	}
// );

// Escuchar información
socket.on('crear-mensaje', (mensaje) => {
	// console.log('Servidor:', mensaje);
	renderizarMensajes(mensaje, false);
	scrollBottom();
});

// Escuchar cuando un usuario entra o sale del chat
socket.on('lista-personas', (personas) => {
	renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensaje-privado', (mensaje) => {
	console.log('Mensaje privado: ', mensaje);
});
