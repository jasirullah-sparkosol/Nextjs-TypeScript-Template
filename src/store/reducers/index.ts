// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';
import users from './users';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    snackbar,
    users
});

export default reducers;
