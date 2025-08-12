# 🚀 Quick Start Guide

Get the portfolio running in **under 2 minutes**!

## Prerequisites
- Node.js 18+ installed
- Python 3.11+ (optional, for Python backend)

## Fastest Setup (Node.js Backend)

```bash
# 1. Clone and navigate
git clone <repository-url>
cd portfolio-website

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

**Done!** Open `http://localhost:5000` in your browser.

## Alternative Setup (Python Backend)

```bash
# 1-2. Same as above
npm install

# 3. Install Python dependencies
pip install flask flask-cors pydantic python-dotenv

# 4. Start Python server
python3 run_python.py
```

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Node.js server |
| `python3 run_python.py` | Start Python server |
| `npm run build` | Build for production |

## Troubleshooting

**Port 5000 busy?**
```bash
PORT=3000 npm run dev
```

**Dependencies not installing?**
```bash
npm cache clean --force
npm install
```

That's it! Your portfolio is now running locally. 🎉