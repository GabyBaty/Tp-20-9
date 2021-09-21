const express = require('express');
const path = require('path');

const methodOverride = require('method-override');
const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const genresRouterApi = require('./routes/api/genresRoutes');//llama a la ruta de la api por genero//
const moviesRouterApi = require('./routes/api/moviesRoutes');//llama a la ruta de la api por pelicula//
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(methodOverride('_method'));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/movies',moviesRoutes);
app.use('/genres', genresRoutes);
app.use('/api/genres', genresRouterApi);//usa la ruta de la api para que lleguen los datos por genero//
app.use('/api/movies', moviesRouterApi);//usa la ruta de la api para que lleguen los datos por pelicula//

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
