"""
Storage abstraction layer for the portfolio backend.
Supports both in-memory storage (development) and database storage (production).
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from datetime import datetime
import json
import os


class StorageInterface(ABC):
    """Abstract base class for storage implementations."""
    
    @abstractmethod
    def add_message(self, message_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new contact message."""
        pass
    
    @abstractmethod
    def get_all_messages(self) -> List[Dict[str, Any]]:
        """Retrieve all contact messages."""
        pass
    
    @abstractmethod
    def get_message_count(self) -> int:
        """Get total number of messages."""
        pass


class MemoryStorage(StorageInterface):
    """In-memory storage implementation for development."""
    
    def __init__(self):
        self.messages: List[Dict[str, Any]] = []
        self._load_sample_data()
    
    def _load_sample_data(self):
        """Load some sample data for development."""
        sample_messages = [
            {
                'id': 1,
                'name': 'John Doe',
                'email': 'john@example.com',
                'message': 'Great portfolio! I would like to discuss a data science project.',
                'created_at': '2024-01-15T10:30:00'
            },
            {
                'id': 2,
                'name': 'Sarah Smith',
                'email': 'sarah@company.com',
                'message': 'Impressive GIS work. Are you available for consulting?',
                'created_at': '2024-01-20T14:45:00'
            }
        ]
        self.messages.extend(sample_messages)
    
    def add_message(self, message_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new contact message to memory."""
        message_data['id'] = len(self.messages) + 1
        message_data['created_at'] = datetime.now().isoformat()
        self.messages.append(message_data.copy())
        return message_data
    
    def get_all_messages(self) -> List[Dict[str, Any]]:
        """Retrieve all contact messages."""
        return sorted(self.messages, key=lambda x: x['created_at'], reverse=True)
    
    def get_message_count(self) -> int:
        """Get total number of messages."""
        return len(self.messages)


class FileStorage(StorageInterface):
    """File-based storage implementation."""
    
    def __init__(self, file_path: str = 'messages.json'):
        self.file_path = file_path
        self.messages = self._load_from_file()
    
    def _load_from_file(self) -> List[Dict[str, Any]]:
        """Load messages from JSON file."""
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError):
                return []
        return []
    
    def _save_to_file(self):
        """Save messages to JSON file."""
        try:
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(self.messages, f, indent=2, ensure_ascii=False)
        except IOError as e:
            raise Exception(f"Failed to save messages: {str(e)}")
    
    def add_message(self, message_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new contact message to file."""
        message_data['id'] = len(self.messages) + 1
        message_data['created_at'] = datetime.now().isoformat()
        self.messages.append(message_data.copy())
        self._save_to_file()
        return message_data
    
    def get_all_messages(self) -> List[Dict[str, Any]]:
        """Retrieve all contact messages."""
        return sorted(self.messages, key=lambda x: x['created_at'], reverse=True)
    
    def get_message_count(self) -> int:
        """Get total number of messages."""
        return len(self.messages)


def create_storage(storage_type: str = 'memory') -> StorageInterface:
    """Factory function to create storage instances."""
    if storage_type == 'memory':
        return MemoryStorage()
    elif storage_type == 'file':
        return FileStorage()
    else:
        raise ValueError(f"Unknown storage type: {storage_type}")