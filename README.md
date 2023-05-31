# Online Notes Website

A web-based notes application that allows users to create and manage their notes in real-time using websockets. The application is built with React, Node.js, Express, and MongoDB.

## Features

- User authentication: Users can register, log in, and log out to access their notes.
- Real-time collaboration: Multiple users can edit notes simultaneously and see changes in real-time from multiple instances of the application.
- Create and manage notes: Users can create, edit, and delete their own notes.
- Secure storage: User data is securely stored in a MongoDB database.

## Technologies Used

- Node.js
- Express
- MongoDB
- React
- Websockets (e.g., Socket.IO)
- HTML
- SCSS
- JavaScript

## Installation

1. Clone the repository:
https://github.com/Arad1234/Online-Notes-Website.git

2. Install the dependencies for the server:
cd server
npm install

3. Install the dependencies for the client:
cd client
npm install

4. Configure environment variables:
- Create a `.env` file in the `server` directory.
- Add your MongoDB connection string and the secret key to generate and verify the jwt to the `.env` file.

5. Start the server and client:
- In the `server` directory, run `npm start` to start the server.
- In the `client` directory, run `npm run dev` to start the React development server.

6. Open your browser and access the application at `http://localhost:5173/register`.

## Usage

- Register a new account or log in with an existing account.
- Create a new note by clicking on the "Create New Note" button.
- Edit and save your notes. Changes will be automatically synchronized with other users viewing the same note.
- Delete notes you no longer need.
- Open multiple instances of the app, display each instance on different sides of the computer screen, and observe the functionality of the sockets by adding, deleting, or editing notes.

## Acknowledgements

- [Socket.IO](https://socket.io/) - Real-time bidirectional event-based communication library.
