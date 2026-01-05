# Deployment Guide

This guide will walk you through deploying your Gym Management app. We'll deploy the **Backend to Render** and the **Frontend to Vercel**.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **accounts**: Sign up for [Render](https://render.com/) and [Vercel](https://vercel.com/ signup).

---

## Part 1: Push Code to GitHub

1.  Initialize git if you haven't:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    ```
2.  Create a new repository on GitHub.
3.  Push your code:
    ```bash
    git remote add origin YOUR_GITHUB_REPO_URL
    git branch -M main
    git push -u origin main
    ```

---

## Part 2: Deploy Backend (Render)

1.  Go to the **Render Dashboard** and click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  **Configure Service**:
    *   **Name**: `jvmanagement-backend` (or similar)
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `gunicorn backend.wsgi`
4.  **Environment Variables** (Scroll down to "Environment Variables"):
    *   `PYTHON_VERSION`: `3.9.0` (or match your runtime.txt)
    *   `SECRET_KEY`: (Generate a long random string)
    *   `DEBUG`: `False`
    *   `ALLOWED_HOSTS`: `*` (or your frontend domain once you have it)
5.  **Database**:
    *   Render provides a "PostgreSQL" service internally. Create a **New PostgreSQL** database in Render dashboard.
    *   Copy the `Internal Database URL`.
    *   Go back to your Web Service -> Environment Variables and add `DATABASE_URL` with that value.
6.  **Deploy**: Click "Create Web Service".
    *   Once deployed, copy your backend URL (e.g., `https://jvmanagement-backend.onrender.com`).

---

## Part 3: Deploy Frontend (Vercel)

1.  Go to the **Vercel Dashboard** and click **Add New** -> **Project**.
2.  Import your GitHub repository.
3.  **Configure Project**:
    *   **Root Directory**: Click "Edit" and select `frontend`.
    *   **Framework Preset**: Vite (should auto-detect).
4.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your **Render Backend URL** (e.g., `https://jvmanagement-backend.onrender.com`).
        *   *Note: Remove any trailing slash `/` at the end.*
5.  **Deploy**: Click "Deploy".

---

## Part 4: Final Config

1.  **CORS**:
    *   Once Vercel deploys, copy your new frontend URL (e.g., `https://jvmanagement.vercel.app`).
    *   Go back to Render -> Environment Variables.
    *   Create `ALLOWED_HOSTS` or `CORS_ALLOWED_ORIGINS` according to your settings logic if needed. (We set `ALLOWED_HOSTS` to `*` via env var in settings earlier, which covers it).
2.  **Superuser**:
    *   In Render Dashboard, go to your Web Service -> **Shell**.
    *   Run: `python manage.py migrate` (To set up the new Postgres DB).
    *   Run: `python manage.py createsuperuser` (To create your admin account).

**Done!** Your app is now live.
