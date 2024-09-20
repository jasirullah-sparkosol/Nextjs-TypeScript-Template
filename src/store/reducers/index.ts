// third-party
import { combineReducers } from 'redux';
import { apiReducers } from 'api/services';

// project import
import menu from './menu';
import snackbar from './snackbar';
import users from './users';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    snackbar,
    users,
    ...apiReducers
});

export default reducers;
