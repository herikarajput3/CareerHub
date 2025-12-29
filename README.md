# 🚀 CareerHub – Full-Stack Job Portal Application

CareerHub is a **full-stack job portal web application** that connects **candidates** and **recruiters** through a clean, role-based experience.

The project is designed with a **real-world mindset**:

* secure backend APIs
* clean frontend architecture
* professional UX patterns
* clear separation of concerns

Rather than overloading features, CareerHub focuses on **correctness, scalability, and clarity**, making it **portfolio-ready and interview-ready**.

---

## ✨ Core Features

### 👤 Authentication & Authorization

* User registration & login
* JWT-based authentication
* Role-based access (`candidate`, `recruiter`)
* Protected routes on frontend and backend

---

### 🧑‍💼 Candidate Features

* Browse jobs (public)
* Apply to jobs using resume URL
* Track application status (Pending / Accepted / Rejected)
* Candidate dashboard with activity summary
* Profile page with **view → edit UX pattern**

---

### 🏢 Recruiter Features

* Post new jobs
* Edit and close jobs
* View applicants per job
* Accept / reject applications
* Recruiter dashboard with hiring statistics
* Company profile management

---

### 📊 Dashboards

* Role-specific dashboards
* Summary cards for quick insights
* Clean separation of candidate & recruiter flows

---

## 🧠 UX & Architecture Highlights

* Edit user profile
* Centralized API handling using Axios Interceptors
* Global authentication & error handling
* Local UI states for loading and empty screens
* No duplicate error or success handling

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router
* Context API (AuthContext)
* Axios with interceptors
* Tailwind CSS / DaisyUI
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose (with discriminators)
* JWT Authentication

---

## 🗂️ Project Structure

### 📁 Frontend

```
src/
 ┣ api/
 ┃ ┗ axiosInstance.js
 ┣ Components/
 ┃ ┣ CandidateProfileSection.jsx
 ┃ ┣ RecruiterProfileSection.jsx
 ┃ ┣ ProfileSection.jsx
 ┃ ┣ JobCard.jsx
 ┃ ┣ Navbar.jsx
 ┃ ┗ ...
 ┣ Pages/
 ┃ ┣ Auth/
 ┃ ┣ Candidate/
 ┃ ┣ Recruiter/
 ┃ ┣ Dashboard.jsx
 ┃ ┗ Job.jsx
 ┣ Context/
 ┃ ┗ AuthContext.jsx
 ┣ Routes/
 ┃ ┗ ProtectedRoute.jsx
 ┗ App.jsx
```

---

### 📁 Backend

```
backend/
 ┣ config/
 ┃ ┗ db.js                     
 ┣ controllers/
 ┃ ┣ application.controller.js 
 ┃ ┣ job.controller.js         
 ┃ ┗ user.controller.js        
 ┣ middleware/
 ┃ ┗ jwt.js                    
 ┣ models/
 ┃ ┣ User.js                   
 ┃ ┣ Candidate.js              
 ┃ ┣ Recruiter.js
 ┃ ┣ Job.js                   
 ┃ ┗ Application.js            
 ┣ routes/
 ┃ ┣ auth.routes.js            
 ┃ ┣ user.routes.js           
 ┃ ┣ jobs.routes.js            
 ┃ ┗ application.routes.js     
 ┣ .env
 ┣ index.js
 ┣ package.json
 ┗ package-lock.json
```

## 🔐 Backend Design Highlights

### 👥 Role-Based User Models

* Mongoose discriminators:

  * `User` (base)
  * `Candidate`
  * `Recruiter`
* Shared authentication logic
* Role-specific fields & permissions

---

### ✏️ Secure Profile Updates

* Single endpoint: `PUT /api/users/me`
* **Role-based field whitelisting**
* Prevents updating:

  * role
  * email
  * password
  * sensitive system fields

This protects the system from privilege escalation and over-posting attacks.

---

### 🧩 Controllers & Routes

* Controllers contain all business logic
* Routes are thin and declarative
* Middleware handles authentication & authorization

Example:

```js
router.put("/me", jwtAuthMiddleware, updateMe);
```

---

### 🛡️ Security Practices

* Frontend input is never trusted
* Backend sanitizes allowed fields
* JWT required for private routes
* Passwords are never returned in responses

---

## 📦 File Upload Strategy (Intentional Design Choice)

CareerHub currently uses **URL-based fields** for:

* Resume
* Profile photo
* Company logo

### Why?

* Keeps MVP simple and production-ready
* Avoids premature complexity
* Allows easy future extension

### Planned Iteration

* Resume upload using cloud storage
* Profile photo upload
* Company logo upload

## 🧪 Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/herikarajput3/CareerHub.git
cd CareerHub
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the project

```bash
npm run dev
```

## 📌 Learning Outcomes

This project demonstrates:

* Real-world React architecture
* Secure backend API design
* Role-based UX decisions
* Clean separation of concerns
* Thinking in **iterations**, not just features

## 🔮 Future Improvements

* File uploads with cloud storage
* Email notifications
* Pagination & search optimization
* Admin dashboard
* Deployment with CI/CD

## 👩‍💻 Author

**Herika Rajput**
Frontend & Full-Stack Developer
GitHub: [https://github.com/herikarajput3](https://github.com/herikarajput3)

## ⭐ Final Note

CareerHub is built as a **clean, complete MVP**, focusing on **professional structure, security, and UX**, rather than feature overload.

It reflects how a **real production project** is planned, built, and iterated.
