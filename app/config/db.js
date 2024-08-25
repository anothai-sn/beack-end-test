module.exports = {
    HOST: "127.0.0.1",
    USER: "admin",
    PASSWORD: "admin@123",
    DB: "student_db",
    dialect: "postgres",
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}