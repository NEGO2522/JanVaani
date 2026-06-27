# JanVaani - AI-Powered Civic Platform

![JanVaani Landing](frontend/public/landing%20bg%20%20image.png)

**JanVaani** is a next-generation civic engagement platform designed for India to bridge the communication gap between citizens and their Members of Parliament (MPs). It eliminates language and literacy barriers by allowing users to speak their complaints natively while using AI to synthesize, categorize, and prioritize the data for MPs.

---

## Features

- **Voice Input (Web Speech API):** Citizens can record their issues in Hindi or English without needing to type a single word.
- **AI Analysis Engine (OpenAI):** Automatically extracts the issue's category, priority score (1-100), and generates a ready-to-use justification.
- **MP Dashboard:** A dedicated space for representatives to see ranked priorities backed by data, rather than just raw complaint counts.
- **Live Heatmap (Leaflet.js):** Real-time interactive map plotting complaint hotspots across the country to visualize severe civic issues at a glance.
- **Premium UI:** Built with Tailwind CSS, utilizing glassmorphism, rounded cards, and smooth animations for an enterprise-level, citizen-first user experience.

---

## Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Custom Design System)
- **Mapping:** Leaflet.js
- **Routing:** React Router DOM

### Backend
- **Environment:** Node.js + Express
- **AI Integration:** OpenAI API (gpt-4o-mini)
- **Database:** Supabase (PostgreSQL)

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account (for database)
- OpenAI API Key

### 1. Clone the repository
```bash
git clone https://github.com/NEGO2522/JanVaani.git
cd JanVaani
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add your keys:
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
```
Start the backend server:
```bash
npm start
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## Contribution
Every voice matters. Feel free to submit issues and pull requests to help build better civic tech!

*© 2026 JanVaani. AI for Democracy.*
