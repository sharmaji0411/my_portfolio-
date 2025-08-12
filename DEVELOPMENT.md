# 🛠️ Development Guide

## Development Environment Setup

### Required Tools
- **Node.js 18+** with npm
- **Python 3.11+** (for Python backend)
- **Git**
- **Code Editor** (VS Code recommended)

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Python (if using Python backend)
- Prettier - Code formatter

## Project Architecture

### Frontend (React + TypeScript)
```
client/src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── hero-section.tsx # Landing section
│   ├── about-section.tsx # About me section
│   └── ...              # Other sections
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and configurations
└── main.tsx            # Application entry point
```

### Backend Options

#### Node.js Backend
```
server/
├── index.ts            # Express server setup
├── routes.ts           # API route handlers
├── storage.ts          # Data storage interface
└── vite.ts            # Vite integration
```

#### Python Backend
```
server_python/
├── app.py             # Flask application
├── storage.py         # Storage implementations
└── requirements.txt   # Python dependencies
```

## Development Workflow

### 1. Frontend Development
```bash
# Start with hot reload
npm run dev

# The Vite dev server will:
# - Serve React app on http://localhost:5000
# - Proxy API requests to backend
# - Hot reload on file changes
# - Show runtime errors in browser
```

### 2. Backend Development

#### Node.js
- Edit files in `server/` directory
- Server auto-restarts on changes (nodemon)
- TypeScript compilation happens automatically

#### Python
- Edit files in `server_python/` directory
- Restart server manually: `python3 run_python.py`
- Flask debug mode enabled in development

### 3. Database Development
Currently using in-memory storage for development. To add persistent storage:

#### Node.js + PostgreSQL
```bash
# Already configured with Drizzle ORM
npm run db:push  # Push schema changes
```

#### Python + SQLAlchemy
```python
# Add to server_python/models.py
from sqlalchemy import create_engine, Column, Integer, String
# Define your models
```

## Adding New Features

### 1. New Frontend Component
```bash
# Create component file
touch client/src/components/new-section.tsx
```

```tsx
// client/src/components/new-section.tsx
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function NewSection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  
  return (
    <section ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Your content */}
      </motion.div>
    </section>
  );
}
```

### 2. New API Endpoint

#### Node.js
```typescript
// server/routes.ts
app.get('/api/new-endpoint', async (req, res) => {
  try {
    const data = await storage.getData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### Python
```python
# server_python/app.py
@app.route('/api/new-endpoint', methods=['GET'])
def new_endpoint():
    try:
        data = storage.get_data()
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

### 3. New Animation
```tsx
// Using Framer Motion
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ 
    type: "spring",
    stiffness: 260,
    damping: 20 
  }}
>
  Content
</motion.div>
```

## Styling Guidelines

### Tailwind CSS Classes
```tsx
// Consistent spacing
className="py-20 px-4"          // Section padding
className="mb-8"                // Component margins
className="space-y-6"           // Child spacing

// Colors (follow design system)
className="text-gray-900 dark:text-white"           // Text
className="bg-white dark:bg-slate-800"              // Backgrounds
className="border-gray-200 dark:border-slate-700"   // Borders

// Responsive design
className="grid md:grid-cols-2 lg:grid-cols-3"      // Responsive grids
className="text-base md:text-lg lg:text-xl"         // Responsive text
```

### Custom CSS Variables
```css
/* client/src/index.css */
:root {
  --section-padding: 5rem 0;
  --card-radius: 1rem;
  --transition-speed: 0.3s;
}

.dark {
  --primary: 210 40% 98%;
  --background: 222.2 84% 4.9%;
}
```

## Performance Optimization

### 1. Bundle Analysis
```bash
npm run build
# Check dist/ folder size
```

### 2. Image Optimization
- Use WebP format when possible
- Implement lazy loading for images
- Use appropriate image sizes

### 3. Code Splitting
```tsx
// Lazy load components
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Testing

### Frontend Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Create test file
# client/src/components/__tests__/HeroSection.test.tsx
```

### Backend Testing
```bash
# Node.js testing
npm install --save-dev supertest jest @types/jest

# Python testing
pip install pytest pytest-flask
```

## Debugging

### Frontend Debugging
- Use React DevTools browser extension
- Console.log in components
- Inspect network requests in DevTools

### Backend Debugging

#### Node.js
```typescript
// Add debug logging
console.log('Debug info:', data);
```

#### Python
```python
# Add debug logging
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.debug('Debug info: %s', data)
```

## Common Development Tasks

### Update Dependencies
```bash
# Node.js
npm update
npm audit fix

# Python
pip install --upgrade -r server_python/requirements.txt
```

### Format Code
```bash
# Install Prettier
npm install --save-dev prettier

# Format all files
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"
```

### Environment Variables
```bash
# Create .env file
echo "NODE_ENV=development" > .env
echo "PORT=5000" >> .env
echo "DATABASE_URL=your_database_url" >> .env
```

## Deployment Preparation

### 1. Build Optimization
```bash
npm run build
# Check build output in dist/
```

### 2. Environment Configuration
- Set NODE_ENV=production
- Configure proper database URLs
- Set up environment variables

### 3. Performance Testing
- Test with production build
- Check Core Web Vitals
- Verify mobile responsiveness

---

Happy coding! 🚀