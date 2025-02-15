const apiUrl = '/api/chats/';
let accessToken = localStorage.getItem('access_token');
let refreshToken = localStorage.getItem('refresh_token');
console.log('scripts')

function login(username, password) {
    console.log('Logging in')
    fetch('/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access && data.refresh) {
            accessToken = data.access;
            refreshToken = data.refresh;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            console.log('accessToken', accessToken)
            console.log('refreshToken', refreshToken)
            window.location.href = '/chat/';
        } else {
            console.error('Login failed:', data);
        }
    })
    .catch(error => console.error('Error during login:', error));
}

function refreshTokenIfNeeded() {
    fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            accessToken = data.access;
            localStorage.setItem('access_token', accessToken);
            fetchMessages();
        } else {
            logout();
        }
    })
    .catch(error => {
        console.error('Error refreshing token:', error);
        logout();
    });
}

function fetchMessages() {
    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (response.status === 401) {
            refreshTokenIfNeeded();
        } else {
            return response.json();
        }
    })
    .then(messages => {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<strong>${message.user}</strong>: ${message.text}`;
            const responsesElement = document.createElement('div');
            responsesElement.classList.add('responses');
            message.responses.forEach(response => {
                const responseElement = document.createElement('div');
                responseElement.classList.add('response');
                responseElement.innerHTML = response.response_text;
                responsesElement.appendChild(responseElement);
            });
            messageElement.appendChild(responsesElement);
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => console.error('Error fetching messages:', error));
}

function sendMessage() {
    const textInput = document.getElementById('message-input');
    const messageText = textInput.value.trim();
    if (messageText === '') return;

    const messageData = {
        text: messageText,
        responses: []
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(messageData)
    })
    .then(response => {
        if (response.status === 401) {
            refreshTokenIfNeeded();
        } else {
            fetchMessages();
        }
    })
    .catch(error => console.error('Error sending message:', error));
}

function logout() {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login/';
}

function fetchUserPreferences() {
    fetch('/api/users/profile/', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(profile => {
        document.getElementById('dark-mode-toggle').checked = profile.dark_mode;
        if (profile.dark_mode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    })
    .catch(error => console.error('Error fetching user preferences:', error));
}

function updateDarkMode(darkMode) {
    fetch('/api/users/profile/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ dark_mode: darkMode })
    })
    .then(response => response.json())
    .then(profile => {
        if (profile.dark_mode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    })
    .catch(error => console.error('Error updating dark mode:', error));
}