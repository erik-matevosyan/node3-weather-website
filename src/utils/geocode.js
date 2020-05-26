const request = require('request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3lvdGd5b3QiLCJhIjoiY2thanpzeWpuMGpqeTJxbXNmZmxnZTBsNSJ9.GTHDJXMddYpSTk9NruhXHA&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geoCode servers', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find that location, try again with a different one.', undefined)
        } else {
            callback(undefined, {
                coordinates: body.features[0].center,
                location: body.features[0].place_name
            })
        }
    
})
}

module.exports = geoCode