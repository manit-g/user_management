# User Management Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing user information with CRUD operations, search, pagination, and CSV export functionality.

## Features

### Backend
- ✅ CRUD API for user information with pagination support
- ✅ Search API for filtering users
- ✅ Export to CSV API
- ✅ RESTful API design

### Frontend
- ✅ Responsive design (Mobile/Desktop)
- ✅ Field validation with common rules
- ✅ Three main screens:
  1. **Listing View Page** - Table screen with search, pagination, and actions
  2. **Add/Edit Details Form Page** - Form with validation
  3. **View Details Form Page** - Creative card-based view
- ✅ Multiple routing with React Router
- ✅ Component-based architecture
- ✅ Success and error notifications with toast messages
- ✅ Clean file structure

## Tech Stack

- **Frontend**: React, Material UI, React Router, Axios, React Toastify
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Development**: Concurrently (for running both servers)

## Project Structure

```
user-management-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── userController.js  # Business logic
│   ├── models/
│   │   └── User.js        # User schema
│   ├── routes/
│   │   └── userRoutes.js  # API routes
│   ├── server.js          # Main server file
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json           # Root package.json with concurrently
└── README.md
```

## Installation

1. Clone the repository or extract the zip file

2. Install dependencies for all projects:
```bash
npm run install-all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Configuration

### Backend
1. Make sure MongoDB is installed and running on your system
2. Create a `.env` file in the `backend` folder with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management
```
   Note: If you're using MongoDB Atlas or a different MongoDB instance, update the `MONGODB_URI` accordingly.

### Frontend
The frontend is configured to connect to `http://localhost:5000/api` by default. If your backend runs on a different port, update the API_URL in `frontend/src/services/api.js` or set the `REACT_APP_API_URL` environment variable.

## Running the Application

### Option 1: Run both frontend and backend together
```bash
npm run dev
```

### Option 2: Run separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

The backend will run on `http://localhost:5000`
The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/users` - Get all users with pagination (query params: `page`, `limit`)
- `GET /api/users/search` - Search users (query params: `query`, `page`, `limit`)
- `GET /api/users/:id` - Get single user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/export` - Export all users to CSV

## User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  address: String (required),
  role: String (required),
  createdAt: Date (auto-generated)
}
```

## Routes

- `/` or `/users` - Users list page
- `/users/add` - Add new user
- `/users/:id/edit` - Edit user
- `/users/:id/view` - View user details

## Validation Rules

- **Name**: Required field
- **Email**: Required, must be valid email format, unique
- **Phone**: Required, must contain only numbers and common phone characters
- **Address**: Required field
- **Role**: Required field

## Deployment

### Backend Deployment (Heroku/Netlify Functions)
1. Set environment variables (MONGODB_URI, PORT)
2. Deploy the backend folder

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder
3. Set environment variable `REACT_APP_API_URL` to your backend URL

## Notes

- The application uses Material UI for a modern and responsive design
- Toast notifications are used for user feedback
- All components are reusable and well-structured
- The code follows clean code principles with simple naming conventions

