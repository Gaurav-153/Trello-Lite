# 📝 Trello Lite

Trello Lite is a beginner-friendly **project management app** inspired by Trello.  
It allows users to create boards, lists, and tasks with **drag-and-drop support**, activity logs, and authentication. 

---

## 🚀 Features

- 🔐 **User Authentication** (Register/Login with JWT)  
- 🗂️ **Boards**: Create and manage multiple boards  
- ✅ **Tasks & Lists**: Add, update, and delete tasks  
- 📦 **Drag & Drop**: Move tasks smoothly between lists  
- 🕒 **Activity Logs**: Track actions with timestamps  
- 📱 **Responsive Design** with TailwindCSS  
- 🎨 Attractive and modern UI  

---

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)  
- [React](https://react.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [React DnD](https://react-dnd.github.io/react-dnd/about) for drag & drop  
- [React Icons](https://react-icons.github.io/react-icons/)  

### Backend
- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)  
- [JWT Authentication](https://jwt.io/)  

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/trello-lite.git
cd trello-lite
```
---
## Backend Setup
```bash
cd backend
npm install

Create a .env file inside backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run start
Backend will run on: http://localhost:5000
```
---
## Frontend Setup 
```bash
cd frontend
npm install

Run frontend:
npm run dev
App will run on: http://localhost:3000


