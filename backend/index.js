const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.get('/allPackages', (req, res) => {
    res.send({allPackages : db.allPackages.packages})
})

app.listen(3001, ()=>{
    console.log(`Server listening at 3001`)
})