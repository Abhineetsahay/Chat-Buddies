### Chat Buddies Web Application

Welcome to Chat Buddies, a real-time web chat application built with React.js on the frontend and Express.js with MongoDB on the backend. This document serves as a guide to understanding the structure, features, and technologies used in this application.

#### Frontend (React.js)

The frontend of Chat Buddies is built using React.js, utilizing various libraries and tools to enhance functionality and user experience.

##### Features:

- **Login and Sign Up**: Secure user authentication using `useForm` hook for form handling.
- **Private Chat**: Real-time private messaging using `socket.io` for instant communication.
- **User Management**: Ability to add users and manage user settings.
- **Emoji Support**: Integrated with `emoji-mart` npm package for emoji selection.
- **Styling**: Styled with `Material-UI` for a sleek and responsive UI.
- **State Management**: Utilizes `Redux` for managing application state where necessary.
- **HTTP Requests**: Uses `axios` for making HTTP requests to the backend API.

#### Backend (Express.js + MongoDB)

The backend of Chat Buddies is powered by Express.js, a Node.js framework, and MongoDB for data storage.

##### Features:

- **Authentication**: Implements token-based authentication with `bcrypt` for hashed passwords.
- **Real-time Communication**: Utilizes `socket.io` for real-time chat functionality.
- **Controller Functions**:
  - **Chat**: Manages chat messages, including retrieval and deletion.
  - **Account**: Handles user account operations.

##### Future Improvements:

- **UI Enhancements**: Continual improvement in user interface design for better user experience.
- **Image Handling**: Enhance functionality to support image uploads, potentially integrating with `Cloudinary` for cloud storage.

#### Technologies Used:

- **Frontend**:
  - React.js
  - Material-UI
  - Redux
  - Axios
  - useForm hook for form handling
  - emoji-mart for emoji support

- **Backend**:
  - Express.js
  - MongoDB
  - bcrypt for password hashing
  - socket.io for real-time communication
  - cors for requests

#### Getting Started

To run Chat Buddies locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/chat-buddies.git
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd chat-buddies/frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create `.env` files in both `frontend` and `backend` directories and set necessary variables (e.g., MongoDB URI, API URLs).

4. Start frontend and backend servers:
   ```
   cd chat-buddies/frontend
   npm start
   cd ../backend
   npm start
   ```

5. Access the application in your browser:
   Open `http://localhost:3000` to view Chat Buddies frontend.

#### Contributors

- Add your name here if you've contributed to this project.

---

Feel free to modify this README to suit your specific project details and updates. Happy chatting with Chat Buddies! 🎉
