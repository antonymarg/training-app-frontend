import { Timestamp } from 'firebase/firestore';

export type INotificationTypes = 'announcement' | 'invitation' | 'reminder';

export interface INotificationBodyOnCreate {
  type: INotificationTypes;
  title: string;
  mainText: string;
  seen: boolean;
  sentAt: Timestamp;
  extraInfo?: {
    senderId?: string;
    trainingId?: string;
  };
}

export interface INotificationBody extends INotificationBodyOnCreate {
  notificationId: string;
}

export interface INotification {
  [id: string]: INotificationBody;
}

export interface INotificationsState {
  [key: string]: INotificationBody;
}
