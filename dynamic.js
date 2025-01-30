const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

// Connect to WebSocket server (You'll need a server for this)
const socket = new WebSocket('ws://localhost:8080');

// Listen for messages from the WebSocket server
socket.onmessage = (event) => {
    const message = event.data;
    displayMessage(message);
};

// Send message to WebSocket server when user clicks "Send"
function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.send(message);  // Send message to the server
        displayMessage(message, true);  // Display message in chat window
        messageInput.value = '';  // Clear the input field
    }
}

// Display message in the chat container
function displayMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(isUser ? 'user-message' : 'server-message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to the bottom
}

