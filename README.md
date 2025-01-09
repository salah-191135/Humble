# Humble

Humble is a web application built with React and Vite that helps users manage their finances by tracking income and expenses. The application integrates with Firebase for authentication and data storage.

## Features
- User authentication with email/password and Google Sign-In
- Add, view, and manage income and expenses
- View current balance, total income, and total expenses
- Responsive design for mobile and desktop

## Project Structure
Humble/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── public/
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   ├── Cards/
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
│   │   ├── Header/
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
│   │   ├── Input/
│   │   │   ├── input.css
│   │   │   ├── Input.jsx
│   │   ├── modals/
│   │   │   ├── AddExpense.jsx
│   │   │   ├── AddIncome.jsx
│   │   ├── Signup/
│   │   ├── TransactionTable/
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   ├── Signup.jsx
├── vite.config.js
├── LICENSE


## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/humble.git
   cd humble

2. Install dependencies:
        Install dependencies:
            npm install
        Running the Application
            To start the development server:
                npm run dev

### Firebase Configuration
    Create a .env file in the root directory and add your Firebase configuration:
        VITE_FIREBASE_API_KEY=your-api-key
        VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
        VITE_FIREBASE_PROJECT_ID=your-project-id
        VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
        VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        VITE_FIREBASE_APP_ID=your-app-id
        VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
- React
- Vite
- Firebase
- Ant Design
