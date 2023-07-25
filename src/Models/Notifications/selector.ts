import { IRootState } from '../types';

export const getNotifications = (state: IRootState) => {
  const notifs = state.notifications;
  const notifIds = Object.keys(notifs);
  return notifIds.map((id) => notifs[id]);
};
