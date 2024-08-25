module.exports = (sequelize, Datatype) => {
    const db = require('./index');
    const student_degreeProgram = sequelize.define("student_degreeProgram", {
        studentId: {
            type: Datatype.INTEGER,
            references: {
                model: db.student,
                key: 'id'
            },
            allowNull: false
        },
        degreeProgramId: {
            type: Datatype.INTEGER,
            references: {
                model: db.degree_program,
                key: 'id'
            },
            allowNull: false
        }
    })

    return student_degreeProgram;
};