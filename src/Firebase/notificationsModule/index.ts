import {
  onValue,
  ref,
  push,
  set,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from 'firebase/database';
import { realtimeDb } from '../firebase';
import {
  IFetchedNotification,
  INotification,
  INotificationBodyOnCreate,
} from '../../Models/Notifications/types';
import { Timestamp } from 'firebase/firestore';
import { eRecipientStatus } from '../../lib/enums';

type userNotifs = [id: string, status: eRecipientStatus][];

const notificationsRef = ref(realtimeDb, 'notifications');
const userNotificationsRef = (userId: string) =>
  ref(realtimeDb, 'userNotifications/' + userId);

const getNotificationById = async (notificationId: string) => {
  const notificationSnapshot = await get(
    query(ref(realtimeDb, `notifications/${notificationId}`))
  );
  let notification: Partial<IFetchedNotification> = {};
  notificationSnapshot.forEach((e) => {
    if (e.key) notification[e.key as keyof IFetchedNotification] = e.val();
  });
  return notification as IFetchedNotification;
};

const getNotificationUserStatus = async (
  userId: string,
  notificationId: string
) => {
  const userNotifSnapshot = await get(
    query(ref(realtimeDb, `userNotifications/${userId}/${notificationId}`))
  );
  let statusArr: eRecipientStatus[] = [];
  userNotifSnapshot.forEach((e) => {
    statusArr.push(e.val());
  });
  return statusArr[0];
};

const _sortNotifications = (
  notifications: INotification[] | IFetchedNotification[]
) => {
  return notifications.sort((a, b) =>
    a.sentAt.seconds > b.sentAt.seconds ? -1 : 1
  );
};

const sendNotification = (newNotification: INotificationBodyOnCreate) => {
  const newNotificationRef = push(notificationsRef);
  const { recipients, ...notificationBody } = newNotification;

  const notification: IFetchedNotification = {
    notificationId: newNotificationRef.key as string,
    sentAt: Timestamp.now(),
    ...notificationBody,
  };
  set(newNotificationRef, notification);

  recipients.forEach((user) => {
    const userNotif = userNotificationsRef(user);
    update(userNotif, {
      [newNotificationRef.key as string]: eRecipientStatus.received,
    });
  });
};

const getAllAnnouncementsForTraining = async (
  trainingId: string,
  userId: string
): Promise<INotification[]> => {
  const notificationsQuery = query(
    notificationsRef,
    orderByChild(`trainingId`),
    equalTo(trainingId)
  );
  const snapshot = await get(notificationsQuery);
  const notifications: INotification[] = [];
  snapshot.forEach((childSnapshot) => {
    const notification: IFetchedNotification = childSnapshot.val();
    if (notification.type === 'announcement' || notification.type === 'task')
      notifications.push({
        ...notification,
        status: eRecipientStatus.notReceived,
      });
  });
  for (const notificationInd in notifications) {
    let status = await getNotificationUserStatus(
      userId,
      notifications[notificationInd].notificationId
    );
    notifications[notificationInd].status = status;
  }
  return _sortNotifications(notifications) as INotification[];
};

const getNotificationsListener = (
  userId: string,
  callback: (notifications: userNotifs) => void
) => {
  const notificationsQuery = query(
    ref(realtimeDb, '/userNotifications/' + userId)
  );

  return onValue(notificationsQuery, (snapshot) => {
    let fetchedNotifications: userNotifs = [];
    snapshot.forEach((childSnapshot) => {
      fetchedNotifications.push([
        childSnapshot.key as string,
        childSnapshot.val(),
      ]);
    });

    callback(fetchedNotifications);
  });
};

const markNotificationAsSeen = (
  notificationId: string,
  recipientId: string
) => {
  const userRef = userNotificationsRef(recipientId);
  set(userRef, { [notificationId]: eRecipientStatus.seen });
};

export const notificationsModule = {
  sendNotification,
  markNotificationAsSeen,
  getAllAnnouncementsForTraining,
  getNotificationsListener,
  getNotificationUserStatus,
  getNotificationById,
};
