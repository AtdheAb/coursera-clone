require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const studentRoute = require('./routes/students')
const cors = require('cors');
const app = express()

app.use(cors());
//db connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (err)=> console.log(err.message));
db.once('open', ()=> console.log('connected succesfully with db'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine' , 'ejs')

app.use('/students',studentRoute)
app.get('/', (req,res) =>{
    res.send('Home Page')
})
app.listen( 3001, () => console.log('server is on...'))