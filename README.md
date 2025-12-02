
# CitaYa – MERN Scheduling Platform

CitaYa is a full-stack MERN application that enables two types of users—**Cliente** and **Pro**—to coordinate appointments through role-specific dashboards and integrated calendars. Users register, log in, search each other by username, and create bookings in a secure, mobile-first environment.

Authentication uses access/refresh JWTs stored in HTTP-only cookies. The backend enforces protected routes, bcrypt hashing, token verification, and environment-based configuration.

---

## Features

* Two user roles with distinct dashboards (Cliente / Pro)
* Appointment scheduling using FullCalendar
* Username-based scheduling
* Login and registration
* JWT authentication with access + refresh tokens
* HTTP-only cookies and protected routes
* Mobile-first responsive UI
* Modern React architecture (Vite + functional components)
* Date/time management with date-fns
* International phone input support
* Error handling and secure API design

---

## Access the App

**Deployed Application:**
[https://www.citayamx.com](citayamx.com)

No cloning or local setup required for reviewers.

---

## Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* FullCalendar (core, daygrid, timegrid, list, interaction, React wrapper)
* react-modal
* react-phone-input-2 / libphonenumber-js
* react-datepicker
* date-fns
* AOS for animations

### Backend

* Node.js / Express
* MongoDB / Mongoose
* bcrypt
* jsonwebtoken
* cookie-parser
* cors
* dotenv
* nodemon (dev)

---

## How It Works

1. User registers as **Cliente** or **Pro**
2. Logs in → receives access and refresh tokens via secure cookies
3. Dashboard loads user-role-specific calendar and functionality
4. User searches the other party by **username**
5. Client or Pro books an appointment
6. Events display immediately inside the calendar view

---

## Notes

* Cookies are configured with HTTP-only and SameSite protections (Secure in production).
* The backend never exposes sensitive data in responses.
* Environment variables are used for secrets and DB connections.
* The current version is a functional demo with the core workflows complete.

---

## Future Improvements

* Stricter input validation and sanitization
* Rate limiting on authentication routes
* Refresh token rotation
* Email/SMS verification
* Notification system (email/SMS) for upcoming appointments
* Enhanced Pro/Cliente linking beyond username-only search

---

CitaYa is an active project focused on real-world scheduling flows, role-based UI, and secure authentication. The core system is fully functional and serves as the foundation for upcoming features.
