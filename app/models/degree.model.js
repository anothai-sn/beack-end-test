module.exports = (sequelize, Datatype) => {
    const Degree = sequelize.define("degree", {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        degreeName: {
            type: Datatype.STRING,
            allowNull: false
        },
    })

    return Degree
}