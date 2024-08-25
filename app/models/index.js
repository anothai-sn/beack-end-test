const config = require('../config/db')
const Datatype = require('sequelize')

const sequelize = new Datatype(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}


db.Datatype = Datatype,
db.sequelize = sequelize,

db.student = require('./student.model')(sequelize, Datatype)
db.universtiy = require('./university.model')(sequelize, Datatype)
db.degree = require('./degree.model')(sequelize, Datatype)

db.degree_program = require(`./degreeProgram.model`)(sequelize, Datatype)
db.student_degreeProgram = require('./student_degreeProgram.model')(sequelize, Datatype)

// One to Many : university - degree_program
db.universtiy.hasMany(db.degree_program, {
    onDelete: 'CASCADE'
});
db.degree_program.belongsTo(db.universtiy)

// One to Many : degree - degree_program
db.degree.hasMany(db.degree_program, {
    onDelete: 'CASCADE'
});
db.degree_program.belongsTo(db.degree);

// // Many to Many
db.student.belongsToMany(db.degree_program, {
    through: "student_degreeProgram",
    onDelete: 'CASCADE'
})

db.degree_program.belongsToMany(db.student, {
    through: "student_degreeProgram",
    onDelete: 'CASCADE'
})

module.exports = db