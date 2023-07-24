import { onValue, ref, push, child, set, update } from 'firebase/database';
import { realtimeDb } from '../firebase';
import {
  INotification,
  INotificationOnCreate,
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
      id: notificationId,
      ...notification[notificationId],
    });
  });
};

const sendNotification = (
  userId: string,
  notification: INotificationOnCreate
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
};
