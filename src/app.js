const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directoty to server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=> {   
    res.render('index',{
        title : ' weather app',
        name : 'shivani'
    })
})

 
app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About us',
        name: 'shivani'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText:'this is some helpful text ',
        title:'Help',
        name:'shivani'
    })
})


app.get('/weather',(req, res)=> {
    if  (!req.query.address)  {
        return res.send({
        error: 'you must provide a address'
          })
      }
      
      geocode(req.query.address, (error,{ latitude, longitute, place}={} ) => {
          if (error) {
              return res.send({ error })
          }
       forecast( latitude, longitute, (error, forecastData) => {
           if (error) {
               return res.send({error})
           }

           res.send({
               forecast:forecastData,
               place,
               address: req.query.address
           })
        })
    })   
    })



app.get('/products',(req, res)=> {
  if  (!req.query.search)  {
    return res.send({
    error: 'you must provide a search term'
      })
  }
  
console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) =>{
   res.render('404',{
       title:'404',
       name:'shivani',
    errorMessage: 'help artical not found'
})
})

app.get('/*',(req, res) => {
   res.render('404',{
       errorMessage: 'page not found'
   })
})
app.listen(port, () => {
    console.log('server is up on port ' + port)
})




// app.get('/help/*',(req, res) =>{
//     res.send('Help artical not found')
//  })
 
//  app.get('/*',(req, res) => {
//     res.send('My 404 page')
 