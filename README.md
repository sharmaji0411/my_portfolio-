# Vansh Sharma - Data Science Portfolio

A modern, interactive portfolio website showcasing data science expertise, projects, and achievements. Features stunning animations, interactive visualizations, and a professional presentation of skills and experience.

## 🚀 Features

- **Interactive Animations**: Smooth transitions, floating particles, and engaging hover effects
- **Data Science Visualizations**: Real-time charts, ML pipeline flows, and interactive metrics
- **Dual Backend Support**: Choose between Node.js (TypeScript) or Python (Flask)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching with smooth transitions
- **Contact Form**: Working contact form with validation and message storage
- **Performance Optimized**: Fast loading with modern web technologies

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** component library
- **Vite** for development and building

### Backend Options
- **Option 1**: Node.js + Express + TypeScript
- **Option 2**: Python + Flask + Pydantic

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js 18+** and **npm** installed
- **Python 3.11+** (if using Python backend)
- **Git** for cloning the repository

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Install Dependencies

#### For Node.js Backend (Recommended)
```bash
# Install all Node.js dependencies
npm install
```

#### For Python Backend (Alternative)
```bash
# Install Node.js dependencies (needed for frontend)
npm install

# Install Python dependencies
pip install flask flask-cors pydantic python-dotenv typing-extensions
# OR using the requirements file
pip install -r server_python/requirements.txt
```

### 3. Build the Frontend (Production)

```bash
# Build the React frontend for production
npm run build
```

## 🚀 Running the Application

### Option 1: Node.js Backend (Default)

```bash
# Start the development server
npm run dev
```

The application will be available at: `http://localhost:5000`

### Option 2: Python Backend

```bash
# Start the Python Flask server
python3 run_python.py
```

The application will be available at: `http://localhost:5000`

## 🌐 Development vs Production

### Development Mode
- Hot reload enabled
- Debug logging
- Source maps available
- Dev server with proxy

### Production Mode
```bash
# Build for production
npm run build

# Start Node.js production server
npm run start

# OR start Python production server
NODE_ENV=production python3 run_python.py
```

## 📁 Project Structure

```
portfolio-website/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   └── main.tsx          # App entry point
│   └── index.html            # HTML template
├── server/                    # Node.js backend
│   ├── index.ts              # Express server
│   ├── routes.ts             # API routes
│   └── storage.ts            # Data storage
├── server_python/             # Python backend
│   ├── app.py                # Flask server
│   ├── storage.py            # Data storage
│   └── requirements.txt      # Python dependencies
├── shared/                    # Shared types/schemas
│   └── schema.ts             # Data models
├── run_python.py             # Python server launcher
├── package.json              # Node.js dependencies
├── tailwind.config.ts        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🔌 API Endpoints

Both backends provide identical REST API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | Get all messages (admin) |
| `/api/stats` | GET | Portfolio statistics |

### Example API Usage

```bash
# Health check
curl http://localhost:5000/api/health

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great portfolio!"
  }'
```

## 🎨 Customization

### Changing Colors
Edit `client/src/index.css` to modify the color scheme:

```css
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* Add your custom colors */
}
```

### Adding New Sections
1. Create a new component in `client/src/components/`
2. Add it to `client/src/pages/home.tsx`
3. Update navigation if needed

### Modifying Backend
- **Node.js**: Edit files in `server/` directory
- **Python**: Edit files in `server_python/` directory

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=3000 npm run dev
PORT=3000 python3 run_python.py
```

#### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install

# Clear Python cache
pip cache purge
pip install --force-reinstall -r server_python/requirements.txt
```

#### Build Issues
```bash
# Clean build
rm -rf client/dist
npm run build
```

### Performance Issues
- Make sure you're running in production mode for better performance
- Check browser dev tools for any console errors
- Ensure all dependencies are up to date

## 🚢 Deployment

### Replit (Recommended)
1. Import this repository to Replit
2. Run `npm install` in the shell
3. Start with `npm run dev` or `python3 run_python.py`

### Vercel (Node.js only)
```bash
npm install -g vercel
vercel
```

### Heroku (Python)
```bash
# Add these files for Heroku deployment
echo "web: python3 run_python.py" > Procfile
echo "python-3.11.*" > runtime.txt

git add .
git commit -m "Deploy to Heroku"
heroku create your-app-name
git push heroku main
```

### Railway
1. Connect your GitHub repository
2. Railway will auto-detect and deploy

## 📝 Environment Variables

Create a `.env` file for environment-specific settings:

```env
# Server configuration
PORT=5000
NODE_ENV=development

# Database (if using)
DATABASE_URL=your_database_url

# API Keys (if needed)
EMAIL_API_KEY=your_email_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vansh Sharma**
- Email: [your-email@example.com]
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Flask](https://flask.palletsprojects.com/) for Python backend
- [Express.js](https://expressjs.com/) for Node.js backend

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the API documentation above
3. Check browser console for errors
4. Ensure all dependencies are installed correctly

For additional help, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**