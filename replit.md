# Overview

This is a personal portfolio website for Vansh Sharma, a Data Science enthusiast and undergraduate student. The application showcases his skills, projects, education, and certifications in data science, machine learning, GIS analysis, and blockchain development. The portfolio is built as a full-stack web application with a modern React frontend and dual backend options (Node.js/TypeScript and Python/Flask), featuring contact form functionality, interactive animations, and responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Animations**: Framer Motion for smooth page transitions and interactions
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Routing**: Wouter for lightweight client-side routing
- **Theme Support**: Custom theme provider with dark/light mode switching

## Backend Architecture
- **Dual Backend Support**: Node.js (TypeScript) and Python (Flask) options
- **Node.js Backend**: Express.js with TypeScript, Vite integration, hot reload
- **Python Backend**: Flask with Pydantic validation, CORS support, request logging
- **API Design**: RESTful endpoints for contact form submission and message retrieval
- **Development Server**: Vite integration (Node.js) or Flask dev server (Python)
- **Request Logging**: Custom middleware for API request/response logging
- **Error Handling**: Centralized error handling with structured error responses
- **Storage**: Memory/file storage options for both backends

## Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema changes
- **Development Storage**: In-memory storage implementation for local development
- **Connection**: Neon Database serverless PostgreSQL for production
- **Type Safety**: Drizzle-Zod integration for runtime schema validation

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Contact Storage**: Simple contact message collection without user accounts
- **Admin Access**: Basic endpoint for retrieving all contact messages (no protection currently)

## External Dependencies

### Core Technologies
- **Database**: Neon Database (serverless PostgreSQL)
- **Hosting Platform**: Replit with custom development banner integration
- **Email Service**: Currently using simple form submission (no email service integrated)

### Development Tools
- **Build Tool**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Management**: Static asset serving through Vite in development
- **Hot Reload**: Vite HMR with runtime error overlay for development

### UI and Animation Libraries
- **Component Library**: shadcn/ui built on Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter) for typography
- **Animation**: Framer Motion for page transitions and scroll-triggered animations
- **Responsive Design**: Tailwind CSS with mobile-first approach

### Form and Validation
- **Form Management**: React Hook Form for performant form handling
- **Schema Validation**: Zod for runtime type validation and form schemas
- **Error Handling**: Integrated validation with user-friendly error messages

The application follows a modern full-stack architecture with strong type safety throughout, responsive design patterns, and smooth user interactions. The portfolio effectively showcases technical projects while maintaining professional presentation and functionality.