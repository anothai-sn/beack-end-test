module.exports = (sequelize, Datatype) => {
    const db = require('./index')
    const DegreeProgram = sequelize.define("degree_program", {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    })

    return DegreeProgram
}