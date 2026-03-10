# 🎬 CineCritic – Movie Review Platform

CineCritic is a modern React Single Page Application (SPA) designed for movie enthusiasts. It provides a platform to browse a comprehensive movie catalog, view detailed information about specific films, and actively participate by creating, editing, and managing your own movie entries.

## ✨ Key Features

* **User Authentication:** Secure Sign Up, Login, and Logout functionality.
* **Movie Catalog:** Browse a diverse collection of movies.
* **Detailed Views:** Access in-depth information about individual movies.
* **Movie Management (CRUD):** Authenticated users can Create, Edit, and Delete their own movie entries.
* **Profile Management:** Dedicated profile page for users.
* **Route Guards:** Secure routing ensuring private pages (like creating/editing) are only accessible to authenticated users, while guest pages (like login/register) are hidden from logged-in users.
* **Interactive UI:** Toast notifications for real-time user feedback.

## 🚀 Technologies Used

**Frontend:**
* [React 19](https://react.dev/) - Core UI Library
* [React Router 7](https://reactrouter.com/) - Client-side routing
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
* [Vite](https://vitejs.dev/) - Blazing fast frontend tooling and dev server
* [React Toastify](https://fkhadra.github.io/react-toastify/) - Notification pop-ups

**Backend:**
* [Node.js](https://nodejs.org/) - Running a custom REST API (SoftUni Practice Server) providing in-memory JSON storage, built-in authentication, and complete CRUD endpoints.

## 🛠️ How to Run Locally

To get the application running on your local machine, you need to start both the backend server and the frontend client.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Start the Server
Open a terminal, navigate to the `server` directory, install dependencies, and start the backend:
```bash
cd server
npm install
node server.js

cd client
npm install
npm run dev
