const router = require('express').Router()
const Product = require('../controllers/product.controller')
router.post('/',Product.store)
router.get('/',Product.index)
router.get('/totalStock',Product.totalStock)

module.exports = router