### Personal Expense Tracker
A full-stack web application that helps you track, manage, and visualize your expenses with ease.
Built using React.js, Node.js, and MongoDB Atlas, this project provides an intuitive UI and real-time expense summaries

## Tech Stack
Frontend: React.js, Recharts, CSS (Neumorphic UI)
Backend: Node.js, Express.js
Database: MongoDB Atlas (via Mongoose ORM)

## Features
All you have mentiones in your task.

## Installation & Setup
# Backend:
cd backend
npm install

# Create .env file:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expensesDB

# Run server:
npm run dev


# frontend:
cd frontend
npm install
npm start


## API Endpoints:-
| Method | Endpoint        | Description                      |
| ------ | --------------- | -------------------------------- |
| POST   | `/expenses`     | Add a new expense                |
| GET    | `/expenses`     | Fetch all expenses               |
| PUT    | `/expenses/:id` | Update an expense                |
| DELETE | `/expenses/:id` | Delete an expense                |
| GET    | `/summary`      | Get total, by category, by month |



## Folder Structure:-
Personal-Expense-Tracker/
│
├── backend/
│   ├── models/
│   │   └── Expense.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseFilter.js
│   │   │   ├── Summary.js
│   │   └── App.js
│   ├── index.css
│   ├── package.json
│   └── public/
│
└── README.md



## UI Design Highlights:-
Soft 3D neumorphic cards
Gradient background with depth
Smooth hover animations
Responsive layout (desktop & mobile)
Minimalist typography (Poppins / Segoe UI)

## Developer
Raj Anand
NIT Agartala
2025
Made using React.js,Node.js,MongoDB


## License
This project is for educational and demonstration purposes.
You can use and modify with my permissions only.

## Summary
A full-stack personal expense tracker with cloud-based storage, interactive data visualization, and a modern neumorphic UI built using React, Node.js, and MongoDB.