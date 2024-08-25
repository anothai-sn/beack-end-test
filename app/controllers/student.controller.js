const db = require('../models')
const Student = db.student
const University = db.universtiy
const Degree = db.degree
const Student_DegreeProgram = db.student_degreeProgram
const Degree_program = db.degree_program

exports.findAll = (req, res) => {
    try {
        Student.findAll({
            attributes: ["id", "studentName"],
            include: [{
                model: Degree_program,
                attributes: ["id"],
                include: [{
                    model: University,
                    attributes: ["universityName"],
                    as: 'university'
                },{
                    model: Degree,
                    attributes: ["degreeName"],
                    as: 'degree'
                }],
                through: {attributes: []}
            }]
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(400).json({message: err.meassage || `Students not found`})})
    } catch(err) {
        res.status(400).json({ message: err.message || `Something wrong with finding students`})
    }
}

exports.findById = (req, res) => {
    try {
        Student.findByPk(req.params.id, {
            attributes: ["id", "studentName"],
            include: [{
                model: Degree_program,
                attributes: ["id"],
                include: [{
                    model: University,
                    attributes: ["universityName"],
                    as: 'university'
                },{
                    model: Degree,
                    attributes: ["degreeName"],
                    as: 'degree'
                }],
                through: {attributes: []}
            }]
        })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message || `Student id ${req.params.id} not found`})
        });
    } catch (err) {
        res.status(400).json({ message: err.message || `Something wrong with student id ${req.params.id}`})
    }
}


exports.create = (req, res) => {
    try {

        if (!req.body.studentName && !req.body.degreeProgramId) { 
            return res.status(400).json({ message: `Data can't be empty` })
        }
        
        Student.create({ studentName: req.body.studentName })
        .then((data) => {
            Student_DegreeProgram.create({
                studentId: data.id,
                degreeProgramId: req.body.degreeProgramId
            })
    
            res.status(200).json({ message: `Student joined Degree program` })
        })
        .then(() => {
            res.status(200).json({ message: `Student created` })
        })
        .catch(err => {
            res.status(500).json({ message: err.message || `Something wrong with creating university`})
        }) 
    } catch (err) {
        res.status(400).json({ message: err.message || `Something wrong with updating student`})
    }
}


exports.update = (req, res) => {
    try {

        if (!req.body.studentName || !req.body.degreeProgramId) { 
            return res.status(400).json({ message: `Data can't be empty` })
        }

        Student.update({ studentName: req.body.studentName }, {
            where: { id: req.params.id }
        })
        .then(() => {
            Student_DegreeProgram.update({
                degreeProgramId: req.body.degreeProgramId
            }, {
                where : {studentId: req.params.id}
            })

            res.status(200).json({message: `Student updated`})
        })
        .catch(err => {
            res.status(500).json({ message: err.message || `Student id ${req.params.id} can't update`})
        })
    } catch (err) {
        res.status(400).json({ message: err.message || `Something wrong with updating student id ${req.params.id}`})
    }
}


exports.delete = (req, res) => {
    try {
        Student.destroy({
            where: { id:req.params.id }
        }).then(data => {
            if(data == 1) {
                res.status(200).json({message: `Student deleted`})
            } else {
                res.status(500).json({message: `Student failed`})
            }
        }).catch(err => {
            res.status(500).json({message: err.meassage || `Student id ${req.params.id} can't delete`})
        })
    } catch(err) {
        res.status(400).json({message: err.meassage || `Something wrong with student id ${req.params.id}`})
    }
}