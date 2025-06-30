# 🛒 E-Commerce Backend

This is the backend for a full-stack e-commerce application built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

The backend handles API requests for products, users, payments (via Stripe), and other business logic.

## 🚀 Features

- API built with **Express** and **TypeScript**
- **MongoDB** integration with **Mongoose**
- User authentication and management
- **Stripe** payment gateway integration
- File upload handling with **Multer**
- Caching with **node-cache**
- Input validation with **Validator**
- API logging using **Morgan**
- Environment variable management with **dotenv**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name


2️⃣ Backend Setup
cd backend
npm install
cp .env.example .env  # Make sure to configure your environment variables

3️⃣ Environment Variables
Create a .env file in the backend/ folder with the following example values:

PORT=5000
MONGODB_URI=your_mongo_uri
STRIPE_SECRET_KEY=your_stripe_secret
FIREBASE_API_KEY=your_firebase_key
Note: Update these values with your actual credentials (e.g., MongoDB, Stripe, Firebase).

4️⃣ Run the Backend

For Development:
npm run watch  #Watch for TS file changes
npm run dev  # Start the backend/development server with live reload (Nodemon)

For Production:
npm run build  # Compile TypeScript
npm start      # Start the server


📦 Dependencies
express: Web framework for Node.js
mongoose: MongoDB ODM
stripe: Stripe API for payment processing
multer: Middleware for handling file uploads
node-cache: Simple caching for Node.js
morgan: HTTP request logger middleware
validator: String validation and sanitization
dotenv: Loads environment variables from .env file


🛡️ License
This project is licensed under the ISC License.