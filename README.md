# AI-Powered SEO Optimization Platform

## Overview

This project is a fully automated SEO optimization platform that uses AI and real-time trend data to analyze, generate, and update SEO metadata in web applications.

The system eliminates manual SEO work by automatically analyzing website content, identifying missing or weak SEO elements, generating optimized metadata, and updating the source code directly in the GitHub repository.

---

## Key Capabilities

- Automated SEO analysis of web pages
- Detection of missing SEO elements (title, meta description, headings)
- Real-time keyword suggestions using Google Trends
- AI-driven SEO tag generation
- Automatic code updates in GitHub repositories
- Continuous optimization through scheduled updates
- Microservices-based scalable architecture

---

## Technology Stack

### Backend Services
- Node.js with Express (API Gateway and SEO Fix Service)
- Python with Flask (Analyze and Trends Services)

### AI and Data Processing
- LangChain and LangGraph for intelligent processing
- Pinecone for vector storage and context management

### External Integrations
- GitHub (repository cloning, committing, pushing)
- Google Trends (keyword insights)

---

## System Architecture

The platform is built using a microservices architecture where each service performs a specific role.

1. API Gateway handles incoming requests and routes them to appropriate services
2. Analyze Service evaluates existing SEO structure of a webpage
3. Trends Service fetches trending keywords related to a topic
4. SEO Fix Service updates metadata inside the repository
5. AI layer processes and generates optimized SEO data

---

## Services Description

### API Gateway (Port 3001)

The API Gateway acts as the central entry point for all client requests. It routes requests to internal services.

Available routes:
- /analyze
- /trends
- /fix
- /api/seo

---

### Analyze Service (Flask - Port 5001)

This service analyzes a given webpage and extracts SEO-related elements.

#### Endpoint
POST /analyze

#### Request Body
{
  "url": "https://example.com"
}

#### Functionality
- Fetches HTML content of the page
- Extracts title tag
- Extracts meta description
- Extracts first H1 tag
- Identifies missing SEO elements

#### Response Example
{
  "url": "https://example.com",
  "title": "Example Title",
  "meta": "Example description",
  "h1": "Main heading",
  "missing": {
    "title": false,
    "meta": false,
    "h1": false
  }
}

---

### Trends Service (Flask - Port 5002)

This service retrieves trending topics related to a keyword using Google Trends.

#### Endpoint
POST /trends

#### Request Body
{
  "keyword": "AI SEO"
}

#### Functionality
- Sends request to Google Trends API
- Parses response data
- Returns top trending related topics

#### Response Example
{
  "keyword": "AI SEO",
  "trends": [
    {
      "query": "AI marketing",
      "type": "Topic"
    }
  ]
}

---

### SEO Fix Service (Node.js - Port 3000)

This service updates SEO metadata in a GitHub repository.

#### Endpoint
POST /fix-seo

#### Request Body
{
  "repoURL": "https://github.com/user/repo",
  "token": "your_token"
}

#### Functionality
- Clones the repository to a temporary directory
- Reads SEO data from a configuration file
- Updates title, meta description, and keywords in HTML files
- Commits changes
- Pushes updates back to GitHub

---

## Workflow

1. User provides a GitHub repository URL and authentication token
2. The system analyzes the website using the Analyze Service
3. Trends Service retrieves relevant trending keywords
4. AI processes the data and generates optimized SEO tags
5. SEO Fix Service updates the repository files
6. Changes are committed and pushed automatically
7. The system can repeat this process periodically (e.g., every 7 days)

---

## Project Structure

project-root/

- gateway/
  - server.js

- services/
  - analyze/
    - app.py
  - trends/
    - app.py
  - seo-fix/
    - server.js

- routes/
  - analyze.js
  - trends.js
  - fix.js
  - seoRoutes.js

- seo.json
- README.md

---

## Setup Instructions

### Prerequisites

- Node.js installed
- Python installed
- Git installed

---

### Step 1: Clone the Repository

Run in terminal:

git clone <repository-url>
cd project-root

---

### Step 2: Install Node Dependencies

Run in project root:

npm install

---

### Step 3: Run API Gateway

Run in terminal:

node gateway/server.js

---

### Step 4: Run Analyze Service

Run in terminal:

cd services/analyze
python app.py

---

### Step 5: Run Trends Service

Run in terminal:

cd services/trends
python app.py

---

### Step 6: Run SEO Fix Service

Run in terminal:

cd services/seo-fix
node server.js

---

## Configuration Notes

- Ensure seo.json file exists and contains SEO data
- GitHub token must have repository access permissions
- Repository must contain a public/index.html file for updates

---

## Future Enhancements

- Add frontend dashboard for monitoring
- Support multi-page SEO updates
- Improve AI keyword ranking logic
- Add cron-based scheduling for automation
- Extend support for server-side rendered frameworks

---

## Author

Rai Nasir Sultan
