export const selectLibrary = (libraryId) => {
    return {
        type: "select_library",
        payload: libraryId
    }
}

export const setCurrentUser = (userObject) => {
    return {
        type: "set_current_logged_user",
        payload: userObject
    }
}