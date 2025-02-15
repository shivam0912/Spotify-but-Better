# Spotify-but-Better

A modern music streaming application with real-time chat, user authentication, and a sleek UI. Built using **Node.js, Express, Socket.io, Clerk for authentication, React, TailwindCSS, and ShadCN**.

## Features

### 🎵 Music Streaming
- Upload and stream songs seamlessly.
- Organize music into albums.
- Search and filter music collections.

### 🔊 Real-time Chat
- Chat with other users in real-time using **Socket.io**.
- Instant messaging within the app.

### 🔐 User Authentication
- Secure authentication powered by **Clerk**.
- User sessions and profile management.

### 🖼️ Cloud Storage
- Songs and album covers are stored and managed using **Cloudinary**.

### 🚀 Modern UI
- Built with **React, TailwindCSS, and ShadCN**.
- Responsive and intuitive design for an enhanced user experience.

## Tech Stack

### Backend
- **Node.js & Express** – Server-side logic and REST API.
- **Socket.io** – Real-time chat and messaging.
- **Mongoose** – MongoDB for storing user, song, and chat data.
- **Cloudinary** – Media file storage and management.
- **Node-cron** – Scheduled tasks and automation.

### Frontend
- **React** – Component-based UI.
- **TailwindCSS** – Modern styling and responsiveness.
- **ShadCN** – UI components.
- **Zustand** – State management.
- **Socket.io-client** – Real-time messaging.

## Installation & Setup

### Backend
```sh
# Clone the repository
git clone https://github.com/shivam0912/spotify-but-better.git

# Navigate to backend
cd spotify-but-better/backend

# Install dependencies
npm install

# Create a .env file and configure necessary environment variables

# Start the development server
npm run dev
```

### Frontend
```sh
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Variables
Create a `.env` file in the backend directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Running Seed Scripts
```sh
# Seed songs
npm run seed:songs

# Seed albums
npm run seed:albums
```

## Contributing
Feel free to fork the repository and submit a pull request. Contributions are always welcome!

## License
This project is licensed under the ISC License.

---
### 🔥 Follow for Updates
Follow [shivam0912](https://github.com/shivam0912) for more awesome projects!

