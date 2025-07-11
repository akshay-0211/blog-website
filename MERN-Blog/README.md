# MERN Blog

A full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
MERN-Blog/
  Blog-Backend/         # Express + MongoDB backend
  blog-frontend-clean/  # React frontend
```

## Features

- User authentication (register/login)
- Create, edit, delete, and view blog posts
- Dashboard for managing posts
- Responsive UI

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/MERN-Blog.git
cd MERN-Blog
```

### 2. Backend Setup

```
cd Blog-Backend
cp .env.example .env # Create your .env file
npm install
npm start
```

#### .env file example

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Frontend Setup

```
cd ../blog-frontend-clean
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000).

## Usage

- Register a new user or login.
- Create, edit, and delete your blog posts.
- View all posts on the dashboard.

## Deployment

You can deploy the backend and frontend separately to services like Heroku, Vercel, or Netlify. Make sure to update API URLs in the frontend as needed.

## License

MIT
