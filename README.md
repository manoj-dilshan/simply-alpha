
# Simply Alpha — AI-Based Web Application for Stock Market Prediction

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Made with Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Made with Django](https://img.shields.io/badge/Backend-Django-092E20?logo=django)](https://www.djangoproject.com/)

An AI-driven web application that helps novice investors make informed decisions using **time-series forecasting (LSTM)** and **news sentiment analysis (FinBERT)**. It provides clear buy/sell signals, dynamic visualizations, watchlists with alerts, a curated news feed, and a moderated community chat.

> **License:** Apache 2.0. See [`LICENSE`](./LICENSE). If you ship a distribution, include a [`NOTICE`](./NOTICE) file with attributions.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [Testing & Linting](#testing--linting)
- [Docker (Optional)](#docker-optional)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Deploy to Azure](#deploy-to-azure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Security & Disclaimer](#security--disclaimer)
- [License](#license)

---

## Features
- **AI Predictions**: LSTM-based time-series forecasting for selected tickers and timeframes.
- **Sentiment Analysis**: FinBERT-powered sentiment on financial news to refine signals.
- **Visualizations**: Interactive candlestick charts and color-coded signals.
- **Watchlists & Alerts**: Threshold-based email/notification alerts.
- **Newsfeed**: Curated, sentiment-tagged headlines.
- **Community Chat**: Moderated, topic-tagged discussions.

## Architecture
**Frontend (Next.js)**
- React/Next.js, Tailwind CSS, Plotly/D3 for charts
- Auth UI, dashboard, prediction pages, watchlists, newsfeed, chat

**Backend (Django)**
- Django REST API (`/predict`, `/sentiment`, `/watchlist`, etc.)
- Celery workers for batch predictions & scheduled alerts
- PostgreSQL (primary DB), Redis (cache & Celery broker)
- AI layer: TensorFlow/PyTorch (LSTM), Hugging Face Transformers (FinBERT)

**External Services**
- Stock Market Data: Alpha Vantage / Yahoo Finance
- Email: SMTP provider (e.g., SendGrid)

## Repository Structure
```
simply-alpha/
├── ai-stock-app/           # Frontend (Next.js)
├── ai-stock-api/           # Backend (Django)
├── docs/                   # Diagrams & screenshots (optional)
├── .gitignore
├── README.md
├── LICENSE                 # Apache-2.0
└── NOTICE                  # Attributions (Apache recommends when applicable)
```

## Prerequisites
- **Node.js** ≥ 18.x (recommend 20.x)
- **Python** ≥ 3.10
- **PostgreSQL** ≥ 13
- **Redis** ≥ 6
- **Git**
- Optional: **Docker** ≥ 24

## Quick Start
Clone the repo:
```bash
git clone https://github.com/<your-username>/simply-alpha.git
cd simply-alpha
```

### Environment Variables
Create these files (examples below):

**Frontend: `ai-stock-app/.env.local`**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_APP_NAME=simply-alpha
```

**Backend: `ai-stock-api/.env`**
```env
DJANGO_SECRET_KEY=replace-with-a-strong-secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=postgres://user:password@localhost:5432/simplyalpha
REDIS_URL=redis://localhost:6379/0
ALPHA_VANTAGE_KEY=your-alpha-vantage-key
NEWSAPI_KEY=your-newsapi-key
EMAIL_HOST=smtp.sendgrid.net
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=your-sendgrid-key
EMAIL_PORT=587
EMAIL_USE_TLS=True
```

> Tip: Use **Key Vault** in Azure to store secrets, and environment variables or App Settings to pass them to your services.

### Run Locally
**Backend (Django)**
```bash
cd ai-stock-api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
Run Celery (in a separate terminal):
```bash
cd ai-stock-api
source venv/bin/activate
celery -A config worker -l info
celery -A config beat -l info
```

**Frontend (Next.js)**
```bash
cd ai-stock-app
npm install
npm run dev  # http://localhost:3000
```

## Testing & Linting
**Frontend**
```bash
cd ai-stock-app
npm run lint
npm test
```
**Backend**
```bash
cd ai-stock-api
pytest
flake8
black --check .
```

## Docker (Optional)
Example `docker-compose.yml` snippet (place at repo root):
```yaml
version: "3.9"
services:
  api:
    build: ./ai-stock-api
    env_file: ./ai-stock-api/.env
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis
  web:
    build: ./ai-stock-app
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
    ports:
      - "3000:3000"
    depends_on:
      - api
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=simplyalpha
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
  redis:
    image: redis:7
    ports:
      - "6379:6379"
```
Run:
```bash
docker compose up --build
```

## CI/CD with GitHub Actions
Place these workflows under `.github/workflows/`.

**Frontend deploy to Azure App Service** (`frontend-deploy.yml`):
```yaml
name: Frontend CI/CD
on:
  push:
    branches: [ main ]
    paths:
      - 'ai-stock-app/**'
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install & Build
        working-directory: ai-stock-app
        run: |
          npm ci
          npm run build
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: <YOUR_FRONTEND_APP_NAME>
          slot-name: production
          package: ai-stock-app/.next
          publish-profile: ${{ secrets.AZURE_FRONTEND_PUBLISH_PROFILE }}
```

**Backend deploy to Azure App Service** (`backend-deploy.yml`):
```yaml
name: Backend CI/CD
on:
  push:
    branches: [ main ]
    paths:
      - 'ai-stock-api/**'
jobs:
  test-build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      - name: Install deps & tests
        working-directory: ai-stock-api
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pytest
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: <YOUR_BACKEND_APP_NAME>
          slot-name: production
          package: ai-stock-api
          publish-profile: ${{ secrets.AZURE_BACKEND_PUBLISH_PROFILE }}
```

> **Secrets required** in your GitHub repo: `AZURE_FRONTEND_PUBLISH_PROFILE`, `AZURE_BACKEND_PUBLISH_PROFILE` (download from Azure Web App → *Get publish profile*).

## Deploy to Azure
### 1) Provision resources (Portal or CLI)
- **Azure App Service (Linux)**: two apps (frontend & backend)
- **Azure Database for PostgreSQL**
- **Azure Cache for Redis**
- **Azure Key Vault**: store secrets (API keys, DB URL, Django secret)

### 2) Configure App Settings
In each Web App → *Settings → Configuration*:
- Backend: `DATABASE_URL`, `REDIS_URL`, `DJANGO_SECRET_KEY`, `ALPHA_VANTAGE_KEY`, `NEWSAPI_KEY`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`
- Frontend: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_WS_URL`

### 3) Bind Key Vault (optional but recommended)
- Enable **System Assigned Managed Identity** on Web Apps.
- Give **Key Vault Secrets User** role to the identity.
- Reference secrets using `@Microsoft.KeyVault(SecretUri=...)` in App Settings.

### 4) Wire CI/CD
- Add the above **GitHub Actions** workflows.
- Add publish profiles to repo **Secrets**.
- Push to `main` → GitHub Actions will build & deploy.

### 5) Verify
- Open your frontend URL and confirm it can call backend API.
- Check logs in *App Service → Log stream*.

## Screenshots
Place screenshots under `docs/screenshots/` and reference them here:
- `docs/screenshots/home.png`
- `docs/screenshots/prediction.png`
- `docs/screenshots/dashboard.png`

## Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

## Security & Disclaimer
This project is for **educational purposes**. Stock market predictions are inherently uncertain. **Do not** use this application as financial advice. Use at your own risk.

## License
Licensed under the **Apache License, Version 2.0**. See [`LICENSE`](./LICENSE) for details.
