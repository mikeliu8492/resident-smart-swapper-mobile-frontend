import {TIMEZONE_UPDATE} from '../actions/types'
import {ET} from '../utility/Constants'

const INITIAL_STATE = ET

export default (state=INITIAL_STATE, action) => {

    switch (action.type){
        case TIMEZONE_UPDATE:
            return action.payload
        default:
            return state;
    }
}