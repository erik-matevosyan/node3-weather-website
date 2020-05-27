const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fe888da487893d68629cf31fcfd93e41&query=' + longitude + ',' + latitude + '&units=f'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else { 
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '% locally.')
        }

    })


}

module.exports = forecast