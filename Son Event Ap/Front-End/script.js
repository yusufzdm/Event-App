document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', login);
});

let jwtToken = '';

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Attempting login with:', { username, password });

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        console.log('Login response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login response data:', data);
        if (data.token) {
            jwtToken = `Bearer ${data.token}`;
            console.log('JWT Token:', jwtToken);
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('event-section').style.display = 'block';
            fetchEvents();
        } else {
            alert('Login failed!');
        }
    })
    .catch(error => console.error('Error logging in:', error));
}

function fetchEvents() {
    console.log('Fetching events with token:', jwtToken);
    fetch('http://localhost:8080/api/events/getall', {
        headers: {
            'Authorization': jwtToken
        }
    })
    .then(response => {
        console.log('Fetch events response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched events:', data);
        let eventList = document.getElementById('event-list');
        eventList.innerHTML = '';
        data.forEach(event => {
            let eventCard = document.createElement('div');
            eventCard.className = 'card mb-3';
            eventCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.location}</p>
                    <p class="card-text"><small class="text-muted">${new Date(event.date).toLocaleString()}</small></p>
                    <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
                    <button class="btn btn-primary" onclick="showUpdateModal(${event.id}, '${event.name}', '${event.location}', '${new Date(event.date).toISOString().slice(0, 16)}')">Update</button>
                </div>
            `;
            eventList.appendChild(eventCard);
        });
    })
    .catch(error => console.error('Error fetching events:', error));
}

function deleteEvent(eventId) {
    console.log('Deleting event with ID:', eventId);
    fetch(`http://localhost:8080/api/events/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': jwtToken
        }
    })
    .then(response => {
        console.log('Delete event response:', response);
        if (response.ok) {
            alert('Event deleted successfully!');
            fetchEvents();
        } else {
            alert('Failed to delete event.');
        }
    })
    .catch(error => console.error('Error deleting event:', error));
}

function showUpdateModal(id, name, location, date) {
    const updateForm = document.getElementById('updateForm');
    document.getElementById('eventId').value = id;
    document.getElementById('eventName').value = name;
    document.getElementById('eventLocation').value = location;
    document.getElementById('eventDate').value = date;
    $('#updateModal').modal('show');

    updateForm.addEventListener('submit', updateEvent);
}

function updateEvent(event) {
    event.preventDefault();
    const id = document.getElementById('eventId').value;
    const name = document.getElementById('eventName').value;
    const location = document.getElementById('eventLocation').value;
    const date = document.getElementById('eventDate').value;

    fetch(`http://localhost:8080/api/events/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        },
        body: JSON.stringify({ id, name, location, date })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Updated event:', data);
        $('#updateModal').modal('hide');
        fetchEvents();
    })
    .catch(error => console.error('Error updating event:', error));
}
