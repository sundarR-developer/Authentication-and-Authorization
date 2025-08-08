# User Authentication and Authorization API

A complete Node.js authentication system with JWT Bearer tokens, built using Express.js, Mongoose, and MongoDB. This API follows the MVC pattern and includes comprehensive user management features.

## 🚀 Features

- **User Registration & Login** with JWT Bearer tokens
- **Password Hashing** using bcryptjs
- **Input Validation** with express-validator
- **Role-based Authorization** (User/Admin)
- **MVC Architecture** with clean separation of concerns
- **Error Handling** with custom middleware
- **Rate Limiting** for API protection
- **Security Headers** with helmet
- **CORS Support** for cross-origin requests
- **Comprehensive API Documentation**

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Postman** - API testing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-auth-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `config.env` and update the values:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/user_auth_db
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   JWT_EXPIRE=24h
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas cloud service

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### 1. Register User
- **URL:** `POST /auth/register`
- **Access:** Public
- **Description:** Register a new user account

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

#### 2. Login User
- **URL:** `POST /auth/login`
- **Access:** Public
- **Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "identifier": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "lastLogin": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

#### 3. Get Current User
- **URL:** `GET /auth/me`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true
    }
  }
}
```

#### 4. Update User Details
- **URL:** `PUT /auth/updatedetails`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```

#### 5. Update Password
- **URL:** `PUT /auth/updatepassword`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

#### 6. Logout
- **URL:** `POST /auth/logout`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### User Management Endpoints

#### 1. Get User Profile
- **URL:** `GET /users/profile`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

#### 2. Update User Profile
- **URL:** `PUT /users/profile`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

#### 3. Delete User Account
- **URL:** `DELETE /users/profile`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

#### 4. Deactivate Account
- **URL:** `PATCH /users/profile/deactivate`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### Admin Endpoints

#### 1. Get All Users
- **URL:** `GET /users`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <token>`

#### 2. Get User by ID
- **URL:** `GET /users/:id`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <token>`

## 🔐 Authentication

### JWT Bearer Token
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Token Format
- **Type:** JWT (JSON Web Token)
- **Algorithm:** HS256
- **Expiration:** 24 hours (configurable)
- **Payload:** Contains user ID

## 📝 Validation Rules

### Registration
- **Username:** 3-30 characters, alphanumeric + underscore only
- **Email:** Valid email format
- **Password:** Minimum 6 characters, must contain uppercase, lowercase, and number
- **First/Last Name:** 1-50 characters, letters and spaces only

### Login
- **Identifier:** Email or username (required)
- **Password:** Required

## 🛡️ Security Features

- **Password Hashing:** bcryptjs with salt rounds of 12
- **JWT Token Security:** Configurable secret and expiration
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Security Headers:** Helmet.js for protection
- **Input Validation:** Comprehensive validation with express-validator
- **CORS Protection:** Configurable cross-origin requests
- **Error Handling:** Secure error messages

## 📁 Project Structure

```
user-auth-api/
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── config.env
├── package.json
├── server.js
└── README.md
```

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Import the provided collection file
3. Set up environment variables for base URL and tokens

### Test Flow
1. **Register** a new user
2. **Login** with credentials
3. **Copy the token** from login response
4. **Set Authorization header** for protected routes
5. **Test protected endpoints**

### Environment Variables
- `baseUrl`: `http://localhost:3000/api`
- `token`: JWT token from login response

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window

## 📈 Performance

- **Database Indexing:** Email and username fields indexed
- **Password Security:** bcryptjs with optimal salt rounds
- **Rate Limiting:** Prevents abuse and DDoS attacks
- **Error Logging:** Comprehensive error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Coding! 🚀** 