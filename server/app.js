const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongo")
})
mongoose.connection.on('error', (err) => {
    console.log("Error in establishing connection", err);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})