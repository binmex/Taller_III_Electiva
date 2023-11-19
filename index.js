const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'resoruces')))
app.use(express.static(path.join(__dirname,'views')))

//setters
app.set('port',process.env.PORT || 3000 )
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}));

//middleware
app.use('/',require('./routes/index'))




app.listen(app.get('port'),()=>console.log(`Listen ${app.get('port')}`))