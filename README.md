# Vite React TypeScript Project

Welcome to the Vite React TypeScript project! This README provides an overview of the project, including setup instructions, commands, and the technology stack used.

## Getting Started

To get started with the project, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/bransonchew/lg-assessment.git
cd lg-assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

This will start the project in development mode, and you can access it at http://localhost:3000.

### 4. Build for Production

To build the project for production, use:

```bash
npm run build
```

This will generate a dist folder with the optimized production build.

### 5. Preview the Production Build

To preview the production build locally, use:

```bash
npm run preview
```

## Project Structure
Here is a brief overview of the project structure:

```bash
/src
  /routes     # Main application files for routing
  /components # Reusable UI components
  /styles     # Global and component-specific styles
  /mock       # Mock server and data
  /lib        # API, utility functions, and others
  main.tsx    # Application entry point
```

## Technology Stack

This project utilizes various technologies, grouped by their role:

### Core Technologies
- Vite - Fast build tool through HMR
- React - Main JavaScript library
- TypeScript - Strongly typed JavaScript

### Styling
- Tailwind CSS - Utility-first CSS framework for rapid UI development
- ShadCN UI - Beautiful Tailwind components library that you can copy and paste into your apps

### State Management
- Axios - HTTP client for making requests
- TanStack Query - Query library for infinite data-fetching and caching

### Routing
- TanStack Router - Flexible and type-safe routing solution
- Zod - Search params validation

### Mocking and Testing
- MirageJS - API mocking library
