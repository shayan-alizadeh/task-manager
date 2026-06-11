# Task Manager API 📝

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** for managing daily tasks. This project provides a complete set of CRUD operations with advanced features like pagination, text searching, and filtering.

## 🚀 Features

- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Pagination:** Control the number of tasks fetched per request (`page`, `limit`).
- **Search & Filtering:** Search tasks by title and filter them by their completion status.
- **Validation & Error Handling:** Basic input validation (e.g., minimum title length) and structured error/success responses.
- **CORS Enabled:** Ready to be consumed by any frontend application.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (using `mysql2/promise` for async/await support)
- **Environment Management:** `dotenv`

## 📁 Project Structure

````text
📦 task-manager
 ┣ 📂 controllers
 ┃ ┗ 📜 task.js         # Handles incoming requests and orchestrates logic
 ┣ 📂 models
 ┃ ┗ 📜 task.js         # Raw SQL queries and database interactions
 ┣ 📂 routes
 ┃ ┗ 📜 task.js         # API route definitions
 ┣ 📂 utils
 ┃ ┗ 📜 db.js           # MySQL connection pool/setup
 ┣ 📜 app.js            # Express application setup and entry point
 ┗ 📜 .env              # Environment variables (Ignored in Git)

## ⚙️ Setup and Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/[YourUsername]/task-manager.git
   cd task-manager
```

2. **Install dependencies:**

```bash
   npm install

3. **Database Setup:Create a MySQL database and run the following query to create the tasks table:**

```bash
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL UNIQUE,
       completed BOOLEAN DEFAULT false,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );


4. **Environment Variables:Create a .env file in the root directory and add your database credentials:**

```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=task_manager_db
   PORT=3000

5. **Start the server:**

```bash
   npm start
   # or node app.js

---

## 📡 API Documentation
**Base URL:** `http://localhost:3000/api/v1`

### 1. Get All Tasks
*   **Endpoint:** `GET /tasks`
*   **Query Parameters (Optional):**
*   `page` (number): Page number (default: 1)
*   `limit` (number): Number of items per page (default: 4)
*   `search` (string): Search string in task titles
*   `finished` (boolean): Filter by completion status (`true` or `false`)

### 2. Get a Specific Task
*   **Endpoint:** `GET /tasks/:id`
*   **Description:** Fetches the details of a single task by its ID.

### 3. Create a New Task
*   **Endpoint:** `POST /tasks`
*   **Request Body:**

```json
    {
        "title": "Buy groceries",
        "completed": false
    }
*   **Note:** The title must be at least 3 characters long and unique.

### 4. Update a Task
*   **Endpoint:** `PUT /tasks/:id`
*   **Request Body:**
json
{
"title": "Buy groceries and milk",
"completed": true
}

### 5. Delete a Task
*   **Endpoint:** `DELETE /tasks/:id`
*   **Description:** Deletes the specified task and returns a success message.
````
