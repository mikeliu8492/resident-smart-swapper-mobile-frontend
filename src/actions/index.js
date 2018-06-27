import {SET_CURRENT_LOGGED_USER, CLEAR_CURRENT_USER} from './types'

export const selectLibrary = (libraryId) => {
    return {
        type: "select_library",
        payload: libraryId
    }
}

// USER ACTIONS

export const setCurrentUser = (userObject) => {
    return {
        type: SET_CURRENT_LOGGED_USER,
        payload: userObject
    }
}

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}