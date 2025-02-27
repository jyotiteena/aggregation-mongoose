const router = require('express').Router()
const Product = require('../controllers/product.controller')
router.post('/',Product.store)
router.get('/',Product.index)
router.get('/totalStock',Product.totalStock)
router.get('/totalAvg',Product.totalAvg)
router.get('/minPrice',Product.minPrice)
router.get('/uniqueCat',Product.uniqueCat)

module.exports = router