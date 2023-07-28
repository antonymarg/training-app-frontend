import { IRootState } from '../types';

export const getNotifications = (state: IRootState) => {
  return state.notifications;
};
