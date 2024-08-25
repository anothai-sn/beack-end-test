const db = require('../models');
const University = db.universtiy;
const Degree = db.degree;
const Degree_program = db.degree_program

exports.findAll = (req, res) => {
    try {
        University.findAll({
            attributes: ["id", "universityName"],
            include: [{
                model: Degree_program,
                attributes: ["degreeId"],
                include: [{
                    model: Degree,
                    attributes: ["degreeName"],
                    as: 'degree'
                }]
            }]
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(400).json({ message: err.message || `Universities not found`})
        })
    } catch(err) {
        res.status(400).json({ message: err.message || `Something wrong with finding universities`})
    }
}

exports.findById = (req, res) => {
    try {
        University.findByPk(req.params.id, {
            attributes: ["id", "universityName"],
            include: [{
                model: Degree_program,
                attributes: ["degreeId"],
                include: [{
                    model: Degree,
                    attributes: ["degreeName"],
                    as: 'degree'
                }]
        }]
        })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message || `University id ${req.params.id} not found`})
        });
    } catch (err) {
        res.status(400).json({ message: err.message || `Something wrong with university id ${req.params.id}`})
    }
}

exports.create = (req, res) => {
    try {
        if (!req.body.universityName) { 
            return res.status(400).json({ message: `Data can't be empty!` });
        }
        
        University.create({ universityName: req.body.universityName })
        .then((data) => {
            for(i = 0; i <= req.body.degreeId.length-1; i++) {
                    Degree_program.create({
                        universityId: data.id,
                        degreeId: req.body.degreeId[i]
                    })
            }
            
            res.status(200).json({ message: `University joined degree program`})
        })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || `University created`})
        })
    } catch (err) {
        res.status(400).json({ message: err.message || `Something wrong with creaeting university`})
    }
}

exports.update = (req, res) => {
    try {
        
        if (!req.body.universityName || !req.body.degreeId) { 
            return res.status(400).json({ message: `Data can't be empty!` });
        }


        University.update({ universityName: req.body.universityName }, {
            where: { id: req.params.id }
        }).then((data) => {            
            res.status(200).json({message: `University updated`})
        })
        .catch(err => {
            res.status(500).json({ message: err.message || `University id ${req.params.id} can't update`})
        });
    } catch (err) {
        res.status(400).json({ message: err.message || `Something wrong with university id ${req.params.id}`})
    }
}

exports.delete = (req, res) => {
    try {
        University.destroy({
            where: { id:req.params.id }
        }).then(data => {
            if(data == 1) {
                res.status(200).json({message: `University deleted`})
            } else {
                res.status(500).json({message: `University failed`})
            }
        }).catch(err => {
            res.status(500).json({message: err.meassage || `University id ${req.params.id} can't delete`})
        })
    } catch(err) {
        res.status(400).json({message: err.meassage || `Something wrong with university id ${req.params.id}`})
    }
}

// For devolopment and testing
exports.addDegree = (req, res) => {
    if (!req.body.degreeName) { 
        return res.status(400).json({ message: `Degree name can't be empty!` });
    }

    for(i = 0; i <= req.body.degreeName.length-1; i++) {
        Degree.create({
            degreeName: req.body.degreeName[i]
        }).then(() => {
            res.status(200).json({ message: `Degrees created` })
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
}