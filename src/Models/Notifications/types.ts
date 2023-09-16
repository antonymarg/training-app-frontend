import { Timestamp } from 'firebase/firestore';
import { eRecipientStatus } from '../../lib/enums';

export type INotificationTypes =
  | 'announcement'
  | 'task'
  | 'invitation'
  | 'reminder';

export interface INotificationBodyOnCreate {
  senderId: string;
  title: string;
  mainText: string;
  type: INotificationTypes;
  trainingId: string;
  recipients: string[];
}

export interface IFetchedNotification {
  notificationId: string;
  sentAt: Timestamp;
  senderId: string;
  title: string;
  mainText: string;
  type: INotificationTypes;
  trainingId: string;
}
export interface INotification extends IFetchedNotification {
  status: eRecipientStatus;
}

export type INotificationsState = INotification[];
