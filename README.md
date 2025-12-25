# 🛒 MyStore – E-Commerce Web Application

A full-stack **E-Commerce Web Application** built using **HTML, CSS, JavaScript, Node.js, Express, and MongoDB**.  
This project implements core e-commerce functionalities including user authentication, product management, cart handling, and order processing.


## 🚀 Features

### 👤 User Features
- User registration and login
- View product listings
- Add products to cart
- Remove items from cart
- Place orders

### 🔐 Authentication
- Secure user authentication using sessions / JWT
- Protected routes for authorized users

### 🛠️ Admin Features
- Add new products
- Update existing products
- Delete products
- View all orders

---

## 🧱 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose ODM)

---

## 📁 Project Structure

ecommerce-project/
│
├── middleware/ # Authentication & middleware logic
├── models/ # MongoDB schemas
├── routes/ # Express routes
├── public/ # Static frontend files
│
├── server.js # Main server entry point
├── seed.js # Database seeding script
├── clear.js # Database cleanup script
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/elakks02/ecommerce-project.git
cd ecommerce-project
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Environment Variables
Create a .env file in the root directory:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
4️⃣ Run the application
bash
Copy code
npm start
The application will run on:

arduino
Copy code
http://localhost:5000
🧪 Database Utilities
Seed database
bash
Copy code
node seed.js
Clear database
bash
Copy code
node clear.js
🎯 Learning Outcomes
Full-stack web development

RESTful API design
MongoDB schema modeling
Backend authentication
Real-world project structure

🔮 Future Improvements
Payment gateway integration
Product search & filtering
Order status tracking
Deployment (Render / Railway / AWS)
Role-based access control

