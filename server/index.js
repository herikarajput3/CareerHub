const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

require('dotenv').config()
require('./config/db')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoutes = require('./routes/auth.routes');
const jobsRoutes = require('./routes/jobs.routes');
const applicationRoutes = require('./routes/application.routes');
const userRoutes = require('./routes/user.routes')

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/application', applicationRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => res.send('Hello Herika!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))