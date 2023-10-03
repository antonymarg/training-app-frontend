import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../Models/Notifications/selector';
import { AppDispatch } from '../../Store';
import { updateNotifications } from '../../Models/Notifications/actions';
import { INotification } from '../../Models/Notifications/types';
import { notificationsModule } from '../../Firebase';
import { getUserProfile } from '../../Models/User/selectors';
import { useNavigate } from 'react-router-dom';
import { eRecipientStatus } from '../../lib/enums';

export function useNotifications() {
  const notifications = useSelector(getNotifications);
  const navigate = useNavigate();
  const profile = useSelector(getUserProfile);
  const dispatch = useDispatch<AppDispatch>();
  const userId = profile?.userId as string;

  useEffect(() => {
    notificationsModule.getNotificationsListener(
      userId,
      async (
        fetchedNotifications: [id: string, status: eRecipientStatus][]
      ) => {
        const notifications: INotification[] = [];
        for (const fetchedNotif of fetchedNotifications) {
          let notif = await notificationsModule.getNotificationById(
            fetchedNotif[0]
          );
          if (notif.notificationId)
            notifications.push({
              ...notif,
              status: fetchedNotif[1],
            });
        }
        notifications.sort((a, b) =>
          a.sentAt.seconds > b.sentAt.seconds ? -1 : 1
        );
        if (notifications.length !== 0)
          dispatch(updateNotifications(notifications));
      }
    );
  }, [dispatch, userId]);

  const onNotificationClick = (notification: INotification) => {
    if (!(notification.status === eRecipientStatus.seen))
      notificationsModule.markNotificationAsSeen(
        notification.notificationId,
        userId
      );
    if (notification.trainingId)
      navigate('trainings/' + notification.trainingId);
  };

  return { notifications, onNotificationClick };
}
