# Postman Setup Instructions

## 🚀 **Quick Setup Guide**

### **Step 1: Import Collection**
1. Open Postman
2. Click **"Import"** button
3. Select the file: `User_Auth_API_Postman_Collection.json`
4. The collection will be imported with all endpoints and test scripts

### **Step 2: Set Up Environment**
1. Click **"Environments"** in the left sidebar
2. Click **"Create Environment"**
3. Name it: `User Auth API Local`
4. Add these variables:
   - `baseUrl`: `http://localhost:3000`
   - `token`: (leave empty - will be auto-set)
   - `adminToken`: (leave empty - will be auto-set)
5. Click **"Save"**

### **Step 3: Select Environment**
1. In the top-right corner, select your environment: `User Auth API Local`
2. Now all requests will use the correct base URL

### **Step 4: Start Testing**
1. Make sure your server is running: `npm start`
2. Start with **"Health Check"** to verify server is up
3. Follow the testing order in the collection

---

## 📋 **Testing Order**

### **1. Basic Setup**
- ✅ Health Check
- ✅ Register User
- ✅ Login User

### **2. Authentication Flow**
- ✅ Get Current User
- ✅ Update User Details
- ✅ Update Password
- ✅ Logout

### **3. User Management**
- ✅ Get User Profile
- ✅ Update User Profile
- ✅ Deactivate Account

### **4. Admin Operations**
- ✅ Register Admin
- ✅ Login Admin
- ✅ Get All Users
- ✅ Get User by ID

### **5. Error Testing**
- ✅ Register with Invalid Email
- ✅ Login with Wrong Password
- ✅ Access Protected Route Without Token
- ✅ Access Admin Route with User Token

---

## 🧪 **Automated Testing**

### **Run Collection**
1. Click the **"..."** menu on your collection
2. Select **"Run collection"**
3. Choose your environment
4. Click **"Run User Authentication API"**

### **View Test Results**
- ✅ Green checkmarks = Tests passed
- ❌ Red X marks = Tests failed
- 📊 Summary shows total passed/failed

---

## 🔧 **Customization**

### **Add Your Own Tests**
```javascript
// Example: Test response time
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Example: Test specific user data
pm.test("User has correct email", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.user.email).to.eql('test@example.com');
});
```

### **Environment Variables**
- `{{baseUrl}}` - Your API base URL
- `{{token}}` - JWT token for regular users
- `{{adminToken}}` - JWT token for admin users
- `{{userId}}` - User ID for specific user requests

---

## 📊 **Expected Results**

### **Success Responses**
- ✅ 200/201 status codes
- ✅ Proper JSON structure
- ✅ JWT tokens for authentication
- ✅ User data without passwords

### **Error Responses**
- ❌ 400 for validation errors
- ❌ 401 for authentication failures
- ❌ 403 for authorization failures
- ❌ Clear error messages

---

## 🎯 **Testing Tips**

### **Before Testing**
1. Ensure MongoDB is running
2. Start your Node.js server
3. Clear any existing test data if needed

### **During Testing**
1. Follow the collection order
2. Check test results after each request
3. Verify environment variables are set correctly
4. Look at response bodies for debugging

### **After Testing**
1. Review all test results
2. Check for any failed tests
3. Verify error handling works correctly
4. Test edge cases manually if needed

---

## 🚀 **Ready to Test!**

Your Postman collection is now set up and ready for comprehensive API testing. The collection includes:

- ✅ **All API endpoints** with proper headers and bodies
- ✅ **Automated test scripts** for validation
- ✅ **Environment variables** for easy configuration
- ✅ **Error testing** scenarios
- ✅ **Admin functionality** testing
- ✅ **Security testing** cases

**Happy Testing! 🎉** 