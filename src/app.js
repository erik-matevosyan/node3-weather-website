const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')


const app = express()


// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static diretory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Erik Matevosyan'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Erik Matevosyan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: "Dynamic Help Message!",
        title: 'Help',
        name: "Erik Matevosyan"
    })
})



app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'Please input an address query and try again.'
        })
    }
    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send(error)
        } 
        forecast(data.coordinates[0], data.coordinates[1], (error, forecastData) => {
            if (error) {
                return res.send(error)
            }  
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
            })
    })
})



app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: '- Help article not found.',
        name: "Erik Matevosyan"
    })
})

// "*" is the wildcard character that express uses to match anything that hasn't been matched.
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: '- Page not found.',
        name: "Erik Matevosyan"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})