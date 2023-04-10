const message = document.querySelector('#message')

function printMessage(msg) {
    message.innerHTML= msg
    setTimeout(() => {
        message.innerHTML= ''
    }, 5000);
}