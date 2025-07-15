const express = require('express')
const dotenv = require('dotenv');
dotenv.config({});

const app = express()
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./Router/route');



const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/api', router);

app.get('/', (req, res) => res.send('CareerHub!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))