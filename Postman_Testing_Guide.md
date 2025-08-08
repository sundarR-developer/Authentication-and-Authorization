# Postman Testing Guide - User Authentication API

## 🚀 Base URL: `http://localhost:3000`

---

## 📋 **1. HEALTH CHECK**
**GET** `/health`
- ✅ Test server is running
- ✅ Verify response format: `{"status": "success", "message": "Server is running", "timestamp": "..."}`

---

## 🔐 **2. AUTHENTICATION ENDPOINTS**

### **POST** `/api/auth/register`
**Headers**: `Content-Type: application/json`
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

**Testing Comments**:
- ✅ **Success**: Valid registration returns JWT token
- ❌ **Error**: Duplicate email/username
- ❌ **Error**: Invalid email format
- ❌ **Error**: Weak password (must contain uppercase, lowercase, number)
- ❌ **Error**: Missing required fields

### **POST** `/api/auth/login`
**Headers**: `Content-Type: application/json`
**Body**:
```json
{
  "identifier": "test@example.com",
  "password": "Password123"
}
```

**Testing Comments**:
- ✅ **Success**: Login with email returns JWT token
- ✅ **Success**: Login with username works
- ❌ **Error**: Wrong password
- ❌ **Error**: Non-existent user
- ❌ **Error**: Deactivated account

### **POST** `/api/auth/logout`
**Headers**: `Authorization: Bearer {{token}}`
**Testing Comments**:
- ✅ **Success**: Returns logout message
- ❌ **Error**: Missing token

### **GET** `/api/auth/me`
**Headers**: `Authorization: Bearer {{token}}`
**Testing Comments**:
- ✅ **Success**: Returns current user data
- ❌ **Error**: Missing/invalid token

### **PUT** `/api/auth/updatedetails`
**Headers**: `Authorization: Bearer {{token}}`, `Content-Type: application/json`
**Body**:
```json
{
  "firstName": "Updated",
  "lastName": "Name"
}
```
**Testing Comments**:
- ✅ **Success**: Updates user details
- ❌ **Error**: Invalid data format

### **PUT** `/api/auth/updatepassword`
**Headers**: `Authorization: Bearer {{token}}`, `Content-Type: application/json`
**Body**:
```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```
**Testing Comments**:
- ✅ **Success**: Updates password, returns new token
- ❌ **Error**: Wrong current password
- ❌ **Error**: Weak new password

---

## 👥 **3. USER MANAGEMENT**

### **GET** `/api/users/profile`
**Headers**: `Authorization: Bearer {{token}}`
**Testing Comments**:
- ✅ **Success**: Returns user profile
- ❌ **Error**: Missing token

### **PUT** `/api/users/profile`
**Headers**: `Authorization: Bearer {{token}}`, `Content-Type: application/json`
**Testing Comments**:
- ✅ **Success**: Updates profile
- ❌ **Error**: Invalid data

### **DELETE** `/api/users/profile`
**Headers**: `Authorization: Bearer {{token}}`
**Testing Comments**:
- ✅ **Success**: Deletes account
- ❌ **Error**: Missing token

### **PATCH** `/api/users/profile/deactivate`
**Headers**: `Authorization: Bearer {{token}}`
**Testing Comments**:
- ✅ **Success**: Deactivates account
- ❌ **Error**: Missing token

---

## 🔧 **4. ADMIN ENDPOINTS**

### **GET** `/api/users`
**Headers**: `Authorization: Bearer {{adminToken}}`
**Testing Comments**:
- ✅ **Success**: Returns all users (admin only)
- ❌ **Error**: Regular user token (403 Forbidden)
- ❌ **Error**: Missing token

### **GET** `/api/users/:id`
**Headers**: `Authorization: Bearer {{adminToken}}`
**Testing Comments**:
- ✅ **Success**: Returns specific user (admin only)
- ❌ **Error**: Regular user token (403 Forbidden)
- ❌ **Error**: Invalid user ID

---

## 🧪 **5. COMPREHENSIVE TEST SCENARIOS**

### **Scenario 1: User Lifecycle**
1. Register → Login → Get Profile → Update Details → Update Password → Logout
2. **Expected**: All operations successful

### **Scenario 2: Admin Operations**
1. Register Admin → Login Admin → Get All Users → Get User by ID
2. **Expected**: Admin access granted, regular users denied

### **Scenario 3: Error Handling**
1. Invalid email → Weak password → Duplicate registration → Wrong login
2. **Expected**: Proper error messages for each case

### **Scenario 4: Security**
1. Missing token → Invalid token → Expired token → Wrong role access
2. **Expected**: 401/403 responses appropriately

---

## 📝 **6. POSTMAN ENVIRONMENT SETUP**

**Variables to set**:
```
baseUrl: http://localhost:3000
token: (auto-set from login)
adminToken: (auto-set from admin login)
```

**Pre-request Script for Login**:
```javascript
pm.test("Set token", function () {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("token", jsonData.token);
    }
});
```

---

## 🎯 **7. TESTING CHECKLIST**

### **Authentication** ✅
- [ ] Registration with valid/invalid data
- [ ] Login with email/username
- [ ] Token generation and validation
- [ ] Password update
- [ ] Logout functionality

### **Authorization** ✅
- [ ] Protected route access
- [ ] Admin-only route access
- [ ] Role-based permissions
- [ ] Token validation

### **Validation** ✅
- [ ] Email format validation
- [ ] Password strength requirements
- [ ] Required field validation
- [ ] Duplicate prevention

### **Error Handling** ✅
- [ ] 400 Bad Request responses
- [ ] 401 Unauthorized responses
- [ ] 403 Forbidden responses
- [ ] Proper error messages

---

## 🚀 **8. AUTOMATION TIPS**

### **Test Scripts**:
```javascript
// Status code test
pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});

// Response structure test
pm.test("Has correct structure", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
    pm.expect(jsonData.status).to.eql('success');
});

// Token validation test
pm.test("Token present", function () {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.expect(jsonData.token).to.be.a('string');
        pm.expect(jsonData.token.length).to.be.greaterThan(50);
    }
});
```

### **Collection Runner**:
1. Create test collection
2. Add all endpoints with tests
3. Set environment variables
4. Run with different data sets

---

## 🔒 **9. SECURITY TESTING**

### **Test Cases**:
- [ ] SQL injection attempts
- [ ] XSS prevention
- [ ] Token tampering
- [ ] Rate limiting
- [ ] CORS validation
- [ ] Password policy enforcement

### **Security Headers**:
- [ ] Content-Security-Policy
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] X-XSS-Protection

---

## 📊 **10. PERFORMANCE EXPECTATIONS**

- **Response Time**: < 200ms
- **Throughput**: 1000+ requests/minute
- **Error Rate**: < 1%
- **Availability**: 99.9%

---

**🎉 Ready for comprehensive API testing!** 