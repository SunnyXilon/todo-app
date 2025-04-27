# Todo App with Drag and Drop

A modern todo application built with Remix, React, and SQLite. Features include:

- Add, delete, and update todos
- Drag and drop functionality to move todos between Past, Present, and Future columns
- Persistent storage using SQLite database
- Modern UI with Tailwind CSS
- Responsive design

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npm run migrate
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Features

- **Todo Management**: Add, delete, and update todos
- **Status Categories**: Organize todos into Past, Present, and Future
- **Drag and Drop**: Easily move todos between categories
- **Persistent Storage**: Todos are saved in a SQLite database
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- Remix
- React
- TypeScript
- SQLite (with Drizzle ORM)
- Tailwind CSS

## License

MIT
