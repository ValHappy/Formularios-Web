var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var fs = require('fs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(request, response){
    var contexto = {
        titulo: 'Página principal',
    };
    response.render('home', contexto);
});

app.post('/login', function(request, response){
    var infoFormulario = request.body;
    agregarInformacion("Correo: "+ infoFormulario.correo + " Contraseña: " + infoFormulario.contrasena + "\n");
    response.redirect('/welcome');
});

app.get('/welcome', function(request, response){
    var contexto = {
        titulo: 'Bienvenido',
    };
    response.render('welcome', contexto);
});

function agregarInformacion(texto) {
    fs.appendFile('archivo.txt', texto, function (err) {
        if (err) throw err;
        console.log('Información agregada!');
    });
}

console.log("Servidor iniciado...");
app.listen(3000);