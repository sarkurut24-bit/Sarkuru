// BoscoConnect 2025 - Firebase Configuration
// ============================================
// IMPORTANT: Replace these values with your actual Firebase project credentials
// Get these from: https://console.firebase.google.com/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA36BIWpgVHavKSI-ecg83Md36AuJt5ONM",
  authDomain: "bosco-connect-2025.firebaseapp.com",
  databaseURL: "https://bosco-connect-2025-default-rtdb.firebaseio.com",
  projectId: "bosco-connect-2025",
  storageBucket: "bosco-connect-2025.firebasestorage.app",
  messagingSenderId: "129408114967",
  appId: "1:129408114967:web:a1052bb96917f10441d752",
  measurementId: "G-E2HJVS7Q6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
} else {
  firebase.app();
}

// Initialize Services
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();
const analytics = firebase.analytics ? firebase.analytics() : null;

// Enable Offline Persistence
db.setPersistenceEnabled(true);

// Firebase Security Rules (Copy to Firebase Console)
/*

{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth.uid === $uid || root.child('admins').child(auth.uid).exists()",
        ".write": "auth.uid === $uid",
        ".validate": "newData.hasChildren(['phoneNumber', 'uid', 'batch'])"
      }
    },
    "chat": {
      "global": {
        ".read": "auth.uid !== null && root.child('users').child(auth.uid).exists()",
        ".write": "auth.uid !== null && root.child('users').child(auth.uid).exists()",
        "messages": {
          "$messageId": {
            ".read": true,
            ".write": "data.child('uid').val() === auth.uid"
          }
        }
      }
    },
    "feed": {
      "$postId": {
        ".read": "auth.uid !== null",
        ".write": "data.child('uid').val() === auth.uid || !data.exists()",
        "comments": {
          "$commentId": {
            ".read": true,
            ".write": "newData.child('uid').val() === auth.uid || !data.exists()"
          }
        },
        "likes": {
          "$uid": {
            ".write": "$uid === auth.uid"
          }
        }
      }
    },
    "memories": {
      "$memoryId": {
        ".read": "auth.uid !== null",
        ".write": "data.child('uid').val() === auth.uid || !data.exists()"
      }
    },
    "stories": {
      "$storyId": {
        ".read": "auth.uid !== null",
        ".write": "data.child('uid').val() === auth.uid || !data.exists()"
      }
    },
    "messages": {
      "$conversationId": {
        ".read": "$conversationId.contains(auth.uid)",
        ".write": "$conversationId.contains(auth.uid)"
      }
    },
    "admins": {
      ".read": "auth.uid !== null",
      ".write": false
    },
    "stats": {
      ".read": true,
      ".write": false
    }
  }
}

*/

// Helper Functions

// Get Current User
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not authenticated'));
      }
    });
  });
}

// Get User Profile
async function getUserProfile(uid) {
  try {
    const snapshot = await db.ref(`users/${uid}`).once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Update User Profile
async function updateUserProfile(uid, data) {
  try {
    await db.ref(`users/${uid}`).update(data);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Send Message to Chat
async function sendChatMessage(message, mediaUrl = null) {
  try {
    const user = await getCurrentUser();
    const userProfile = await getUserProfile(user.uid);
    
    const messageData = {
      uid: user.uid,
      displayName: userProfile.displayName || 'Anonymous',
      profilePic: userProfile.profilePic || '',
      message: message,
      mediaUrl: mediaUrl,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      reactions: {},
      isPinned: false
    };
    
    await db.ref('chat/global/messages').push(messageData);
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Get Chat History
function getChatHistory(limit = 50, callback) {
  db.ref('chat/global/messages')
    .orderByChild('timestamp')
    .limitToLast(limit)
    .on('child_added', (snapshot) => {
      callback(snapshot.val());
    });
}

// Create Feed Post
async function createFeedPost(caption, imageUrl) {
  try {
    const user = await getCurrentUser();
    const userProfile = await getUserProfile(user.uid);
    
    const postData = {
      uid: user.uid,
      displayName: userProfile.displayName || 'Anonymous',
      profilePic: userProfile.profilePic || '',
      caption: caption,
      imageUrl: imageUrl,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      likes: {},
      comments: {},
      views: 0
    };
    
    const postRef = await db.ref('feed').push(postData);
    return postRef.key;
  } catch (error) {
    console.error('Error creating feed post:', error);
    throw error;
  }
}

// Like/Unlike Post
async function togglePostLike(postId, like = true) {
  try {
    const user = await getCurrentUser();
    const likeRef = db.ref(`feed/${postId}/likes/${user.uid}`);
    
    if (like) {
      await likeRef.set({
        uid: user.uid,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
    } else {
      await likeRef.remove();
    }
    return true;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}

// Add Comment
async function addComment(postId, commentText) {
  try {
    const user = await getCurrentUser();
    const userProfile = await getUserProfile(user.uid);
    
    const commentData = {
      uid: user.uid,
      displayName: userProfile.displayName || 'Anonymous',
      profilePic: userProfile.profilePic || '',
      text: commentText,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    await db.ref(`feed/${postId}/comments`).push(commentData);
    return true;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

// Upload Memory
async function uploadMemory(caption, file, progressCallback) {
  try {
    const user = await getCurrentUser();
    const fileName = `memories/${user.uid}/${Date.now()}_${file.name}`;
    const storageRef = storage.ref(fileName);
    
    const uploadTask = storageRef.put(file);
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progressCallback) progressCallback(progress);
      },
      (error) => {
        console.error('Upload error:', error);
      },
      async () => {
        const downloadUrl = await storageRef.getDownloadURL();
        const userProfile = await getUserProfile(user.uid);
        
        const memoryData = {
          uid: user.uid,
          displayName: userProfile.displayName || 'Anonymous',
          profilePic: userProfile.profilePic || '',
          caption: caption,
          mediaUrl: downloadUrl,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          likes: {},
          comments: {}
        };
        
        await db.ref('memories').push(memoryData);
        return downloadUrl;
      }
    );
  } catch (error) {
    console.error('Error uploading memory:', error);
    throw error;
  }
}

// Send DM
async function sendDM(recipientId, message) {
  try {
    const user = await getCurrentUser();
    const conversationId = [user.uid, recipientId].sort().join('_');
    
    const dmData = {
      uid: user.uid,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      read: false
    };
    
    await db.ref(`messages/${conversationId}/chats`).push(dmData);
    
    // Update last message
    await db.ref(`messages/${conversationId}/lastMessage`).set({
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      uid: user.uid
    });
    
    return true;
  } catch (error) {
    console.error('Error sending DM:', error);
    throw error;
  }
}

// Get DM Conversation
function getDMConversation(userId, recipientId, callback) {
  const conversationId = [userId, recipientId].sort().join('_');
  
  db.ref(`messages/${conversationId}/chats`)
    .orderByChild('timestamp')
    .on('child_added', (snapshot) => {
      callback(snapshot.val());
    });
}

// Mark DM as Read
async function markDMAsRead(conversationId) {
  try {
    await db.ref(`messages/${conversationId}`).update({
      unread: 0
    });
    return true;
  } catch (error) {
    console.error('Error marking DM as read:', error);
    throw error;
  }
}

// Logout
async function logoutUser() {
  try {
    await auth.signOut();
    localStorage.removeItem('bosconian_user');
    window.location.href = '/index.html';
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FIREBASE_CONFIG,
    auth,
    db,
    storage,
    getCurrentUser,
    getUserProfile,
    updateUserProfile,
    sendChatMessage,
    getChatHistory,
    createFeedPost,
    togglePostLike,
    addComment,
    uploadMemory,
    sendDM,
    getDMConversation,
    markDMAsRead,
    logoutUser
  };
}
