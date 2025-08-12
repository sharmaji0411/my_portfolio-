#!/usr/bin/env python3
"""
Main entry point for the Python Flask server.
"""

import os
import sys
from pathlib import Path

# Add the server_python directory to the Python path
server_path = Path(__file__).parent / 'server_python'
sys.path.insert(0, str(server_path))

if __name__ == '__main__':
    # Import and run the Flask app
    try:
        from app import app
    except ImportError as e:
        print(f"Error importing Flask app: {e}")
        print("Make sure all dependencies are installed: pip install flask flask-cors pydantic python-dotenv")
        sys.exit(1)
    
    # Set environment variables
    os.environ.setdefault('NODE_ENV', 'development')
    
    # Configuration
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('NODE_ENV') == 'development'
    
    print(f"🐍 Starting Python Flask server on port {port}")
    print(f"Environment: {'development' if debug else 'production'}")
    print(f"Access the portfolio at: http://localhost:{port}")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug,
        threaded=True
    )