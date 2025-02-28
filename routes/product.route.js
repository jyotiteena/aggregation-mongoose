const router = require('express').Router()
const Product = require('../controllers/product.controller')
router.post('/',Product.store)
router.get('/',Product.index)
router.get('/totalStock',Product.totalStock)
router.get('/totalAvg',Product.totalAvg)
router.get('/minPrice',Product.minPrice)
router.get('/uniqueCat',Product.uniqueCat)
router.get('/OnlyProduct',Product.OnlyProduct)
router.get('/firstProduct',Product.firstProduct)
router.get('/lastProduct',Product.lastProduct)

module.exports = router