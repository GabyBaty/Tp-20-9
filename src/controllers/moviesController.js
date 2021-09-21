const db = require("../database/models");

//Otra forma de llamar a los modelos

module.exports = {
  list: (req, res) => {
    db.Movie.findAll()
      .then((movies) => {
        res.render("moviesList.ejs", { movies });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id)
      .then((movie) => {
        res.render("moviesDetail.ejs", { movie });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  newest: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    })
      .then((movies) => {
        res.render("newestMovies", { movies });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    })
      .then((movies) => {
        res.render("recommendedMovies.ejs", { movies });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD

  add: (req, res) => {
    db.Movie.findAll()
      .then((movies) =>
        res.render("moviesAdd", {
          title: "Agregar pelicula",
          movies,
        })
      )
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    db.Movie.create()
    .then((movies) =>
      res.render("moviesAdd", {
        title: "Agregar pelicula",
        movies,
      })
    )
    .catch((error) => console.log(error));
},
  edit: (req, res) => {
      let genres = db.Genre.findAll();
      let Movie = db.Movie.findByPk(req.params.id)
      Promise.all([genres,Movie])
      .then(([genres,Movie]) => res.render('moviesEdit',{
          title: 'Editar Pelicula',
          genres,
          Movie
      })).catch(error => console.log(error))
      
  },
  update: (req, res) => {
      const{title,awards,release_date,rating,length,genre_id} = req.body;

      db.Movie.update(
          {
              ...req.body
          },
          {
              where : {
                  id : req.params.id
              }
          }
      ).then( response => {
          console.log(response)
          return res.redirect('/movies')
      }).catch(error => console.log(error)) 
  },
  //delete: function (req, res) {
    // TODO
  
  destroy: (req, res) => {
       db.Movie.destroy({
         where : {
           id : req.params.id
         }
       }).then( response => {
         console.log(response)
         return res.redirect('/movies')
       }).catch(error => console.log(error))
  }
};


