const express = require('express')
const dotenv = require('dotenv');
dotenv.config({});

const app = express()
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./Router/route');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/api', router);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.get('/', (req, res) => res.send('CareerHub!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))