module.exports = (sequelize, Datatype) => {
    const University = sequelize.define("university", {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        universityName: {
            type: Datatype.STRING,
            allowNull: false
        },
    })

    return University
}