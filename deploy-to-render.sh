#!/bin/bash

# 🚀 Render Deployment Script for User Authentication API
# This script helps prepare your application for deployment to Render

echo "🚀 Preparing User Authentication API for Render deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "package.json"
    "server.js"
    "models/User.js"
    "controllers/authController.js"
    "controllers/userController.js"
    "middleware/auth.js"
    "middleware/errorHandler.js"
    "middleware/validate.js"
    "routes/authRoutes.js"
    "routes/userRoutes.js"
    ".gitignore"
    "README.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
        exit 1
    fi
done

# Check package.json scripts
echo "📦 Checking package.json scripts..."
if grep -q '"start"' package.json; then
    echo "✅ start script found"
else
    echo "❌ Missing 'start' script in package.json"
    exit 1
fi

# Check for sensitive files
echo "🔒 Checking for sensitive files..."
sensitive_files=(
    ".env"
    "config.env"
    "node_modules"
)

for file in "${sensitive_files[@]}"; do
    if [ -f "$file" ] || [ -d "$file" ]; then
        echo "⚠️  Found sensitive file/directory: $file"
        echo "   Make sure this is in your .gitignore"
    fi
done

# Check git status
echo "📊 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes:"
    git status --short
    echo ""
    echo "💡 Consider committing your changes before deploying:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
else
    echo "✅ All changes committed"
fi

echo ""
echo "🎯 Your application is ready for Render deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Set up MongoDB Atlas:"
echo "   - Create account at https://www.mongodb.com/atlas"
echo "   - Create a free cluster"
echo "   - Get your connection string"
echo ""
echo "3. Deploy to Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Click 'New +' → 'Web Service'"
echo "   - Connect your GitHub repository"
echo "   - Set environment variables (see DEPLOYMENT_CHECKLIST.md)"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - RENDER_DEPLOYMENT_GUIDE.md"
echo "   - DEPLOYMENT_CHECKLIST.md"
echo ""
echo "🎉 Good luck with your deployment!" 