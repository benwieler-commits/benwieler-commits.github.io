// ================================
// PLAYER APP - FIREBASE BROADCAST
// Sends data to MC, Receives MC broadcasts
// ================================

const { database, getSessionId, getPlayerId } = window.firebaseConfig;

// ================================
// BROADCAST PLAYER DATA TO MC
// ================================

/**
 * Broadcast player character data to MC
 */
function broadcastPlayerToMc(characterData) {
    const sessionId = getSessionId();
    const playerId = getPlayerId();

    if (!sessionId || !playerId) {
        console.warn('⚠️ No session/player ID - cannot broadcast to MC');
        return;
    }

    // Prepare dice roll data for MC
    const rollData = characterData.lastRoll ? {
        move: characterData.lastRoll.move,
        moveName: characterData.lastRoll.moveName,
        dice: characterData.lastRoll.dice,
        baseBonus: characterData.lastRoll.baseBonus || 0,
        power: characterData.lastRoll.power,
        total: characterData.lastRoll.total,
        result: characterData.lastRoll.result,
        resultText: characterData.lastRoll.resultText,
        timestamp: characterData.lastRoll.timestamp
    } : null;

    // Broadcast to MC's listener path
    const playerBroadcastRef = database.ref(`sessions/${sessionId}/playerBroadcasts/${playerId}`);

    playerBroadcastRef.set({
        playerName: characterData.name || 'Unknown Player',
        pronouns: characterData.pronouns || '',
        juice: characterData.juice || 0,
        clues: characterData.clues || 0,
        currentStatuses: characterData.currentStatuses || [],
        storyTags: characterData.storyTags || [],
        lastRoll: rollData,
        lastUpdated: Date.now()
    })
    .then(() => {
        console.log('📤 Broadcast to MC successful');
    })
    .catch((error) => {
        console.error('❌ Broadcast to MC failed:', error);
    });
}

// ================================
// RECEIVE MC BROADCASTS
// ================================

let mcBroadcastListener = null;

/**
 * Start listening for MC broadcasts
 */
function startListeningToMcBroadcasts(onReceive) {
    const sessionId = getSessionId();
    const playerId = getPlayerId();

    if (!sessionId || !playerId) {
        console.warn('⚠️ No session/player ID - cannot listen to MC');
        return;
    }

    // Stop existing listener if any
    if (mcBroadcastListener) {
        mcBroadcastListener.off();
    }

    // Listen to broadcasts for this specific player
    const playerMcBroadcastRef = database.ref(`sessions/${sessionId}/mcBroadcasts/players/${playerId}`);

    mcBroadcastListener = playerMcBroadcastRef;
    mcBroadcastListener.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            console.log('📥 Received MC broadcast:', data);
            if (onReceive && typeof onReceive === 'function') {
                onReceive(data);
            }
        }
    });

    // Also listen to group broadcasts (sent to all players)
    const groupBroadcastRef = database.ref(`sessions/${sessionId}/mcBroadcasts/group`);
    groupBroadcastRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            console.log('📥 Received MC group broadcast:', data);
            if (onReceive && typeof onReceive === 'function') {
                onReceive(data);
            }
        }
    });

    console.log('👂 Now listening to MC broadcasts');
}

/**
 * Stop listening to MC broadcasts
 */
function stopListeningToMcBroadcasts() {
    if (mcBroadcastListener) {
        mcBroadcastListener.off();
        mcBroadcastListener = null;
        console.log('🔇 Stopped listening to MC broadcasts');
    }
}

// ================================
// EXPORTS
// ================================

window.firebaseBroadcast = {
    broadcastPlayerToMc,
    startListeningToMcBroadcasts,
    stopListeningToMcBroadcasts
};
