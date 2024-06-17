# Chat Buddies

Chat Buddies is a real-time web chat application that allows users to communicate with their friends in a seamless and interactive environment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Messaging**: Utilizes Socket.io for instant messaging and updates.
- **User Authentication**: Implements JWT (JSON Web Tokens) for secure user authentication with access and refresh tokens.
- **Local Storage**: Stores friend details and current chat conversations locally for quick access.
- **Responsive UI**: Built with Material-UI for a modern and responsive user interface design.
- **Backend Integration**: Uses Express.js and MongoDB to store user data and chat history securely.

## Technologies Used

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **Redux Toolkit**: State management library for maintaining application state.
- **axios**: Promise-based HTTP client for making API requests.
- **jwt-decode**: Library for decoding JWT tokens.
- **react-router-dom**: Routing library for navigation between components.
- **socket.io-client**: WebSocket library for real-time communication.

### Backend

- **Express.js**: Web framework for Node.js for building server-side applications.
- **MongoDB**: NoSQL database for storing user information and chat history.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWTs).
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **socket.io**: Library for enabling real-time, bidirectional event-based communication.

## Installation

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd <repository-name>/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server should start running on `http://localhost:4000`.

## Usage

- **Signup**: Create a new account using your email and password.
- **Login**: Authenticate with your credentials to access the chat application.
- **Chat**: Start conversations with your friends in real-time.
- **Settings**: Customize your profile and manage account preferences.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Feel free to customize this README file further based on your specific project details and additional features.
