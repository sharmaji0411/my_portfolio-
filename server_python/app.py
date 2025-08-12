#!/usr/bin/env python3
"""
Flask backend server for Vansh Sharma's portfolio website.
Handles contact form submissions and message retrieval.
"""

import os
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pydantic import BaseModel, ValidationError, field_validator
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='../client/dist', static_url_path='')
CORS(app)

# Ensure static folder path is valid
if not app.static_folder or not os.path.exists(app.static_folder):
    app.static_folder = None

# Pydantic models for request validation
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str
    created_at: Optional[str] = None
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters long')
        return v.strip()
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        import re
        if not v or not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', v):
            raise ValueError('Invalid email address')
        return v.lower().strip()
    
    @field_validator('message')
    @classmethod
    def validate_message(cls, v):
        if not v or len(v.strip()) < 10:
            raise ValueError('Message must be at least 10 characters long')
        return v.strip()

# In-memory storage for development
class MemoryStorage:
    def __init__(self):
        self.messages: List[Dict[str, Any]] = []
    
    def add_message(self, message_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new contact message to storage."""
        message_data['id'] = len(self.messages) + 1
        message_data['created_at'] = datetime.now().isoformat()
        self.messages.append(message_data)
        logger.info(f"New message added: {message_data['name']} - {message_data['email']}")
        return message_data
    
    def get_all_messages(self) -> List[Dict[str, Any]]:
        """Retrieve all contact messages."""
        return sorted(self.messages, key=lambda x: x['created_at'], reverse=True)
    
    def get_message_count(self) -> int:
        """Get total number of messages."""
        return len(self.messages)

# Initialize storage
storage = MemoryStorage()

# Custom request logging middleware
@app.before_request
def log_request():
    if request.path.startswith('/api/'):
        logger.info(f"{request.method} {request.path} - {request.remote_addr}")

@app.after_request
def log_response(response):
    if request.path.startswith('/api/'):
        logger.info(f"Response: {response.status_code} for {request.method} {request.path}")
    return response

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'message': 'Portfolio API is running',
        'timestamp': datetime.now().isoformat(),
        'total_messages': storage.get_message_count()
    })

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions."""
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate using Pydantic
        try:
            message = ContactMessage(**data)
        except ValidationError as e:
            error_messages = []
            for error in e.errors():
                field = error['loc'][0] if error['loc'] else 'unknown'
                error_messages.append(f"{field}: {error['msg']}")
            return jsonify({
                'error': 'Validation failed',
                'details': error_messages
            }), 400
        
        # Store the message
        message_data = message.model_dump()
        saved_message = storage.add_message(message_data)
        
        return jsonify({
            'success': True,
            'message': 'Message sent successfully!',
            'data': {
                'id': saved_message['id'],
                'created_at': saved_message['created_at']
            }
        }), 201
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'Failed to process your message. Please try again.'
        }), 500

@app.route('/api/contact', methods=['GET'])
def get_contacts():
    """Retrieve all contact messages (admin endpoint)."""
    try:
        messages = storage.get_all_messages()
        return jsonify({
            'success': True,
            'count': len(messages),
            'messages': messages
        })
    except Exception as e:
        logger.error(f"Error retrieving messages: {str(e)}")
        return jsonify({
            'error': 'Failed to retrieve messages'
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get portfolio statistics."""
    return jsonify({
        'total_messages': storage.get_message_count(),
        'last_updated': datetime.now().isoformat(),
        'server_status': 'running',
        'backend_type': 'Python Flask'
    })

# Serve React app for all non-API routes
@app.route('/')
def serve_index():
    """Serve the React app index.html."""
    if not app.static_folder:
        return jsonify({
            'error': 'Frontend not built',
            'message': 'Please build the React frontend first'
        }), 404
    try:
        return send_from_directory(app.static_folder, 'index.html')
    except FileNotFoundError:
        return jsonify({
            'error': 'Frontend not built',
            'message': 'Please build the React frontend first'
        }), 404

@app.route('/<path:path>')
def serve_static_files(path):
    """Serve static files or fallback to index.html for client-side routing."""
    if not app.static_folder:
        return jsonify({
            'error': 'Frontend not built',
            'message': 'Please build the React frontend first'
        }), 404
    try:
        return send_from_directory(app.static_folder, path)
    except FileNotFoundError:
        # Fallback to index.html for client-side routing
        return send_from_directory(app.static_folder, 'index.html')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    if request.path.startswith('/api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
    return serve_index()

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    # Configuration
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('NODE_ENV', 'production') == 'development'
    
    logger.info(f"Starting Flask server on port {port}")
    logger.info(f"Environment: {'development' if debug else 'production'}")
    logger.info(f"Static files: {app.static_folder}")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug,
        threaded=True
    )