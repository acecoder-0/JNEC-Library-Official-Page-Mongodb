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
React Frontend (Vite)
       ↓
Express.js API (Node.js)
       ↓
MongoDB (Database)
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas cloud)

### Installation
```bash
git clone https://github.com/saiprasadzampalwad/LIBRARY-JNEC-REACT
cd LIBRARY-JNEC-REACT
npm install
```

### Backend Setup
1. **Start MongoDB**: Ensure MongoDB is running on `mongodb://127.0.0.1:27017`
   - Or update connection string in `config/mongo.js` for MongoDB Atlas

2. **Run Backend Server** (Terminal 1):
```bash
node server.js
```
Output: `Server running on port 5000 🚀`

### Frontend Development (Terminal 2)
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Testing Feedback Form
1. Open `http://localhost:5173/feedback`
2. Fill and submit the form
3. Check MongoDB Compass to verify data in `jnec_library.feedbacks` collection

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure
```
LIBRARY-JNEC-REACT/
├── src/
│   ├── components/     # Header, Footer, NavbarComp, Sidebar, Slider, etc.
│   ├── pages/          # AboutPage, EResourcesPage, FAQPage, FeedbackPage, etc.
│   ├── App.jsx         # Routing & Layout
│   ├── main.jsx        # Entry point
│   └── App.css         # Global styles
├── public/             # Images (logos, gallery photos)
├── config/
│   └── mongo.js        # MongoDB connection configuration
├── models/
│   └── Feedback.js     # Feedback schema
├── routes/
│   └── feedbackRoutes.js  # API endpoints
├── server.js           # Express server entry point
├── package.json        # Dependencies
└── README.md           # This file
```

## Screenshots
*(Suggest adding screenshots of home, e-resources, gallery)*
- Home: ![Home](public/images/newslide.jpg)
- Gallery: Library photos available at `/gallery`

## Database

### MongoDB Collections

#### Feedback Collection
The feedback form stores user responses with the following fields:

```javascript
{
  _id: ObjectId,
  name: String,
  department: String,
  regNo: String,
  section: String,
  purpose: String,
  frequency: String,
  staffBehavior: String,
  staffKnowledge: String,
  staffEfficiency: String,
  staffEffectiveness: String,
  envCleanliness: String,
  envLighting: String,
  envEquipment: String,
  opac: String,
  internet: String,
  circulation: String,
  reference: String,
  magazine: String,
  readingHall: String,
  sufficiency: String,
  condition: String,
  suggestions: String,
  createdAt: Date
}
```

### API Endpoints

#### Save Feedback
- **Endpoint**: `POST /api/feedback`
- **Headers**: `Content-Type: application/json`
- **Body**: Feedback object
- **Response**: `{ success: true, message: "Feedback saved ✅" }`

### MongoDB Compass
View and manage data locally:
1. Download [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Connect to `mongodb://127.0.0.1:27017`
3. Navigate to `jnec_library` database → `feedbacks` collection

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Roadmap
- ✅ MongoDB integration with feedback storage
- ✅ Real-time feedback submission (POST API)
- Add authentication/login for members
- Deploy to production (Vercel/Netlify)
- Add search for journals/question papers
- Mobile app (React Native?)
- Dashboard for librarians to view feedback analytics

## License
[MIT License](LICENSE)

## Contact
**MGM's JNEC Central Library**  
Jawaharlal Nehru Engineering College, Aurangabad  
© Copyright MGM's JNEC

