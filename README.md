# Resume Builder

A professional, AI-powered resume building platform that allows users to create, manage, and analyze resumes with high-fidelity previews and intelligent feedback.

## System Architecture

```mermaid
graph TD
    User([User Browser])
    Frontend[React Frontend - Vite]
    Backend[Express API Server]
    Database[(MongoDB)]
    Gemini[Google Gemini AI]
    Storage[Local/Cloud Storage]

    User <-->|HTTPS/JSON| Frontend
    Frontend <-->|REST API / JWT| Backend
    Backend <-->|Mongoose| Database
    Backend <-->|API SDK| Gemini
    Backend <-->|FS/Multer| Storage
```

## Application Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant AI as Gemini AI

    U->>F: Upload PDF/DOCX
    F->>B: POST /api/resumes/upload
    B->>AI: Send document text for analysis
    AI-->>B: Extracted JSON data
    B-->>F: Return parsed resume data
    F->>U: Show populated Resume Builder
    U->>F: Select Template & Accent Color
    F->>F: Render High-Fidelity Preview
    U->>F: Click Analyze
    F->>B: POST /api/analyze
    B->>AI: Request ATS score & feedback
    AI-->>B: Numerical score & suggestions
    B-->>F: Return analysis report
    F->>U: Display ATS Match Score
```

## Features

### Intelligent Parsing
- Automatic extraction of contact info, experience, and skills from uploaded documents.
- Powered by Google Gemini Pro for high-accuracy semantic understanding.

### High-Fidelity Previews
- Real-time rendering of resume templates.
- Dynamic color contrast adjustment based on accent color brightness.
- Live thumbnails on dashboard for quick recognition.

### Advanced Customization
- Multiple professional templates (Modern, Classic, Bento Box, etc.).
- Custom font sizes, heading sizes, and section spacing.
- Dark mode support with adaptive text rendering.

### AI Analysis
- In-depth ATS matching and scoring.
- Specific, actionable suggestions for improving resume content.
- Targeted analysis based on user-provided job descriptions.

## Technology Stack

### Frontend
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.0-CA4245?style=flat-square&logo=react-router&logoColor=white)

- React 19 (Vite)
- Tailwind CSS 4
- React Router 7
- Google OAuth 2.0
- Lucide React Icons

### Backend
![NodeJS](https://img.shields.io/badge/Node.js-20.0-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-Pro-8E75B2?style=flat-square&logo=google-gemini&logoColor=white)

- Node.js & Express
- MongoDB & Mongoose
- Google Generative AI (Gemini API)
- JWT Authentication
- Multer for file processing

## Project Structure

```text
.
├── client/                 # React frontend application
│   ├── src/
│   │   ├── api/            # Axios instance and API calls
│   │   ├── assets/         # Templates and static assets
│   │   ├── components/     # UI Components (Builder, Dashboard, Home)
│   │   ├── context/        # Auth and Data contexts
│   │   └── pages/          # Main application views
├── server/                 # Express backend application
│   ├── config/             # Database and API configurations
│   ├── controllers/        # Request handling logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   └── uploads/            # Temporary storage for processed files
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Cloud Gemini API Key
- Google OAuth Client ID

### Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   # Root
   cd client && npm install
   cd ../server && npm install
   ```

3. Configure environment variables:
   - Create `client/.env`:
     ```text
     VITE_BACKEND=http://localhost:5000/api
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
     ```
   - Create `server/.env`:
     ```text
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_secret
     GEMINI_API_KEY=your_gemini_key
     ```

4. Run the application:
   ```bash
   # In separate terminals
   cd client && npm run dev
   cd server && npm run dev
   ```

## Development Standards
- Maintain semantic HTML structure.
- Use the standard contrast utility for all template text colors.
- Follow the established adapter pattern for template data mapping.
