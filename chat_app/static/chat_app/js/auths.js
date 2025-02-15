const BASE = 'http://127.0.0.1:8000';
console.log('Scripts')
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrfToken = getCookie('csrftoken');
async function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('username', username)
    console.log('password', password)
    const response = await fetch('/sign_up/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken // formData.get('csrfmiddlewaretoken')
        },
        body: JSON.stringify({ 'username': username, 'password': password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        console.log('access', data.access)
        console.log('refresh', data.refresh)
        window.location.href = '/chat/';
    } else {
        alert(data.detail);
    }
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("username", username);
    console.log("password", password);
    let url = BASE + "/sign_in/";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        console.log("access", data.access);
        console.log("refresh", data.refresh);
        window.location.href = "/api/messages/";
    } else {
        alert(data.detail);
    }
}


