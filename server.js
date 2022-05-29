const mongoose= require('mongoose'); // se inyecta la dependencia de moongose
const express = require('express'); // inyección de la dependencia de Express
const personsRoutes = require('./routes/persons'); //se inyecta la dependencia del router de persons
const app = express();

mongoose.Promise= global.Promise;


app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended:false} ));
app.use(personsRoutes);

app.get('/', (req,res) =>{
    res.render('main')
});

// Conexión con la base de datos
mongoose.connect(
    `mongodb+srv://fbs619:fbs12345@cluster0.ernhq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true

}
);

const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
    console.log("Connected successfully");

});

let PORT = process.env.PORT || 3000; //Definición del puerto de escucha

app.listen(PORT, ()=> {
    console.log('escucha en el puerto 3000');
});