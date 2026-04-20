# BoscoConnect 2025 - Complete Deployment & APK Build Guide

## 📋 Table of Contents
1. [GitHub Setup](#github-setup)
2. [Firebase Configuration](#firebase-configuration)
3. [Deploy to GitHub Pages](#deploy-to-github-pages)
4. [Build APK with PWABuilder](#build-apk-with-pwabuilder)
5. [Testing & Troubleshooting](#testing--troubleshooting)

---

## 🔧 GitHub Setup

### Step 1: Create GitHub Repository
```bash
# If you don't have git installed, download from https://git-scm.com/

# Create a new directory
mkdir BoscoConnect2025
cd BoscoConnect2025

# Initialize git
git init

# Create a README
echo "# BoscoConnect 2025 - The Bosconian Hub" > README.md

# Add files to staging
git add .

# Commit
git commit -m "Initial commit - BoscoConnect 2025 app"
```

### Step 2: Push to GitHub
1. Go to [GitHub.com](https://github.com) and login
2. Click **"New"** to create a new repository
3. Name it: `BoscoConnect2025`
4. **DO NOT** initialize with README (you already have one)
5. Click **Create repository**

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/BoscoConnect2025.git

# Push code
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: **main**
5. Select folder: **/root** (or / if no root folder)
6. Click **Save**
7. Wait 2-3 minutes for deployment

**Your app is now live at:** `https://YOUR_USERNAME.github.io/BoscoConnect2025`

---

## 🔐 Firebase Configuration

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Create a project**
3. Project name: `BoscoConnect2025`
4. Enable Google Analytics (optional)
5. Click **Create project**
6. Wait for creation to complete

### Step 2: Setup Authentication
1. Go to **Build** → **Authentication**
2. Click **Get started**
3. Enable **Phone** sign-in method:
   - Click **Phone**
   - Toggle **Enable**
   - Add your country's phone number (e.g., +91 for India)
   - Click **Save**
4. Enable **Email/Password** for admin login:
   - Click **Email/Password**
   - Toggle **Enable**
   - Click **Save**

### Step 3: Setup Realtime Database
1. Go to **Build** → **Realtime Database**
2. Click **Create Database**
3. Location: Choose nearest region (e.g., asia-south1 for India)
4. Start in **Test mode** (for development)
5. Click **Enable**

**Important**: Change to production rules after testing!

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth.uid === $uid || root.child('admins').child(auth.uid).exists()",
        ".write": "auth.uid === $uid"
      }
    },
    "chat": {
      ".read": "auth.uid !== null",
      ".write": "auth.uid !== null"
    },
    "feed": {
      ".read": "auth.uid !== null",
      ".write": "auth.uid !== null"
    },
    "messages": {
      ".read": "auth.uid !== null",
      ".write": "auth.uid !== null"
    }
  }
}
```

### Step 4: Setup Cloud Storage
1. Go to **Build** → **Storage**
2. Click **Get started**
3. Location: Same as database (asia-south1)
4. Click **Done**
5. Update storage rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
        && request.resource.size < 100 * 1024 * 1024; // 100MB max
    }
  }
}
```

### Step 5: Get Firebase Config
1. Go to **Project Settings** (gear icon)
2. Click **Your apps** → **Web** (or create web app if not exists)
3. Copy the `firebaseConfig` object
4. Replace `YOUR_API_KEY`, etc. in your `config/firebase-config.js`:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD...",
  authDomain: "boscoconnect-xxxxx.firebaseapp.com",
  projectId: "boscoconnect-xxxxx",
  storageBucket: "boscoconnect-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

### Step 6: Add Admin User (Optional)
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Email: your email
4. Password: strong password
5. Create admin entry in database:
   - Go to **Realtime Database**
   - Click **admins**
   - Add: `youruid: true`

---

## 🚀 Deploy to GitHub Pages

### Method 1: Direct Upload via GitHub Web
1. Open your repository on GitHub
2. Click **Add file** → **Create new file**
3. Paste your `index.html` content
4. Name it: `index.html`
5. Commit with message: "Add login page"
6. Repeat for all HTML, CSS, JS files in correct folder structure

### Method 2: Using Git (Recommended)
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/BoscoConnect2025.git
cd BoscoConnect2025

# Copy all your files here
# (HTML files in root, assets/ folder, config/ folder, etc.)

# Add all files
git add .

# Commit
git commit -m "Add complete BoscoConnect 2025 app"

# Push to GitHub
git push origin main

# Check deployment status:
# Go to Settings → Pages → "Your site is published at https://..."
```

### Step-by-Step File Upload via GitHub:
```
BoscoConnect2025/
├── index.html              (Login page)
├── app.html                (Dashboard)
├── chat.html               (Chat page)
├── memories.html           (Photo gallery)
├── feed.html               (Social feed)
├── stories.html            (Stories)
├── dm.html                 (Direct messages)
├── profile.html            (User profile)
├── admin.html              (Admin panel)
├── service-worker.js       (PWA offline)
├── manifest.json           (PWA config)
│
├── config/
│   ├── firebase-config.js  (Firebase setup)
│   └── app-config.json     (App settings)
│
├── assets/
│   ├── images/
│   │   ├── school-gate.jpg  (Your school gate image)
│   │   ├── logo.svg         (BOSCONIANS logo)
│   │   └── favicon.ico
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
│
└── css/
    ├── style.css           (Main styles)
    └── responsive.css      (Mobile styles)
```

---

## 📱 Build APK with PWABuilder

### Step 1: Prepare Your PWA
1. Ensure your site is deployed at GitHub Pages
2. Test it at: `https://YOUR_USERNAME.github.io/BoscoConnect2025`
3. Verify manifest.json is accessible
4. Test on mobile: Add to home screen works

### Step 2: Go to PWABuilder
1. Visit [PWABuilder.com](https://www.pwabuilder.com/)
2. Enter your GitHub Pages URL: `https://YOUR_USERNAME.github.io/BoscoConnect2025`
3. Click **Start**
4. Wait for analysis (2-3 minutes)

### Step 3: Download APK
1. PWABuilder will analyze your app
2. Click **Store Packages** → **Android**
3. Review app details:
   - Package name: `com.bosconians.boscoconnect`
   - Version: `1.0.0`
   - Signing info: Auto-generate
4. Click **Generate Download**
5. Wait for build to complete (~2 min)
6. Download `.apk` file

### Step 4: Install on Android Phone
**Method 1: Direct Install**
```
1. Transfer APK to your Android phone via USB/email
2. Open Settings → Security → Allow installation from unknown sources
3. Open file manager → navigate to APK
4. Tap and install
5. Grant permissions
6. Launch app
```

**Method 2: Via ADB (Android Debug Bridge)**
```bash
# Download ADB from Android SDK

# Connect phone via USB
# Enable Developer Mode on phone

adb install BoscoConnect2025.apk

# If successful, app appears on home screen
```

### Step 5: Test App
- ✅ Login with phone number
- ✅ Receive OTP
- ✅ Access chat, feed, memories
- ✅ Add to home screen
- ✅ Works offline (service worker)

---

## 🧪 Testing & Troubleshooting

### Common Issues:

**Problem: "App not loading from GitHub Pages"**
```
Solution:
1. Check GitHub Pages is enabled (Settings → Pages)
2. Verify all file paths are correct
3. Check browser console for errors (F12)
4. Ensure manifest.json is in root
```

**Problem: "Firebase authentication not working"**
```
Solution:
1. Verify Firebase config is correct
2. Check phone number format: +91XXXXXXXXXX
3. Ensure Firebase project is active
4. Check Realtime Database rules allow reads/writes
```

**Problem: "PWABuilder can't detect manifest"**
```
Solution:
1. Ensure manifest.json is in root folder
2. Add link in HTML head:
   <link rel="manifest" href="/manifest.json">
3. Check manifest.json is valid JSON
4. Test at: https://your-domain/manifest.json
```

**Problem: "APK won't install on phone"**
```
Solution:
1. Check Android version is 5.0+ (API 21+)
2. Ensure "Unknown sources" is enabled
3. Try installing via ADB
4. Check phone storage has space
5. Clear Play Store cache and retry
```

**Problem: "OTP not received"**
```
Solution:
1. Check phone number format (must be +91XXXXXXXXXX)
2. Verify number is not already registered
3. Check Firebase Authentication rules
4. Try again after 5 minutes (rate limit)
```

### Testing Checklist:
- [ ] Login page loads with blurred school gate image
- [ ] OTP verification works
- [ ] App dashboard displays
- [ ] All navigation buttons work
- [ ] Chat messages send and receive
- [ ] Photo upload works
- [ ] Offline functionality works
- [ ] PWA can be added to home screen
- [ ] APK installs and runs on Android

---

## 📦 Deployment Checklist

### Before Going Live:
- [ ] Replace all `YOUR_` placeholders with actual values
- [ ] Upload school gate image (optimized & blurred)
- [ ] Upload BOSCONIANS logo (SVG or PNG)
- [ ] Create favicon and app icons
- [ ] Configure Firebase security rules
- [ ] Test on multiple devices
- [ ] Test offline functionality
- [ ] Set up admin accounts
- [ ] Create privacy policy page
- [ ] Test APK installation

### After Going Live:
- [ ] Share GitHub Pages link with batch
- [ ] Share APK for download
- [ ] Create installation guide for students
- [ ] Monitor Firebase usage
- [ ] Backup database regularly
- [ ] Monitor for inappropriate content (admin)
- [ ] Keep app updated

---

## 🎯 Quick Reference Commands

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/BoscoConnect2025.git

# Make changes
git add .
git commit -m "Your message"
git push origin main

# Test locally
python -m http.server 8000
# Visit http://localhost:8000

# Check Git status
git status

# View logs
git log --oneline -5
```

---

## 📞 Need Help?

- **GitHub Issues**: Create an issue in your repository
- **Firebase Support**: https://firebase.google.com/support
- **PWABuilder**: https://www.pwabuilder.com/docs
- **Android Help**: https://developer.android.com/

---

## 🎉 Success!

Once everything is deployed:
1. Your app is live at GitHub Pages
2. APK can be installed on Android phones
3. Batch members can access exclusively
4. App works offline
5. Ready for production!

**Happy coding! 🚀**

---

**Version**: 1.0.0  
**Last Updated**: April 2026  
**Created for**: Don Bosco HSS Diphu, Class of 2026
