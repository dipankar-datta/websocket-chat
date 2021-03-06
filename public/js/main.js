const chatForm =  document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')

const socket = io();

// Message from server
socket.on('message', message => {
    console.log(`Client message: ${message}`);

    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;
    
    // Emit message to server
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> Dipankar<span> 9.12</span></p>
    <p class="text">
        ${message}
    </p>` ;

    document.querySelector('.chat-messages').appendChild(div);
}