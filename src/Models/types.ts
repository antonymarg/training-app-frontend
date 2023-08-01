import { INotificationsState } from './Notifications/types';
import { IUserState } from './User/types';

export interface IRootState {
  user: IUserState;
  notifications: INotificationsState;
}
