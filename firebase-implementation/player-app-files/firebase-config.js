// ================================
// FIREBASE CONFIGURATION
// ================================

// TODO: Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ================================
// SESSION MANAGEMENT
// ================================

let currentSessionId = localStorage.getItem('queerz-session-id') || null;
let currentPlayerId = localStorage.getItem('queerz-player-id') || null;

/**
 * Generate a unique session ID
 */
function generateSessionId() {
    return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Generate a unique player ID
 */
function generatePlayerId() {
    return 'player-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Set the current session ID (MC creates, Players join)
 */
function setSessionId(sessionId) {
    currentSessionId = sessionId;
    localStorage.setItem('queerz-session-id', sessionId);
    console.log('📡 Session ID set:', sessionId);
}

/**
 * Set the current player ID (auto-generated for each player)
 */
function setPlayerId(playerId) {
    currentPlayerId = playerId;
    localStorage.setItem('queerz-player-id', playerId);
    console.log('👤 Player ID set:', playerId);
}

/**
 * Get current session ID
 */
function getSessionId() {
    return currentSessionId;
}

/**
 * Get current player ID
 */
function getPlayerId() {
    return currentPlayerId;
}

// ================================
// CHARACTER CLOUD SAVE/LOAD
// ================================

/**
 * Save character data to Firebase
 */
function saveCharacterToCloud(characterData) {
    if (!currentSessionId || !currentPlayerId) {
        console.warn('⚠️ No session or player ID - cannot save to cloud');
        return Promise.reject('No session ID');
    }

    const playerRef = database.ref(`sessions/${currentSessionId}/players/${currentPlayerId}`);

    return playerRef.set({
        character: characterData,
        lastUpdated: Date.now()
    })
    .then(() => {
        console.log('☁️ Character saved to cloud');
    })
    .catch((error) => {
        console.error('❌ Error saving to cloud:', error);
    });
}

/**
 * Load all characters from current session
 */
function loadCharactersFromCloud() {
    if (!currentSessionId) {
        console.warn('⚠️ No session ID - cannot load from cloud');
        return Promise.reject('No session ID');
    }

    const playersRef = database.ref(`sessions/${currentSessionId}/players`);

    return playersRef.once('value')
        .then((snapshot) => {
            const players = [];
            snapshot.forEach((childSnapshot) => {
                const playerData = childSnapshot.val();
                if (playerData && playerData.character) {
                    players.push({
                        id: childSnapshot.key,
                        character: playerData.character,
                        lastUpdated: playerData.lastUpdated
                    });
                }
            });
            console.log('☁️ Loaded', players.length, 'characters from cloud');
            return players;
        })
        .catch((error) => {
            console.error('❌ Error loading from cloud:', error);
            return [];
        });
}

// ================================
// EXPORTS
// ================================

// Export functions for use in other files
window.firebaseConfig = {
    database,
    generateSessionId,
    generatePlayerId,
    setSessionId,
    setPlayerId,
    getSessionId,
    getPlayerId,
    saveCharacterToCloud,
    loadCharactersFromCloud
};
