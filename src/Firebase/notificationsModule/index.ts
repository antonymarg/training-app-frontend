import { onValue, ref, push, child, set, update, get } from 'firebase/database';
import { realtimeDb } from '../firebase';
import {
  INotification,
  INotificationBodyOnCreate,
} from '../../Models/Notifications/types';

const createNotifsListener = (
  userId: string,
  callback: (notif: INotification) => void
) => {
  const notifRef = ref(realtimeDb, 'notifs/' + userId);
  return onValue(notifRef, (snap) => {
    if (snap.val() === null) return;
    const notification = snap.val();
    const notificationId = Object.keys(notification)[0];
    callback({
      [notificationId]: {
        ...notification[notificationId],
        notificationId,
      },
    });
  });
};

const getNotifications = async (userId: string) => {
  const snapshot = await get(child(ref(realtimeDb), `notifs/${userId}`));
  if (snapshot.exists()) return snapshot.val() as INotification;
  return null;
};

const sendNotification = (
  userId: string,
  notification: INotificationBodyOnCreate
) => {
  const newNotifKey = push(child(ref(realtimeDb), 'notifs/' + userId)).key;
  const notifRef = ref(realtimeDb, `notifs/${userId}/${newNotifKey}`);
  set(notifRef, notification);
};

const markNotificationAsSeen = (userId: string, notificationId: string) => {
  const notifRef = ref(realtimeDb, `notifs/${userId}/${notificationId}`);
  update(notifRef, { seen: true });
};

export const notificationsModule = {
  createNotifsListener,
  sendNotification,
  markNotificationAsSeen,
  getNotifications,
};
