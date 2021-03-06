import {SET_CURRENT_LOGGED_USER, CLEAR_CURRENT_USER} from '../actions/types'

const INITIAL_STATE = {
    userInfo: {
        "_id":"123456",
        "last_name":"TestResident",
        "program":"5aad778b5510ca04d47dc965",
        "email":"resident.email@gmail.com",
        "year":1,
        "login_id":"123456",
        "first_name":"TestResident",
    },
    loggedIn: false

}

export default (state=INITIAL_STATE, action) => {

    switch (action.type){
        case SET_CURRENT_LOGGED_USER:
            return {userInfo: action.payload, loggedIn: true}
        case CLEAR_CURRENT_USER:
            return INITIAL_STATE
        default:
            return state;
    }
}