# CommuniHub — Community Event App

A centralized, mobile-first web app for discovering, joining, and managing community events. Built as Case Study 1 for a group project on solving fragmented event coordination.

---

## Problem Statement

Youth communities rely on WhatsApp groups for event announcements, leading to:
- Fragmented and chaotic communication
- No centralized event hub
- Manual and unreliable RSVP tracking
- No real-time seat availability

---

## Solution

CommuniHub provides a clean, real-time platform where:
- Events are listed with **date, time, location, and capacity**
- Users can **Join or Leave** events with one tap
- **Seat counters update live** — no more guessing if a spot is available
- Organizers have a **dashboard** to create and manage events

---

## Features

| Feature | Description |
|---|---|
| 📅 Event Listings | Date, time, location, capacity, description |
| ✅ RSVP System | One-tap Join / Leave with real-time seat updates |
| 🔴 Capacity Guard | Events lock when full; "FULL" badge shown |
| 🔍 Search | Live search by title or location |
| 🗂️ Organizer Dashboard | Create, view, and delete events |
| 💾 Persistence | Data saved in localStorage |
| 🔔 Toast Notifications | Instant feedback on every action |

---

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Glassmorphism, animations, responsive grid
- **Vanilla JavaScript (ES6+)** — State management, DOM rendering
- **Lucide Icons** — Clean icon set
- **Google Fonts (Outfit)** — Modern typography

---

## Project Structure

```
community-event-app/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # Design system & layout
├── js/
│   └── script.js       # App logic & state management
├── images/             # Image assets
└── README.md
```

---

## How to Run

1. Open `index.html` in any modern browser — no build step needed.
2. Click **Dashboard** to switch to the organizer view and create new events.
3. Click **Join Now** on any event card to RSVP.

---

## Case Study Context

- **Group Work** | 1:45 – 2:45 PM (60 min) | Teams of 3–4
- **Deliverable**: Community Event App with event listings, RSVP system, and organizer dashboard
