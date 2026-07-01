# My Portfolio

A modern portfolio web application built with **React** and **Vite**, designed to showcase my projects, technical skills, and contact information.

The current version integrates directly with the **GitHub REST API** using **Axios** to dynamically display featured repositories. The next step is migrating this integration to a custom **Spring Boot** backend, making the architecture more secure, scalable, and maintainable.

---

## Features

- Responsive modern interface
- Dynamic project listing from GitHub
- Featured repositories filtering using GitHub Topics
- Repository language detection
- Client-side routing with React Router
- Contact page
- Clean and component-based architecture

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- JavaScript (ES6+)
- CSS

### APIs

- GitHub REST API

### Planned Backend

- Java
- Spring Boot
- Spring Web
- Spring Security
- REST API
- GitHub API Integration

---

## Architecture

### Current

```text
React
   │
   │ Axios
   ▼
GitHub REST API
```

### Planned

```text
React
   │
   │ HTTP
   ▼
Spring Boot API
   │
   │ GitHub REST API
   ▼
GitHub
```

The backend will act as a gateway between the frontend and GitHub, centralizing API communication, authentication, data transformation, and future business rules.

---

## Project Structure

```text
src
├── components
├── pages
├── services
├── assets
├── App.jsx
└── main.jsx
```

---

## GitHub Integration

The application currently authenticates with the GitHub REST API using a Personal Access Token stored as an environment variable.

For each repository, the application retrieves:

- Repository name
- Description
- URL
- Homepage
- Programming languages
- Topics

Only repositories tagged with the **featured** topic are displayed in the Projects page.

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Roadmap

- Spring Boot backend
- Remove GitHub token from the frontend
- Cache GitHub responses
- Repository search and filtering
- Project details page
- Contact form with backend integration
- Deployment (Frontend + Backend)
- Docker support

---

## Author

Lucas Garcia

Software Engineering Student

Backend • Frontend • Data Systems • AI Applications