import Vue from 'vue'

export default {
    SET_SUMMONS (state, summons) {      
        state.summons = summons
    },
    SET_LOCATION_OPTIONS (state, locations) {
        state.locationOptions = locations
    },
    SET_GROUP_OPTIONS (state, groups) {
        state.groupOptions = groups
    },
    SET_CONTACT_OPTIONS (state, contacts) {
        state.contactOptions = contacts
    },
    CREATE_SUMMON (state, summon) {
        state.summons.push(summon)
    },

    ///////////////////////////////////////////////////////////////////////

    UPDATE_ABOUT_CHAT (state, obj) {
        obj.rootState.AppActiveUser.about = obj.value
    },
    UPDATE_STATUS_CHAT (state, obj) {
        obj.rootState.AppActiveUser.status = obj.value
    },

    // API AFTER
    SEND_CHAT_MESSAGE (state, payload) {
    if (payload.chatData) {
        // If there's already chat. Push msg to existing chat
        state.chats[Object.keys(state.chats).find(key => Number(key) === payload.id)].msg.push(payload.msg)
    } else {
        // Create New chat and add msg
        const chatId = payload.id
        Vue.set(state.chats, [chatId], { isPinned: payload.isPinned,
        msg: [payload.msg] })
    }
    },
    UPDATE_CONTACTS (state, contacts) {
        state.contacts = contacts
    },
    UPDATE_CHAT_CONTACTS (state, chatContacts) {
        state.chatContacts = chatContacts
    },
    UPDATE_CHATS (state, chats) {
        state.chats = chats
    },
    SET_CHAT_SEARCH_QUERY (state, query) {
        state.chatSearchQuery = query
    },
    MARK_SEEN_ALL_MESSAGES (state, payload) {
        payload.chatData.msg.forEach((msg) => {
            msg.isSeen = true
        })
    },
    TOGGLE_IS_PINNED (state, payload) {
        state.chats[Object.keys(state.chats).find(key => Number(key) === payload.id)].isPinned = payload.value
    }
  }
