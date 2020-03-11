const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/c63d8021e8f4b4ade02f4ca959546897/${latitude},${longitude}`
    request(url,(error,response,body) => {
        if(error) callback("Unable to connect with service!");
        else{
            const content = JSON.parse(body);
            if(content.error) callback(undefined, "Wrong coordinates give, try again!")
            else callback(undefined,{
                sumary: content.currently.summary,
                temprature: content.currently.temperature,
            })
        }
    })
}

module.exports = forecast