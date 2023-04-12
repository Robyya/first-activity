export const state = () => ({
    loading: {
        value: false,
        text: null
    },
    notification: {
        value: false,
        text: null
    },
})

export const mutations = {
    setLoadingProperty(state, { property = "", value = false } = {}) {
        state.loading[property] = value
    },
    setNotificationProperty(state, { property = "", value = false } = {}) {
        state.notification[property] = value
    }
}

export const actions = {
    setLoadingProperty({ commit }, { property = "", value = false } = {}) {
        commit('setLoadingProperty', { property, value })
    },
    setNotificationProperty({ commit }, { property = "", value = false } = {}) {
        commit('setNotificationProperty', { property, value })
    }
}