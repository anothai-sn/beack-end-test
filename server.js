const express = require('express')
const app = express()

require('dotenv').config
const PORT = process.env.PORT || 5000

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Hello, World!")
})

const db = require('./app/models')
db.sequelize.sync({force: false}).then(() => {
    console.log(`Database is syncing...`)
})

require('./app/routes/university.route')(app)
require('./app/routes/student.route')(app)

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})