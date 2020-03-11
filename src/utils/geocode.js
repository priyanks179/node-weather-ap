const request = require('request')

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicHJpeWFuazEyMyIsImEiOiJjazdsZWRmN24wNnF5M2drMjh1YXYxdXpjIn0.YEVFx7IXAi1duR1_XnCPkQ&limit=1`;
    request(url,(error,response,body) => {
        if(error) callback("Unable to connect the location service");
        else{
            const content = JSON.parse(body);
            if(content.features.length===0) callback(undefined, "unable to find the location! Try again")
            else callback(undefined, {
                latitude: content.features[0].center[1],
                longitude: content.features[0].center[0],
                places: content.features[0].place_name
            })
        }
    })
}

module.exports = geocode