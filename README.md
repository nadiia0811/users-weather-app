# Random Users Weather App

A **full-stack monorepo application** for viewing and saving random users enriched with real-time weather data.  
Built with **Next.js, TailwindCSS (Frontend)** and **Fastify (Backend)**, using **LowDB** for persistent storage.  

##  Features

### Frontend
- **Main page `/`**
  - Fetches **random users** from [randomuser.me](https://randomuser.me/api/)
  - Displays user info:
    - Name
    - Gender
    - Location
    - Email
    - Profile picture
    - Weather data (icon, current temperature, min & max)
  - **Actions**
    - Save user to backend
    - Load more users
- **Saved users page `/saved`**
  - Displays saved users from backend
  - Uses the same `UserCard` component
  - Ability to delete a saved user
- **Weather refresh every 5 minutes** for displayed users

### Backend
- **REST API**
- Endpoints:
  - `GET /users` — Get saved users
  - `POST /users` — Save a new user  
    - Validates request body (`zod`)
    - Checks for duplicates using **middleware (dubbing-check)**
  - `DELETE /users/:id` — Delete a saved user
- **LowDB** for storage (JSON file)
- **Controller-Service** architecture
- Middleware for:
  - **Body validation**
  - **Duplicate user check** before saving

### External APIs
- **Users** → [https://randomuser.me/api/](https://randomuser.me/api/)  
- **Weather** → [https://open-meteo.com](https://open-meteo.com/en/docs) 
