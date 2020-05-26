const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// to target by element name, just use name (ie. form or input^), to target by class use (.className), but to target by id, use #idValue
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From Java script'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading your request'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {  
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
})

} )