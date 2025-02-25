const router = require('express').Router()
const Student = require('../controllers/student.controller')
router.route('/')
    .post(Student.store)
    .get(Student.index)

router.get('/wind', Student.unwindArr)

router.get('/windCondition', Student.unwindArrCondition)
router.get('/matchAge/:id', Student.matchAge)
router.get('/skiprecord', Student.skipRecord)
router.get('/sortRecord', Student.sortRecord)
router.get('/sortByCount', Student.sortByCount)
router.get('/multipleMatch/:name', Student.multipleMatch)
router.get('/cursorName', Student.cursorName)

module.exports = router