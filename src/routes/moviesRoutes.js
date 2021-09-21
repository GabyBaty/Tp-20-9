const express = require('express');
const router = express.Router();
const {list,newest,recomended,detail,add,create,edit,update,destroy} = require('../controllers/moviesController');

router.get('/',list);
router.get('/new',newest);
router.get('/recommended',recomended);
router.get('/detail/:id', detail);
router.get('destroy/:id',destroy)

//Rutas exigidas para la creación del CRUD
router.get('/add',add);
router.post('/create',create);
router.get('/edit/:id',edit);
router.put('/update/:id',update);
router.delete('/destroy/:id',destroy);

module.exports = router;