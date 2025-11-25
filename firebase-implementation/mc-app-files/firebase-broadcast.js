// ================================
// MC APP - FIREBASE BROADCAST
// Receives player data, Sends broadcasts to players
// ================================

const { database, getSessionId } = window.firebaseConfig;

// ================================
// RECEIVE PLAYER BROADCASTS
// ================================

let playerListeners = {};

/**
 * Start listening to all player broadcasts in the session
 */
function startListeningToPlayers(onPlayerUpdate) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID - cannot listen to players');
        return;
    }

    const playerBroadcastsRef = database.ref(`sessions/${sessionId}/playerBroadcasts`);

    playerBroadcastsRef.on('child_added', (snapshot) => {
        const playerId = snapshot.key;
        const playerData = snapshot.val();

        console.log('🎯 New player connected:', playerId);

        // Listen to updates from this player
        const playerRef = database.ref(`sessions/${sessionId}/playerBroadcasts/${playerId}`);
        playerListeners[playerId] = playerRef;

        playerRef.on('value', (playerSnapshot) => {
            const data = playerSnapshot.val();
            if (data && onPlayerUpdate && typeof onPlayerUpdate === 'function') {
                onPlayerUpdate(playerId, data);
            }
        });
    });

    console.log('👂 Now listening to all players in session');
}

/**
 * Stop listening to all players
 */
function stopListeningToPlayers() {
    Object.keys(playerListeners).forEach((playerId) => {
        playerListeners[playerId].off();
    });
    playerListeners = {};
    console.log('🔇 Stopped listening to players');
}

// ================================
// BROADCAST TO PLAYERS
// ================================

/**
 * Broadcast environment, NPC, and music to all players
 */
function broadcastToAllPlayers(broadcastData) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID - cannot broadcast');
        return Promise.reject('No session ID');
    }

    const groupBroadcastRef = database.ref(`sessions/${sessionId}/mcBroadcasts/group`);

    return groupBroadcastRef.set({
        ...broadcastData,
        timestamp: Date.now()
    })
    .then(() => {
        console.log('📡 Broadcast to all players successful');
    })
    .catch((error) => {
        console.error('❌ Broadcast failed:', error);
    });
}

/**
 * Broadcast Story Tag to specific player or group
 */
function broadcastStoryTag(tagData, targetPlayerId = null) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID - cannot broadcast tag');
        return Promise.reject('No session ID');
    }

    const broadcastPath = targetPlayerId
        ? `sessions/${sessionId}/mcBroadcasts/players/${targetPlayerId}`
        : `sessions/${sessionId}/mcBroadcasts/group`;

    const broadcastRef = database.ref(broadcastPath);

    return broadcastRef.child('storyTags').push({
        ...tagData,
        timestamp: Date.now()
    })
    .then(() => {
        console.log('📡 Story Tag broadcast successful');
    })
    .catch((error) => {
        console.error('❌ Story Tag broadcast failed:', error);
    });
}

/**
 * Broadcast Status Tag to specific player or group
 */
function broadcastStatusTag(tagData, targetPlayerId = null) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID - cannot broadcast tag');
        return Promise.reject('No session ID');
    }

    const broadcastPath = targetPlayerId
        ? `sessions/${sessionId}/mcBroadcasts/players/${targetPlayerId}`
        : `sessions/${sessionId}/mcBroadcasts/group`;

    const broadcastRef = database.ref(broadcastPath);

    return broadcastRef.child('statusTags').push({
        ...tagData,
        timestamp: Date.now()
    })
    .then(() => {
        console.log('📡 Status Tag broadcast successful');
    })
    .catch((error) => {
        console.error('❌ Status Tag broadcast failed:', error);
    });
}

/**
 * Remove Story Tag from specific player or group
 */
function removeStoryTag(tagName, targetPlayerId = null) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID');
        return Promise.reject('No session ID');
    }

    const broadcastPath = targetPlayerId
        ? `sessions/${sessionId}/mcBroadcasts/players/${targetPlayerId}`
        : `sessions/${sessionId}/mcBroadcasts/group`;

    const broadcastRef = database.ref(broadcastPath);

    return broadcastRef.child('removeStoryTag').set({
        tagName: tagName,
        timestamp: Date.now()
    })
    .then(() => {
        console.log('📡 Story Tag removal broadcast successful');
    })
    .catch((error) => {
        console.error('❌ Story Tag removal failed:', error);
    });
}

/**
 * Remove Status Tag from specific player or group
 */
function removeStatusTag(tagName, targetPlayerId = null) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID');
        return Promise.reject('No session ID');
    }

    const broadcastPath = targetPlayerId
        ? `sessions/${sessionId}/mcBroadcasts/players/${targetPlayerId}`
        : `sessions/${sessionId}/mcBroadcasts/group`;

    const broadcastRef = database.ref(broadcastPath);

    return broadcastRef.child('removeStatusTag').set({
        tagName: tagName,
        timestamp: Date.now()
    })
    .then(() => {
        console.log('📡 Status Tag removal broadcast successful');
    })
    .catch((error) => {
        console.error('❌ Status Tag removal failed:', error);
    });
}

/**
 * Broadcast Hard Move or Soft Move result to specific player
 */
function broadcastMoveResult(playerId, moveResultData) {
    const sessionId = getSessionId();

    if (!sessionId) {
        console.warn('⚠️ No session ID');
        return Promise.reject('No session ID');
    }

    const broadcastRef = database.ref(`sessions/${sessionId}/mcBroadcasts/players/${playerId}/moveResult`);

    return broadcastRef.set({
        ...moveResultData,
        timestamp: Date.now()
    })
    .then(() => {
        console.log('📡 Move result broadcast successful');
    })
    .catch((error) => {
        console.error('❌ Move result broadcast failed:', error);
    });
}

// ================================
// EXPORTS
// ================================

window.mcBroadcast = {
    startListeningToPlayers,
    stopListeningToPlayers,
    broadcastToAllPlayers,
    broadcastStoryTag,
    broadcastStatusTag,
    removeStoryTag,
    removeStatusTag,
    broadcastMoveResult
};
