# EasyPlug Todo App

## Overview
This repository contains Part A of the EasyPlug assessment: a React frontend with a Node/Express backend for managing todo items.

## Structure
- `backend/`: Express API server with JSON file storage.
- `frontend/`: React app using Axios to communicate with the backend.

## Running the application

### 1. Start backend
```
cd "c:\Users\DINEO\Downloads\easy plug\backend"
npm install
npm start
```
The backend runs on `http://localhost:4000`.

### 2. Start frontend
```
cd "c:\Users\DINEO\Downloads\easy plug\frontend"
npm install
npm start
```
The React app runs on `http://localhost:3000` and uses the backend API at `http://localhost:4000/api/todos`.

### One-button start (Windows)
Use the provided scripts to start both backend and frontend with a single command or by double-clicking the batch file.

- PowerShell (recommended):

```powershell
cd "C:\Users\DINEO\Downloads\easy plug"
.\run-full.ps1
```

- Batch (double-click or cmd):

```cmd
run-full.bat
```

Both scripts attempt to use the Visual Studio Node.js installation if present, otherwise they fall back to whatever `node`/`npm` is available in `PATH`.

### VS Code one-button/keybinding
If you use VS Code, a workspace keybinding is provided to run both servers at once:

- Press `Ctrl+Alt+S` to run the `Start EasyPlug Fullstack` compound task.

This keybinding is defined in `.vscode/keybindings.json` in the workspace.

## API Endpoints
- `GET /api/todos` - retrieve all todos
- `GET /api/todos/:id` - retrieve a single todo by id
- `POST /api/todos` - create a todo
- `PUT /api/todos/:id` - update a todo
- `DELETE /api/todos/:id` - delete a todo

## Notes
- Data is stored in `backend/todos.json` and persists between backend restarts.
- Validation is handled by Yup on the backend.
