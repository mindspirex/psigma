# Psigma

Psigma is an interactive, browser-based design tool inspired by Figma. It enables users to create, manipulate, and organize resizable, draggable objects on a canvas. With custom styling capabilities and a zoomable viewport, Psigma is perfect for designing layouts, prototyping ideas, and experimenting with object-based designs.

## Key Features

- **Interactive Canvas**: Drag, resize, and manipulate objects directly on the canvas.
- **Customizable Objects**: Modify object properties such as position, size, and background color.
- **Flex Layouts**: Enable flex properties (justify-content, align-items) for responsive object design.
- **Zoom & Pan**: Navigate the canvas easily with zoom-in, zoom-out, and panning controls.
- **Real-Time Updates**: Instant updates to the design as you edit.
- **Object Nesting**: Structure objects hierarchically to build complex layouts.
- **Persistent Storage**: Objects and their properties are saved using MongoDB.

---

## Getting Started

### Prerequisites

- **Node.js**: A JavaScript runtime for executing server-side scripts. Latest LTS recommended.
- **MongoDB**: A database service for storing and retrieving objects.
- **Package Manager**: npm, yarn, or bun.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mindspirex/psigma.git
   cd psigma
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment:
   - Create a `.env.local` file in the root directory.
   - Refer to `.env.sample` file for help

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to access the app.

---

## Future Roadmap

- Support for multiple pages.
- Real-time collaboration features.
- Component libraries for reusable objects.
- Undo/Redo functionality for error recovery.
- Export designs as images or code.

---
