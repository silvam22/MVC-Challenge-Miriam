document.querySelector('#login-form').addEventListener('submit',(event)=>{
    event.preventDefault()

    const username = document.querySelector('#username').value 
    const password = document.querySelector('#password').value 


    if (password.length<5) {
        printMessage('Minimum password length is 5 characters')
    } else if (username.length<4) {
        printMessage('Username cannot be less than 4 characters')
    } else {
        fetch('/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        .then((response)=>{
            if (response.ok) {
                printMessage('Logged in successfully')
                document.location.replace('/dashboard')
            } else {
                return response.json()
            }
        }) 
        .then((data)=>{
            printMessage(data.message)
        })
        .catch((error)=>{
            console.log('err', error.response)
            printMessage('Error occured try again')
        })
    }
})