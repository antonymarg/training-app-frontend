import {
  onValue,
  ref,
  push,
  set,
  get,
  query,
  orderByChild,
  startAt,
} from 'firebase/database';
import { realtimeDb } from '../firebase';
import {
  INotification,
  INotificationBodyOnCreate,
  eRecipientStatus,
} from '../../Models/Notifications/types';
import { Timestamp } from 'firebase/firestore';

const notificationsRef = ref(realtimeDb, 'notifications');

const createNotifsListener = (
  userId: string,
  callback: (notif: INotification[]) => void
) => {
  const notificationsQuery = query(
    notificationsRef,
    orderByChild(`recipients/${userId}`),
    startAt(1)
  );

  return onValue(notificationsQuery, (snapshot) => {
    const notifications: INotification[] = [];
    snapshot.forEach((childSnapshot) => {
      const notification: INotification = childSnapshot.val() ?? [];
      notifications.push(notification);
    });
    callback(notifications);
  });
};

const getNotifications = async (userId: string, trainingId?: string) => {
  const notificationsQuery = query(
    notificationsRef,
    orderByChild(`recipients/${userId}`),
    startAt(1)
  );

  const snapshot = await get(notificationsQuery);
  const notifications: INotification[] = [];
  snapshot.forEach((childSnapshot) => {
    const notification: INotification = childSnapshot.val();
    if (trainingId && notification.trainingId !== trainingId) return;
    notifications.push(notification);
  });
  return notifications;
};

const sendNotification = (notificationBody: INotificationBodyOnCreate) => {
  const newNotificationRef = push(notificationsRef);
  const notification: INotification = {
    notificationId: newNotificationRef.key as string,
    sentAt: Timestamp.now(),
    ...notificationBody,
  };

  set(newNotificationRef, notification);
};

const markNotificationAsSeen = (
  notificationId: string,
  recipientId: string
) => {
  const field = ref(
    realtimeDb,
    `notifications/${notificationId}/recipients/${recipientId}`
  );
  set(field, eRecipientStatus.seen);
};

export const notificationsModule = {
  createNotifsListener,
  sendNotification,
  markNotificationAsSeen,
  getNotifications,
};
