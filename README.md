# CRUD App

A full-stack CRUD (Create, Read, Update, Delete) application built with Node.js/Express backend and React frontend with Vite.

## Project Structure

```
CRUD App/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── product.js         # Product data model
│   ├── routes/
│   │   └── productRoutes.js   # API routes
│   ├── server.js              # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── productApi.js  # API client
    │   ├── components/
    │   │   └── productForm.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your database connection in `config/db.js`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The server will run on `http://localhost:3000` (or configured port)

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default)

## Features

- Create new products
- View all products
- Update existing products
- Delete products
- Responsive UI built with React
- Modern development setup with Vite

## Implementation Overview

### Architecture

This is a client-server architecture with a clear separation of concerns:

- **Backend**: Express.js REST API that handles all business logic, database operations, and CRUD operations
- **Frontend**: React application with Vite that provides a user interface to interact with the backend

### How It Works

1. **Frontend** (`productApi.js`): Sends HTTP requests to the backend API endpoints
2. **Backend Routes** (`productRoutes.js`): Routes incoming requests to appropriate controllers
3. **Controllers** (`productController.js`): Contains business logic for handling requests and responses
4. **Models** (`product.js`): Defines the product data structure and database operations
5. **Database** (`config/db.js`): Manages database connections

### User Flow

1. User interacts with the React UI in `productForm.jsx`
2. Form actions trigger API calls through `productApi.js`
3. Backend processes the request and updates the database
4. Response is sent back to frontend and UI is updated

## API Endpoints

The backend provides the following REST API endpoints for product management:

- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Technologies Used

**Backend:**
- Node.js
- Express.js

**Frontend:**
- React
- Vite
- ESLint

## License

ISC
