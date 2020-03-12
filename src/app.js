const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000 //heroku will change port dynamically

//define path for express config
const pubDirPath = path.join(__dirname, '../public')
app.use(express.static(pubDirPath))


app.set('view engine', 'hbs')//set hbs as view engine in express
app.set('views', path.join(__dirname, '../templates/views')) //set views directory loc
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setup routing info
app.get('', (req,res) => {
    res.render('index',{
        title: "Weather App",
        name:"priyank"
    })
})

// app.get('/help', (req, res)=>{
//     res.render('help',{
//         title: "Help Page",
//         name: "Priyank"
//     })
// })
app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About Page",
        name: "Priyank",
        content: "This is highly scalable weather app."
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
        errorMessage:"Page do not exist",
        name: "Priyank"
    })
})

//set up port loc where to listen from
app.listen(port, ()=>{
    console.log(`server is up on port ${port}`)
})