import {
    TIMEZONE_UPDATE
} 
from './types'    


export const timezoneUpdate = (tz) => {
    return {
        type: TIMEZONE_UPDATE,
        payload: tz
    }
}