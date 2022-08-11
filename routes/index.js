const Controller = require('../controller')

const router = require('express').Router()

router.get('/',Controller.home)
router.get('/employees/add',Controller.getAdd)
router.post('/employees/add',Controller.posAdd)
router.get('/employees/edit/:id',Controller.getEdit)
router.post('/employees/edit/:id',Controller.editAdd)
router.get('/employees/delete/:id',Controller.delete)




module.exports = router