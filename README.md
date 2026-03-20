# AI Career Coach for Students

An AI-inspired full-stack web application that helps students understand career fit, identify missing skills, improve resume quality, and follow a smart placement roadmap.
An advanced AI-inspired full-stack web application that helps students discover best-fit careers, identify missing skills, improve resume and LinkedIn quality, estimate salary potential, and practice mock interviews.

## Features
## Core Features

- Resume analyzer with ATS-style scoring and actionable feedback
- Resume analyzer with ATS-style scoring, strengths, and improvement suggestions
- Skill gap analyzer against target careers
- AI career recommendations based on interests and current skills
- Personalized 4-month learning roadmap
- AI career recommendations based on interests, skills, and resume signals
- Personalized 4-month roadmap plus a 4-week action plan
- Interview question generator for technical, coding, and HR rounds

## Advanced Features

- Job trend intelligence with growth index and top hiring domains
- Salary prediction for the most suitable role
- LinkedIn profile analyzer using pasted profile summary text
- Project recommendations matched to the recommended role
- AI mock interview answer reviewer with score and feedback
- Placement readiness meter for quick student evaluation

## Tech Stack

- Frontend: React + Vite
- Backend: Python + Flask
- Styling: Custom CSS with responsive dashboard UI
- Styling: Custom responsive CSS dashboard

## Project Structure

- `client/`: React frontend
- `server/`: Flask backend with recommendation and analysis logic
- `client/`: React frontend dashboard
- `server/`: Flask backend APIs and career intelligence logic

## API Endpoints

- `GET /api/health`: backend health check
- `POST /api/analyze`: full career analysis report
- `POST /api/mock-interview`: mock interview answer evaluation

## Run Locally

### Backend
## Demo Flow

1. Enter student profile details and current skills.
2. Choose target interests such as data, software, AI, or analytics.
3. Upload or paste resume text.
4. View ATS score, missing skills, role recommendations, roadmap, and interview questions.
2. Paste resume text and LinkedIn About or profile summary text.
3. Generate the advanced report.
4. Review ATS score, readiness level, salary estimate, trends, roadmap, and projects.
5. Use the mock interview module to review written answers.

## Future Upgrades

- Real PDF or DOCX resume upload and parsing
- Database integration using MySQL or MongoDB
- Authentication and saved student dashboards
- LLM-powered conversational mentoring and mock interview chat
