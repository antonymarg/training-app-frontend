import { combineReducers } from 'redux';
import { userReducer } from './User';
import { reducer as notificationsReducer } from './Notifications';

export const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
});
