# Postman Testing Comments for User Authentication API

## 🚀 **API Base URL**: `http://localhost:3000`

---

## 📋 **1. HEALTH CHECK**

### **GET** `/health`
**Description**: Check if the server is running

**Headers**: None required

**Expected Response**:
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2025-08-07T19:37:33.476Z"
}
```

**Testing Comments**:
- ✅ **Test 1**: Verify server is running
- ✅ **Test 2**: Check response format
- ✅ **Test 3**: Verify timestamp is current

---

## 🔐 **2. AUTHENTICATION ENDPOINTS**

### **POST** `/api/auth/register`
**Description**: Register a new user

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123",
  "firstName": "Test",
  "lastName": "User",
  "role": "user"
}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-08-07T19:19:39.686Z",
      "updatedAt": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Register with valid data
- ✅ **Test 2**: Verify JWT token is returned
- ✅ **Test 3**: Check user data is correct
- ✅ **Test 4**: Verify password is not returned
- ✅ **Test 5**: Test admin role registration
- ❌ **Test 6**: Try duplicate email (should fail)
- ❌ **Test 7**: Try duplicate username (should fail)
- ❌ **Test 8**: Try invalid email format
- ❌ **Test 9**: Try weak password
- ❌ **Test 10**: Try missing required fields

---

### **POST** `/api/auth/login`
**Description**: Login with email/username and password

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "identifier": "test@example.com",
  "password": "Password123"
}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user",
      "isActive": true,
      "lastLogin": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Login with email
- ✅ **Test 2**: Login with username
- ✅ **Test 3**: Verify JWT token is returned
- ✅ **Test 4**: Check lastLogin is updated
- ❌ **Test 5**: Try wrong password
- ❌ **Test 6**: Try non-existent user
- ❌ **Test 7**: Try deactivated account
- ❌ **Test 8**: Try missing identifier
- ❌ **Test 9**: Try missing password

---

### **POST** `/api/auth/logout`
**Description**: Logout user (invalidate token)

**Headers**:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body**: None required

**Expected Success Response**:
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

**Testing Comments**:
- ✅ **Test 1**: Logout with valid token
- ❌ **Test 2**: Try logout without token
- ❌ **Test 3**: Try logout with invalid token

---

### **GET** `/api/auth/me`
**Description**: Get current user information

**Headers**:
```
Authorization: Bearer {{token}}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user",
      "isActive": true,
      "lastLogin": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Get user info with valid token
- ❌ **Test 2**: Try without token
- ❌ **Test 3**: Try with invalid token
- ❌ **Test 4**: Try with expired token

---

### **PUT** `/api/auth/updatedetails`
**Description**: Update user details

**Headers**:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body**:
```json
{
  "firstName": "Updated",
  "lastName": "Name",
  "email": "updated@example.com"
}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "updated@example.com",
      "firstName": "Updated",
      "lastName": "Name",
      "role": "user",
      "isActive": true,
      "updatedAt": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Update firstName only
- ✅ **Test 2**: Update lastName only
- ✅ **Test 3**: Update email only
- ✅ **Test 4**: Update multiple fields
- ❌ **Test 5**: Try without token
- ❌ **Test 6**: Try invalid email format
- ❌ **Test 7**: Try duplicate email

---

### **PUT** `/api/auth/updatepassword`
**Description**: Update user password

**Headers**:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body**:
```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Testing Comments**:
- ✅ **Test 1**: Update password with correct current password
- ✅ **Test 2**: Verify new token is returned
- ❌ **Test 3**: Try wrong current password
- ❌ **Test 4**: Try weak new password
- ❌ **Test 5**: Try same password
- ❌ **Test 6**: Try without token

---

## 👥 **3. USER MANAGEMENT ENDPOINTS**

### **GET** `/api/users/profile`
**Description**: Get user profile

**Headers**:
```
Authorization: Bearer {{token}}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user",
      "isActive": true,
      "lastLogin": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Get profile with valid token
- ❌ **Test 2**: Try without token
- ❌ **Test 3**: Try with invalid token

---

### **PUT** `/api/users/profile`
**Description**: Update user profile

**Headers**:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body**:
```json
{
  "firstName": "Updated",
  "lastName": "Profile"
}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Updated",
      "lastName": "Profile",
      "role": "user",
      "isActive": true,
      "updatedAt": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Update profile with valid data
- ❌ **Test 2**: Try without token
- ❌ **Test 3**: Try invalid data format

---

### **DELETE** `/api/users/profile`
**Description**: Delete user account

**Headers**:
```
Authorization: Bearer {{token}}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "message": "Account deleted successfully"
}
```

**Testing Comments**:
- ✅ **Test 1**: Delete account with valid token
- ❌ **Test 2**: Try without token
- ❌ **Test 3**: Try with invalid token

---

### **PATCH** `/api/users/profile/deactivate`
**Description**: Deactivate user account

**Headers**:
```
Authorization: Bearer {{token}}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "message": "Account deactivated successfully",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user",
      "isActive": false,
      "updatedAt": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Deactivate account with valid token
- ✅ **Test 2**: Verify isActive is false
- ❌ **Test 3**: Try without token
- ❌ **Test 4**: Try with invalid token

---

## 🔧 **4. ADMIN ENDPOINTS**

### **GET** `/api/users`
**Description**: Get all users (Admin only)

**Headers**:
```
Authorization: Bearer {{adminToken}}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "results": 6,
  "data": {
    "users": [
      {
        "_id": "6894fc50d0be6e60a38e1809",
        "username": "testuser",
        "email": "test@example.com",
        "firstName": "Test",
        "lastName": "User",
        "role": "user",
        "isActive": true,
        "createdAt": "2025-08-07T19:19:39.686Z"
      }
    ]
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Get all users with admin token
- ❌ **Test 2**: Try with regular user token
- ❌ **Test 3**: Try without token
- ❌ **Test 4**: Try with invalid token

---

### **GET** `/api/users/:id`
**Description**: Get user by ID (Admin only)

**Headers**:
```
Authorization: Bearer {{adminToken}}
```

**Expected Success Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "6894fc50d0be6e60a38e1809",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-08-07T19:19:39.686Z"
    }
  }
}
```

**Testing Comments**:
- ✅ **Test 1**: Get user by ID with admin token
- ❌ **Test 2**: Try with regular user token
- ❌ **Test 3**: Try with invalid user ID
- ❌ **Test 4**: Try without token

---

## 🧪 **5. COMPREHENSIVE TESTING SCENARIOS**

### **Scenario 1: Complete User Lifecycle**
1. Register new user
2. Login with credentials
3. Get user profile
4. Update user details
5. Update password
6. Login with new password
7. Deactivate account
8. Try to login (should fail)

### **Scenario 2: Admin Operations**
1. Register admin user
2. Login as admin
3. Get all users
4. Get specific user by ID
5. Verify regular users cannot access admin routes

### **Scenario 3: Error Handling**
1. Try invalid email format
2. Try weak password
3. Try duplicate registration
4. Try login with wrong credentials
5. Try access protected routes without token
6. Try access admin routes with user token

### **Scenario 4: Token Management**
1. Login to get token
2. Use token for protected routes
3. Logout
4. Try to use old token (should fail)

---

## 📝 **6. POSTMAN ENVIRONMENT VARIABLES**

**Set these variables in your Postman environment:**

```
baseUrl: http://localhost:3000
token: (will be set automatically from login response)
adminToken: (will be set from admin login response)
```

**Pre-request Script for Login (to auto-set token):**
```javascript
// For login requests
pm.test("Set token variable", function () {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("token", jsonData.token);
    }
});
```

---

## 🎯 **7. TESTING CHECKLIST**

### **Authentication Tests**
- [ ] User registration with valid data
- [ ] User registration with invalid data
- [ ] User login with email
- [ ] User login with username
- [ ] User login with wrong credentials
- [ ] User logout
- [ ] Token validation
- [ ] Password update

### **Authorization Tests**
- [ ] Access protected routes with valid token
- [ ] Access protected routes without token
- [ ] Access admin routes with admin token
- [ ] Access admin routes with user token
- [ ] Role-based access control

### **Validation Tests**
- [ ] Email format validation
- [ ] Password strength validation
- [ ] Required field validation
- [ ] Duplicate email/username prevention
- [ ] Input sanitization

### **Error Handling Tests**
- [ ] 400 Bad Request responses
- [ ] 401 Unauthorized responses
- [ ] 403 Forbidden responses
- [ ] 404 Not Found responses
- [ ] 500 Internal Server Error responses

---

## 🚀 **8. AUTOMATION TIPS**

### **Postman Collection Runner**
1. Create a test collection
2. Add all endpoints with tests
3. Set up environment variables
4. Run collection with different data sets

### **Test Scripts Examples**
```javascript
// Test response status
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test response structure
pm.test("Response has correct structure", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
    pm.expect(jsonData).to.have.property('data');
});

// Test token presence
pm.test("Token is present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('token');
    pm.expect(jsonData.token).to.be.a('string');
});
```

---

## 📊 **9. PERFORMANCE TESTING**

### **Load Testing Scenarios**
1. **Concurrent User Registration**: 100 users simultaneously
2. **Concurrent User Login**: 100 users simultaneously
3. **Token Validation**: 1000 requests with valid tokens
4. **Database Queries**: 1000 user profile requests

### **Expected Performance**
- **Response Time**: < 200ms for most operations
- **Throughput**: 1000+ requests per minute
- **Error Rate**: < 1%
- **Availability**: 99.9%

---

## 🔒 **10. SECURITY TESTING**

### **Security Test Cases**
1. **SQL Injection**: Try malicious input
2. **XSS Prevention**: Test script injection
3. **Token Tampering**: Modify JWT tokens
4. **Rate Limiting**: Exceed rate limits
5. **CORS Testing**: Test cross-origin requests
6. **Password Security**: Test password policies

### **Security Headers Verification**
- [ ] Content-Security-Policy
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] X-XSS-Protection
- [ ] Strict-Transport-Security

---

**🎉 Your API is now ready for comprehensive testing with these detailed Postman comments!** 