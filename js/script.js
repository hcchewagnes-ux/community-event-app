// --- State Management ---
// Reset old localStorage key to load updated default events
if (!localStorage.getItem('community_events_v2')) {
    localStorage.removeItem('community_events');
    localStorage.setItem('community_events_v2', 'true');
}

let events = JSON.parse(localStorage.getItem('community_events')) || [
    {
        id: 1,
        title: "Morning Yoga in the Park",
        date: "2026-05-01",
        time: "08:00 – 10:00",
        location: "Bishan Park, Pavilion 3",
        capacity: 20,
        rsvps: ["user1", "user2"],
        description: "Start your Labour Day with a refreshing outdoor yoga session. Suitable for all levels — just bring a mat and water!",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
        category: "Health"
    },
    {
        id: 2,
        title: "Intro to Coding Workshop",
        date: "2026-05-01",
        time: "08:00 – 10:00",
        location: "Tampines Community Hub, Level 2",
        capacity: 15,
        rsvps: ["user3"],
        description: "Learn the fundamentals of web development. No experience needed. Laptops provided for all participants.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        category: "Education"
    },
    {
        id: 3,
        title: "Community Art Jamming",
        date: "2026-05-01",
        time: "08:00 – 10:00",
        location: "The Creative Attic, Jalan Besar",
        capacity: 10,
        rsvps: ["user4", "user5", "user6", "user7", "user8"],
        description: "Express yourself through painting! All materials are provided. Join us for a relaxed, creative morning with neighbours.",
        image: "https://images.unsplash.com/photo-1460661419201-fd4ce18a802f?auto=format&fit=crop&q=80&w=800",
        category: "Creative"
    },
    {
        id: 4,
        title: "Neighbourhood Gardening Day",
        date: "2026-05-01",
        time: "08:00 – 10:00",
        location: "Bukit Timah Community Garden",
        capacity: 30,
        rsvps: [],
        description: "Help plant and tend to our community vegetable garden. Gloves and tools provided. Great fun for the whole family!",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
        category: "Environment"
    }
];

// Current User Simulation (Simple ID)
const currentUserId = "me_user_99";

// --- DOM Elements ---
const eventGrid = document.getElementById('event-grid');
const mainView = document.getElementById('main-view');
const dashboardView = document.getElementById('dashboard-view');
const toggleDashboardBtn = document.getElementById('toggle-dashboard');
const logo = document.getElementById('logo');
const searchInput = document.getElementById('event-search');
const dashboardTableBody = document.getElementById('dashboard-table-body');
const eventModal = document.getElementById('event-modal');
const openCreateModalBtn = document.getElementById('open-create-modal');
const closeModalBtn = document.getElementById('close-modal');
const eventForm = document.getElementById('event-form');
const toastContainer = document.getElementById('toast-container');

// --- Functions ---

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-circle';
    
    toast.innerHTML = `<i data-lucide="${icon}" size="18"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function saveToStorage() {
    localStorage.setItem('community_events', JSON.stringify(events));
}

function renderEvents(filterText = '') {
    eventGrid.innerHTML = '';
    
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(filterText.toLowerCase()) ||
        event.location.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filteredEvents.length === 0) {
        eventGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 5rem 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔎</div>
                <h3 style="margin-bottom: 0.5rem;">No events found</h3>
                <p style="color: var(--text-muted);">Try a different search term or browse all events.</p>
            </div>
        `;
        return;
    }

    filteredEvents.forEach(event => {
        const isJoined = event.rsvps.includes(currentUserId);
        const seatsLeft = event.capacity - event.rsvps.length;
        const isFull = seatsLeft <= 0;

        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-image">
                <img src="${event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'}" alt="${event.title}">
                <div class="event-badge">${event.category || 'General'}</div>
                ${isFull ? '<div class="event-full-badge">FULL</div>' : ''}
            </div>
            <div class="event-content">
                <div class="event-date">${formatDate(event.date)}${event.time ? ' &nbsp;·&nbsp; <i data-lucide="clock" size="12"></i> ' + event.time : ''}</div>
                <h3 class="event-title">${event.title}</h3>
                ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
                <div class="event-info">
                    <div class="event-info-item"><i data-lucide="map-pin" size="14"></i> ${event.location}</div>
                    <div class="event-info-item"><i data-lucide="users" size="14"></i> ${event.capacity} spots total</div>
                </div>
            </div>
            <div class="event-footer">
                <div class="seat-counter">
                    <span class="seat-count" style="color: ${isFull ? 'var(--danger)' : 'var(--success)'}">${seatsLeft}</span> seats left
                </div>
                <button class="btn ${isJoined ? 'btn-leave' : (isFull ? 'btn-full' : 'btn-primary')}" 
                        onclick="toggleRSVP(${event.id})" 
                        ${!isJoined && isFull ? 'disabled' : ''}>
                    ${isJoined ? '✓ Leave' : (isFull ? 'Full' : 'Join Now')}
                </button>
            </div>
        `;
        eventGrid.appendChild(card);
    });
    lucide.createIcons();
}

function renderDashboard() {
    dashboardTableBody.innerHTML = '';
    events.forEach(event => {
        const seatsLeft = event.capacity - event.rsvps.length;
        const pct = Math.round((event.rsvps.length / event.capacity) * 100);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600;">${event.title}</td>
            <td>${formatDate(event.date)}</td>
            <td style="color: var(--text-muted);">${event.time || '—'}</td>
            <td>${event.location}</td>
            <td>${event.capacity}</td>
            <td>
                <span style="color: ${seatsLeft === 0 ? 'var(--danger)' : 'var(--success)'}; font-weight: 700;">${event.rsvps.length}</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;"> / ${event.capacity} (${pct}%)</span>
            </td>
            <td>
                <button class="btn btn-glass" style="padding: 0.4rem; color: var(--danger);" onclick="deleteEvent(${event.id})">
                    <i data-lucide="trash-2" size="16"></i>
                </button>
            </td>
        `;
        dashboardTableBody.appendChild(row);
    });
    lucide.createIcons();
}

function toggleRSVP(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const index = event.rsvps.indexOf(currentUserId);
    if (index > -1) {
        // Leave
        event.rsvps.splice(index, 1);
        showToast(`You have left "${event.title}"`, 'info');
    } else {
        // Join
        if (event.rsvps.length < event.capacity) {
            event.rsvps.push(currentUserId);
            showToast(`Success! You joined "${event.title}"`, 'success');
        } else {
            showToast(`Sorry, "${event.title}" is full.`, 'error');
        }
    }
    
    saveToStorage();
    renderEvents(searchInput.value);
    if (dashboardView.style.display === 'block') renderDashboard();
}

function deleteEvent(id) {
    const event = events.find(e => e.id === id);
    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
        events = events.filter(e => e.id !== id);
        saveToStorage();
        renderDashboard();
        renderEvents();
        showToast('Event deleted successfully', 'success');
    }
}

function formatDate(dateStr) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

// --- Event Listeners ---

toggleDashboardBtn.addEventListener('click', () => {
    const isDashboard = dashboardView.style.display === 'block';
    if (isDashboard) {
        dashboardView.style.display = 'none';
        mainView.style.display = 'block';
        toggleDashboardBtn.innerHTML = `<i data-lucide="layout-dashboard"></i> <span>Dashboard</span>`;
    } else {
        dashboardView.style.display = 'block';
        mainView.style.display = 'none';
        toggleDashboardBtn.innerHTML = `<i data-lucide="home"></i> <span>Events</span>`;
        renderDashboard();
    }
    lucide.createIcons();
});

logo.addEventListener('click', () => {
    dashboardView.style.display = 'none';
    mainView.style.display = 'block';
    renderEvents();
});

searchInput.addEventListener('input', (e) => {
    renderEvents(e.target.value);
});

openCreateModalBtn.addEventListener('click', () => {
    eventModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === eventModal) eventModal.style.display = 'none';
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        title: document.getElementById('f-title').value,
        date: document.getElementById('f-date').value,
        time: document.getElementById('f-time').value || null,
        location: document.getElementById('f-location').value,
        description: document.getElementById('f-description').value || null,
        capacity: parseInt(document.getElementById('f-capacity').value),
        rsvps: [],
        image: document.getElementById('f-image').value || null,
        category: document.getElementById('f-category').value || "Community"
    };

    events.push(newEvent);
    saveToStorage();
    renderEvents();
    renderDashboard();
    
    eventForm.reset();
    eventModal.style.display = 'none';
    showToast(`"${newEvent.title}" created!`, 'success');
});

// --- Initial Render ---
renderEvents();
