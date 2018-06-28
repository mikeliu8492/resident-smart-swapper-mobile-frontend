import {combineReducers} from 'redux';
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';
import SetCurrentLoggedUserReducer from './SetCurrentLoggedUserReducer'
import TimezoneReducer from './TimezoneReducer'

export default combineReducers({
    libraries: LibraryReducer,
    selectedLibraryId: SelectionReducer,
    currentLoggedUser: SetCurrentLoggedUserReducer,
    timezone: TimezoneReducer
})