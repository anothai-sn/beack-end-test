
module.exports = (app) => {
    const student = require('../controllers/student.controller')
    const router = require('express').Router()

    router.get('/', student.findAll);
    router.get('/:id', student.findById)
    router.post('/', student.create)
    router.put('/:id', student.update)
    router.delete('/:id', student.delete)

    app.use('/students', router)
};