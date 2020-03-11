console.log("client side js")

function getForecast(location){
    
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#msg-1')
const para2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit',e =>{
    e.preventDefault()
    const location = search.value
    para2.textContent = ""
    para1.textContent = "Loading!"
    fetch(`http://localhost:3000/weather?address=${location}`).then((Response)=>{
    Response.json().then(data =>{
        para1.textContent = ""
        if(data.error) {
            console.log(data)
            para2.textContent = data.error
        }
        else {
            console.log(data)
            para2.textContent = `The weather is ${data.forecast.sumary} and temprature is ${data.forecast.temprature} :)`
        }
    })
})
})