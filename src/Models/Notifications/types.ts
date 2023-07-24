export type INotificationTypes = 'announcement' | 'invitation' | 'reminder';

export interface INotificationOnCreate {
  type: INotificationTypes;
  title: string;
  mainText: string;
  seen: boolean;
  extraInfo?: {
    senderId?: string;
    trainingId?: string;
  };
}

export interface INotification extends INotificationOnCreate {
  id: string;
}

export interface INotificationsState {
  activeNotifications: {
    [key: string]: INotification;
  };
}
