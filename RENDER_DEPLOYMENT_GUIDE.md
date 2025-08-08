# 🚀 Render Deployment Guide - User Authentication API

## 📋 **Prerequisites**

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - For cloud database (free tier available)

---

## 🗄️ **Step 1: Set Up MongoDB Atlas Database**

### **1.1 Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier)

### **1.2 Configure Database**
1. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `user-auth-api`
   - Password: Create a strong password
   - Role: "Read and write to any database"

2. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)

3. **Get Connection String:**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `user_auth_db`

**Example Connection String:**
```
mongodb+srv://user-auth-api:YourPassword@cluster0.xxxxx.mongodb.net/user_auth_db?retryWrites=true&w=majority
```

---

## 🚀 **Step 2: Deploy to Render**

### **2.1 Connect GitHub Repository**
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your repository containing the API code

### **2.2 Configure Web Service**
1. **Basic Settings:**
   - **Name**: `user-auth-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)

2. **Build & Deploy Settings:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid plan)

### **2.3 Set Environment Variables**
Click "Environment" tab and add these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `10000` | Port for the application |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your-super-secret-jwt-key-here-change-in-production` | JWT signing secret |
| `JWT_EXPIRE` | `24h` | JWT token expiration |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limiting window |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

### **2.4 Deploy**
1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for deployment to complete (usually 2-5 minutes)

---

## 🔧 **Step 3: Update Postman Collection**

### **3.1 Update Environment Variables**
1. Open your Postman collection
2. Go to "Environments" → "User Auth API Local"
3. Add a new environment: "User Auth API Production"
4. Set `baseUrl` to your Render URL: `https://your-app-name.onrender.com`

### **3.2 Test Production API**
1. Select the production environment
2. Run the "Health Check" test
3. Verify all endpoints work in production

---

## 📊 **Step 4: Monitor and Maintain**

### **4.1 Render Dashboard Features**
- **Logs**: View real-time application logs
- **Metrics**: Monitor performance and usage
- **Deployments**: Automatic deployments on git push
- **Environment Variables**: Secure management

### **4.2 Health Monitoring**
- **Health Check**: `GET https://your-app-name.onrender.com/health`
- **Status Page**: Monitor uptime and performance
- **Error Tracking**: View application errors in logs

---

## 🔒 **Step 5: Security Best Practices**

### **5.1 Environment Variables**
- ✅ **Never commit secrets** to Git
- ✅ **Use Render's environment variables** for sensitive data
- ✅ **Rotate JWT secrets** regularly
- ✅ **Use strong passwords** for database

### **5.2 Database Security**
- ✅ **Network access** properly configured
- ✅ **Database user** with minimal required permissions
- ✅ **Connection string** stored securely
- ✅ **Regular backups** enabled

### **5.3 API Security**
- ✅ **Rate limiting** enabled
- ✅ **CORS** properly configured
- ✅ **Input validation** working
- ✅ **JWT tokens** properly secured

---

## 🎯 **Step 6: Testing Production**

### **6.1 Test All Endpoints**
```bash
# Health Check
curl https://your-app-name.onrender.com/health

# Register User
curl -X POST https://your-app-name.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Password123","firstName":"Test","lastName":"User"}'

# Login User
curl -X POST https://your-app-name.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@example.com","password":"Password123"}'
```

### **6.2 Update Documentation**
- Update API documentation with production URL
- Update README with deployment information
- Update Postman collection with production environment

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Build Failures**
   - Check `package.json` has correct scripts
   - Verify all dependencies are listed
   - Check Node.js version compatibility

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match code
   - Ensure no typos in values

4. **Port Issues**
   - Render uses port 10000 by default
   - Ensure your app listens on `process.env.PORT`

### **Useful Commands:**
```bash
# Check application logs
# View in Render dashboard

# Test local build
npm install
npm start

# Test production build
docker build -t user-auth-api .
docker run -p 10000:10000 user-auth-api
```

---

## 🎉 **Deployment Complete!**

### **Your API is now live at:**
`https://your-app-name.onrender.com`

### **Available Endpoints:**
- **Health Check**: `GET /health`
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **User Profile**: `GET /api/auth/me`
- **Admin Users**: `GET /api/users` (admin only)

### **Next Steps:**
1. ✅ Test all endpoints in production
2. ✅ Update client applications with new API URL
3. ✅ Set up monitoring and alerts
4. ✅ Configure custom domain (optional)
5. ✅ Set up CI/CD pipeline

**Your User Authentication API is now deployed and ready for production use! 🚀** 