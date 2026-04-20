# BoscoConnect 2025 - The Bosconian Hub
## Complete App for Class 10 Batch, Don Bosco HSS Diphu

---

## 📱 Project Overview

**BoscoConnect 2025** is a **Progressive Web App (PWA)** + **Mobile App** exclusively designed for the Class of 2026 batch of Don Bosco Higher Secondary School, Diphu.

### Key Features:
✅ School-branded login (blurred school gate background)  
✅ Global batch chat (permanent message history)  
✅ Memories Vault (Pinterest-style photo gallery)  
✅ Instagram-style feed with likes & comments  
✅ 24-hour Stories feature  
✅ Private DMs (end-to-end secure)  
✅ OTP-based authentication (no passwords)  
✅ Admin dashboard (content moderation)  
✅ Auto-update system  
✅ Automatic video compression  
✅ Invite-only access (batch verification)  

---

## 📁 Project Structure

```
BoscoConnect2025/
│
├── index.html                 # Login page (school gate background)
├── app.html                   # Main app dashboard
├── chat.html                  # Global batch chat
├── memories.html              # Memories vault (Pinterest grid)
├── feed.html                  # Instagram-style feed
├── stories.html               # 24-hour stories
├── dm.html                    # Private messaging
├── admin.html                 # Admin panel
├── profile.html               # User profile
├── settings.html              # Settings
│
├── css/
│   ├── style.css              # Main stylesheet (Don Bosco colors)
│   ├── chat.css               # Chat page styling
│   ├── memories.css           # Pinterest grid styles
│   ├── feed.css               # Instagram feed styles
│   ├── responsive.css         # Mobile-first responsive design
│   └── animations.css         # Smooth transitions & animations
│
├── js/
│   ├── app.js                 # Main app logic
│   ├── auth.js                # OTP authentication + Firebase
│   ├── chat.js                # Chat functionality
│   ├── memories.js            # Photo gallery logic
│   ├── feed.js                # Feed & likes system
│   ├── stories.js             # Stories feature
│   ├── dm.js                  # DM system
│   ├── admin.js               # Admin dashboard
│   ├── video-compress.js      # Video compression utility
│   ├── notification.js        # Push notifications
│   ├── offline.js             # Offline functionality
│   └── utils.js               # Helper functions
│
├── assets/
│   ├── images/
│   │   ├── school-gate.jpg    # Blurred login background
│   │   ├── logo.svg           # BOSCONIANS logo
│   │   ├── batch-badge.png    # Gold "Batch of '26" badge
│   │   └── placeholder.jpg    # Placeholder images
│   ├── icons/
│   │   ├── icon-192.png       # PWA icon
│   │   ├── icon-512.png       # PWA icon
│   │   └── favicon.ico        # Favicon
│   └── fonts/
│       └── inter.css          # Font Awesome + Inter
│
├── config/
│   ├── firebase-config.js     # Firebase initialization
│   ├── app-config.json        # App settings
│   └── colors.js              # Color theme (Red + Gold + Dark Grey)
│
├── service-worker.js          # PWA service worker
├── manifest.json              # PWA manifest (for PWABuilder)
├── _redirects                 # Netlify redirects (if hosted there)
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
│
└── docs/
    ├── SETUP.md               # Setup instructions
    ├── FIREBASE_SETUP.md      # Firebase configuration
    ├── PWA_APK_BUILD.md       # How to build APK on PWABuilder
    ├── GITHUB_DEPLOY.md       # How to deploy on GitHub Pages
    └── API_REFERENCE.md       # API documentation
```

---

## 🎨 Color Scheme (Don Bosco Theme)

```
Primary Red:        #C41E3A  (School uniform color)
Secondary Gold:     #FFD700  (Batch badge & highlights)
Dark Grey:          #2C3E50  (Text & backgrounds)
Light Grey:         #ECF0F1  (Cards & dividers)
Accent Orange:      #FF8C00  (Notifications & CTAs)
Success Green:      #27AE60  (Verification badges)
```

---

## 🚀 Quick Start Guide

### 1. **Clone Repository**
```bash
git clone https://github.com/sarkurut24-bit/BoscoConnect2025.git
cd BoscoConnect2025
```

### 2. **Set Up Firebase**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create new project: "BoscoConnect2025"
- Enable:
  - Authentication (Phone + Email)
  - Realtime Database
  - Cloud Storage
  - Cloud Functions (for OTP)
- Copy Firebase config to `config/firebase-config.js`

### 3. **Configure App Settings**
Edit `config/app-config.json`:
```json
{
  "appName": "BoscoConnect 2025",
  "schoolName": "Don Bosco HSS, Diphu",
  "batchYear": "2026",
  "primaryColor": "#C41E3A",
  "secondaryColor": "#FFD700",
  "adminEmails": ["admin@bosconians.local"],
  "maxFileSize": 52428800,
  "videoMaxSize": 10485760
}
```

### 4. **Test Locally**
```bash
# Using Python's built-in server
python -m http.server 8000

# Or Node.js
npx http-server
```

### 5. **Deploy on GitHub Pages**
- Push to GitHub
- Enable GitHub Pages in settings
- App live at: `https://username.github.io/BoscoConnect2025`

### 6. **Build APK with PWABuilder**
- Go to [PWABuilder.com](https://www.pwabuilder.com/)
- Enter your GitHub Pages URL
- Download APK
- Install on Android phones

---

## 🔐 Security Features

✅ **OTP Authentication** - No passwords stored  
✅ **Firebase Security Rules** - Role-based access  
✅ **Batch Verification** - Only verified members access  
✅ **Admin Moderation** - Flag/remove inappropriate content  
✅ **Data Encryption** - All chats encrypted at rest  
✅ **Privacy Control** - DMs are 1-to-1 only  

---

## 📱 PWA + APK Info

- **Progressive Web App**: Works offline, installable on home screen
- **Service Worker**: Caches assets for offline access
- **Manifest.json**: PWA configuration
- **PWABuilder**: Generates APK for Google Play Store

**APK Size**: ~8-12 MB (highly compressed)  
**Minimum Android**: 5.0 (API 21)  
**Recommended**: Android 10+ (API 29+)  

---

## 🎯 Development Roadmap

### Phase 1 (Done):
- [x] Authentication system
- [x] Login UI
- [x] Basic app structure

### Phase 2 (Current):
- [ ] Chat functionality
- [ ] Memories vault
- [ ] Feed & stories

### Phase 3 (Next):
- [ ] DM system
- [ ] Admin dashboard
- [ ] Push notifications

### Phase 4 (Polish):
- [ ] Performance optimization
- [ ] Video compression
- [ ] Auto-update system
- [ ] APK build & publish

---

## 📞 Support & Troubleshooting

### Common Issues:

**"Firebase initialization failed"**
- Check Firebase config in `config/firebase-config.js`
- Ensure Firebase project is active

**"OTP not received"**
- Verify phone number format: +91XXXXXXXXXX
- Check Firebase Authentication rules

**"App not installing on phone"**
- Try PWABuilder APK instead of web version
- Ensure Android 5.0+

**"Videos taking too long to upload"**
- Enable video compression in settings
- Check file size < 10MB

---

## 📄 License

**Exclusive for Class of 2026, Don Bosco HSS, Diphu**  
Not for commercial use. School property.

---

## 👨‍💻 Created By

**Sarkuru** - Senior Student, Don Bosco HSS Diphu  
GitHub: [@sarkurut24-bit](https://github.com/sarkurut24-bit)

---

## 🙏 Credits

- **Firebase**: Backend & authentication
- **FontAwesome**: Icons
- **PWABuilder**: APK generation
- **Don Bosco School**: Brand & inspiration

---

**Last Updated**: April 2026  
**Status**: 🔴 In Development | 🟢 Ready for Beta
