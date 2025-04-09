# To-Do List

A to-do list application built with React, Tailwind CSS, and other libraries. It allows users to add tasks with a title, description, category, priority, status, and due date, featuring a styled modal and a custom calendar.

## Live Demo

You can access the live version of the app on Vercel:  
🔗 [To-Do List on Vercel](https://todo-list-six-alpha-63.vercel.app/)

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: CSS framework for styling.
- **Lucide React**: Icon library.
- **React Datepicker**: Library for the custom calendar.
- **@hello-pangea/dnd**: Library for drag-and-drop functionality.
- **LocalStorage**: For data persistence in the browser.

## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher) installed.
- npm (usually comes with Node.js).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/malopez23/todo-list.git
   cd todo-list

2. Install the dependencies:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm start

4. Open your browser and go to:
    ```bash
    http://localhost:3000

## Features
- Add tasks with a title, description, category, priority, status, and due date.
- Reorder tasks using drag-and-drop.
- Task persistence in LocalStorage.
- Styled modal for adding tasks.
- Custom calendar with react-datepicker.

## Project Structure
- src/App.js: Main application component.
- src/pages/Tasks.js: Main page that lists tasks and manages the modal.
- src/components/TaskForm.jsx: Form for adding tasks.
- src/components/TaskCard.jsx: Component that displays each task.
- src/datepicker.css: Custom styling for the calendar.

## Contributing
Feel free to open issues or submit pull requests with improvements!