const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT || 3000
require('./config/db')
const router = require('./routes/routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

app.get('/', (req, res) => res.send('Hello Herika!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))