import { Timestamp } from 'firebase/firestore';

export enum eRecipientStatus {
  notReceived,
  received,
  seen,
}

export type INotificationTypes = 'announcement' | 'invitation' | 'reminder';

export interface INotificationBodyOnCreate {
  senderId: string;
  title: string;
  mainText: string;
  type: INotificationTypes;
  trainingId: string;
  recipients: {
    [key: string]: eRecipientStatus;
  };
}

export interface INotification extends INotificationBodyOnCreate {
  notificationId: string;
  sentAt: Timestamp;
}

export type INotificationsState = INotification[];
