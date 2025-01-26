# Full-Stack Food Ordering App

## Description

This is a full-stack food ordering application built with **React** for the frontend and **Node.js** with **Express** for the backend. Users can browse a dynamic menu, add items to their cart, and manage their selections. The backend uses **MongoDB** for storing data, with **Mongoose** for database interaction. The application includes user authentication, allowing users to securely add and update menu items. Admin functionality enables managing the menu, while the responsive UI ensures a seamless user experience.

## Features

- Browse a dynamic menu of food items.
- Add items to your cart.
- User authentication and secure login.
- Admin panel to add or update menu items.
- Responsive design for mobile and desktop views.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **Icons:** Lucide React

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/thesagardahiwal/full-stack-task-management-app..git
    cd full-stack-task-management-app./server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```
    MONGODB_URI= mongodb://localhost:27017/food-delery
    JWT_SECRET= your_jwt_secret
    ```

4. Start the server:
    ```bash
    node server src/app.js
    ```

### Frontend Setup

1. Navigate to the client directory:
    ```bash
    cd full-stack-task-management-app.
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm run dev
    ```

The app should now be running at `http://localhost:5173` (frontend) and `http://localhost:8000` (backend).

## Demo Video


https://github.com/user-attachments/assets/00b79a22-88e6-4735-8ad2-e283002e9c2f


