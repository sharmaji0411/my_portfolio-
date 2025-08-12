# Backend Options for Vansh Sharma's Portfolio

This portfolio supports both **Node.js (TypeScript)** and **Python (Flask)** backends. Both provide identical functionality and API endpoints.

## Quick Start

### Option 1: Node.js Backend (Default)
```bash
npm run dev
```

### Option 2: Python Backend
```bash
python3 run_python.py
```

## Backend Comparison

| Feature | Node.js (TypeScript) | Python (Flask) |
|---------|---------------------|----------------|
| **Runtime** | Node.js + Express | Python + Flask |
| **Language** | TypeScript | Python 3.11+ |
| **Performance** | High (V8 Engine) | Good (Python) |
| **Development** | Hot reload via Vite | Flask debug mode |
| **Dependencies** | npm packages | pip packages |
| **Deployment** | Replit, Vercel, Netlify | Replit, Heroku, Railway |

## API Endpoints

Both backends provide identical REST API endpoints:

### Health Check
```http
GET /api/health
```

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Your message here"
}
```

### Get Messages (Admin)
```http
GET /api/contact
```

### Portfolio Stats
```http
GET /api/stats
```

## File Structure

```
project/
├── server/                 # Node.js backend
│   ├── index.ts           # Express server
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage
│   └── vite.ts            # Vite integration
├── server_python/         # Python backend  
│   ├── app.py             # Flask server
│   ├── storage.py         # Data storage
│   └── requirements.txt   # Python dependencies
├── run_python.py          # Python server launcher
└── client/                # React frontend
```

## Development Features

### Node.js Backend
- ✅ Hot module replacement via Vite
- ✅ TypeScript with strict typing
- ✅ Integrated development server
- ✅ Built-in static file serving
- ✅ Session management ready

### Python Backend  
- ✅ Flask development server
- ✅ Pydantic data validation
- ✅ CORS support
- ✅ Request/response logging
- ✅ Error handling
- ✅ Memory/file storage options

## Storage Options

Both backends support multiple storage methods:

1. **Memory Storage** (Development)
   - Fast in-memory data storage
   - Data resets on server restart
   - Includes sample data

2. **File Storage** (Development/Production)
   - Persistent JSON file storage  
   - Automatic file creation
   - Data survives server restarts

3. **Database Storage** (Production Ready)
   - PostgreSQL via Drizzle ORM (Node.js)
   - SQLAlchemy ready (Python)

## Switching Backends

To switch from Node.js to Python backend:

1. **Stop the current server** (Ctrl+C)

2. **Start Python server:**
   ```bash
   python3 run_python.py
   ```

3. **Verify the switch:**
   ```bash
   curl http://localhost:5000/api/health
   ```

The frontend will automatically work with either backend since they provide identical APIs.

## Production Deployment

### Node.js Deployment
```bash
npm run build
npm run start
```

### Python Deployment
```bash
# Install dependencies
pip install -r server_python/requirements.txt

# Run production server
python3 run_python.py
```

## Environment Variables

Both backends support:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Validation & Error Handling

### Node.js
- Zod schema validation
- TypeScript compile-time checks
- Express error middleware

### Python
- Pydantic model validation
- Type hints with mypy support
- Flask error handlers

## Performance Notes

- **Node.js**: Better for high-concurrency scenarios
- **Python**: Better for data science integrations
- **Both**: Suitable for portfolio websites with moderate traffic

Choose the backend that best fits your deployment environment and team expertise!