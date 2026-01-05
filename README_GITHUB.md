# Gym Management System 🏋️‍♂️

A comprehensive, full-stack web application designed for gym owners to manage their customers, track subscriptions, and monitor business analytics. Built with a robust **Django** backend and a modern, responsive **React** frontend.

## 🚀 Features

*   **Authentication & Security**: Secure signup/login for gym owners using JWT (JSON Web Tokens).
*   **Customer Management**: Add, view, edit, and delete customer profiles securely.
*   **Subscription Tracking**: Track customer fees, payment dates, and membership expiry dates.
*   **Smart Analytics Dashboard**: Real-time insights on:
    *   Total & Active Members
    *   Total Revenue Collected
    *   Memberships Expiring Soon (User Retention Alerts)
*   **Business Subscription Model**: Built-in subscription plans for gym owners (Mock Payment Flow for demo).
*   **Responsive Design**: Premium dark-themed UI with glassmorphism effects, fully optimized for all devices.

## 🛠 Tech Stack

*   **Frontend**: React.js, Vite, CSS Modules (Glassmorphism UI)
*   **Backend**: Django REST Framework, Python
*   **Database**: SQLite (Dev) / PostgreSQL (Prod)
*   **State Management**: React Hooks
*   **Routing**: React Router DOM (Protected Routes)

## 📦 How to Run Locally

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/JayneetV/Gym-Management-App.git
    cd Gym-Management-App
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## ☁️ Deployment

*   **Frontend**: Deployed on Vercel
*   **Backend**: Deployed on Render
*   **Database**: PostgreSQL
