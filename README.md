# JNEC Central Library 📚

[![React](https://img.shields.io/badge/React-19.2.4-brightgreen)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.0-orange)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple)](https://getbootstrap.com/)

## Overview

This is the official web application for the **Central Library of Jawaharlal Nehru Engineering College (JNEC), Aurangabad**, part of **MGM University**. It provides students, research scholars, teaching & non-teaching staff easy access to library services, resources, and information.

**Key Features:**
- Modern, responsive UI with Bootstrap and React Router.
- Comprehensive navigation via Sidebar and Navbar.
- Photo gallery of library facilities.
- Access to E-Resources (EBSCO, IEEE Xplore, SpringerLink, SCOPUS, etc.).
- Feedback form for library services (staff, ambiance, books).
- FAQ section for membership, loans, etc.
- Pages for Journals (new arrivals), Question Papers, ULFS, About, and more.

## Features

| Feature | Description | Route |
|---------|-------------|-------|
| Home | Slider, marquee, main content with sidebar | `/` |
| About | Library hours, advisory committee | `/about` |
| E-Resources | Databases (EBSCO, IEEE, Springer), E-Books, E-Journals, Open Access | `/e-resources` |
| FAQ | Membership, inter-library loans (DELNET/INFLIBNET) | `/faq` |
| Feedback | Detailed form (staff ratings, ambiance, books) | `/feedback` |
| Photo Gallery | Library images (reading hall, stacks, entrance) | `/gallery` |
| Journals | New arrivals listing | `/journals` |
| Question Papers | Access to papers | `/question-papers` |
| ULFS | Library services page | `/ulfs` |
| **Lib Rules** | Library rules and regulations | **`/lib-rules`** |
| **Contact** | Library address, contact details, map | **`/contact`** |

## Tech Stack
- **Frontend**: React 19+, React Router 7+, Vite 8.0, Bootstrap 5.3+
- **Backend**: Node.js, Express 4.18+
- **Database**: MongoDB + Mongoose 8.0+
- **UI**: React Bootstrap, Bootstrap Icons, React Icons
- **CORS**: Enabled for frontend-backend communication
- **Linting**: ESLint 9+
- **Styling**: Custom CSS (App.css, library-layout.css)

## Architecture
```
      React Frontend (Main App)           React Frontend (Admin Panel)
                 (Port 5173)                   (Port 5174)
                       ↘                           ↙
                           Express.js API (Backend)
                                 (Port 5000)
                                      ↓
                             MongoDB (Database)
                               (Local: 27017)
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas cloud)

### Installation
```bash
git clone https://github.com/acecoder-0/JNEC-Library-Official-Page-Mongodb
cd JNEC-Library-Official-Page-Mongodb
npm install
cd admin
npm install
```

### Tri-Terminal Setup

To run the complete system correctly, you need three separate terminals running simultaneously.

1. **Backend Server** (Terminal 1)
```bash
node server.js
```
*Starts the Express API serving MongoDB data and locally uploaded PDFs on port 5000.*

2. **Main Library Website** (Terminal 2)
```bash
npm run dev
```
*Starts the Vite React server on port 5173. Visit `http://localhost:5173` to browse the library.*

3. **Admin Panel** (Terminal 3)
```bash
cd admin
npm run dev
```
*Starts the secure standalone control panel on port 5174. Visit `http://localhost:5174` to manage dynamic data!*

## Project Structure
```
JNEC-Library-Official-Page-Mongodb/
├── admin/              # Standalone Admin Panel React App (Port 5174)
├── src/                # Main Library React App (Port 5173)
├── public/             # Static Assets & Images
├── models/             # Mongoose DB Schemas
├── routes/             # Express API Endpoints
├── uploads/            # PDFs uploaded from Admin Panel (Locally stored)
├── server.js           # Shared Backend Router (Port 5000)
└── package.json        # Dependencies
```

## Database Features & APIs

The system features robust APIs connected natively to MongoDB to manage the website completely dynamically from the admin panel:

- **Marquee** (`/api/marquee`): Manages the top scrolling announcement ribbon.
- **News** (`/api/news`): Controls the latest news feed sidebar snippet.
- **Feedbacks** (`/api/feedback`): Captures library ratings securely for admin review.
- **Ask a Librarian** (`/api/librarian`): A dual-sided query inbox for students resolving their answers.
- **PDF Assets Manager**: Includes full CRUD operations utilizing `multer` native storage for:
  - Books (`/api/books`)
  - Question Papers (`/api/papers`)
  - Subscribed Journals (`/api/journals`)
- **Advisory & Staff** (`/api/committee`, `/api/staff`): Dynamic personnel lists mapped identically to the UI tables.

> **Important**: PDFs are stored locally in the `/uploads/` folder natively.

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Roadmap
- ✅ MongoDB integration with feedback storage
- ✅ Real-time feedback submission (POST API)
- ✅ Dashboard for librarians to view feedback analytics
- ✅ Native Admin Panel for uploading dynamic assets
- ✅ Complete API refactoring for dynamic UI layout updates

## License
[MIT License](LICENSE)

## Contact
**MGM's JNEC Central Library**  
Jawaharlal Nehru Engineering College, Aurangabad  
© Copyright MGM's JNEC

