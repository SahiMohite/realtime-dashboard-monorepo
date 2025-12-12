# Real-Time Stock Dashboard

A real-time stock data streaming application using WebSocket.

## Project Structure
- `api-server/` - Node.js WebSocket server
- `client/` - React frontend
- `data-worker/` - Python data generator

## Setup Instructions

### 1. API Server
```bash
cd api-server
npm install
cp .env.example .env  # Configure your environment
npm start
```

### 2. Data Worker
```bash
cd data-worker
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python worker.py
```

### 3. Client
```bash
cd client
npm install
cp .env.example .env
npm start
```

## Environment Variables
See `.env.example` files in each directory for required configuration.