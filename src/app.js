const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define path for express config
const pubDirPath = path.join(__dirname, '../public')
app.use(express.static(pubDirPath))


app.set('view engine', 'hbs')//set hbs as view engine in express
app.set('views', path.join(__dirname, '../templates/views')) //set views directory loc
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setup routing info
app.get('', (req,res) => {
    res.render('index',{
        title: "weather app",
        name:"priyank"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help Page",
        name: "Aus"
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About Page",
        name: "indico"
    })
})   


app.get('/weather', (req, res)=>{
    if(!req.query.address) return res.send({error:"Please give address"})
    geocode(req.query.address, (error,{latitude,longitude,places}) => {
        if(error) return res.send({
            error
        })
        forecast(latitude,longitude, (error, f_resp) => {
            if(!f_resp.sumary) return res.send({
                error:f_resp
            })
            res.send({
                places,
                forecast:f_resp
            })
        })
    })
})



app.get('*', (req, res)=>{//* is a wild char in express 
    res.render("404",{
        title:"404",
        errorMessage:"Page do not exist"
    })
})

//set up port loc where to listen from
app.listen(3000, ()=>{
    console.log("server is up on port 3000")
})