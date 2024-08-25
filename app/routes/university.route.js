
module.exports = (app) => {
    const university = require('../controllers/universitycontroller')
    const router = require('express').Router()

    router.get('/', university.findAll);
    router.get('/:id', university.findById)
    router.post('/', university.create)
    router.put('/:id', university.update)
    router.delete('/:id', university.delete)

    router.post('/add-degree', university.addDegree)

    app.use('/universities', router)
};