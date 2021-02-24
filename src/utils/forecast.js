const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=df6fcaf7983a550a8d0c93494aed9eca&query=23.2418%C2%B0%20N,%2072.4930%C2%B0%20E'
    
    
    //const url ='http://api.weatherstack.com/current?access_key=e287a492bac0020e14f66028e7581e91&query=23.2418%C2%B0%20N,%2072.4930%C2%B0%20E&units=f'




    request({url,json: true},(error, {body}) =>{
        if (error){
            callback('unable to connect the weather', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions +" it rains like "+ body.current.precip +" degress ")
 
        }
        
    })
}

module.exports = forecast