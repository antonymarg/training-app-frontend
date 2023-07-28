import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../Models/Notifications/selector';
import { AppDispatch } from '../../Store';
import { updateNotifications } from '../../Models/Notifications/actions';
import {
  INotification,
  eRecipientStatus,
} from '../../Models/Notifications/types';
import { notificationsModule } from '../../Firebase';
import { getUserProfile } from '../../Models/User/selectors';
import { useNavigate } from 'react-router-dom';

export function useNotifications() {
  const notifications = useSelector(getNotifications);
  const navigate = useNavigate();
  const profile = useSelector(getUserProfile);
  const dispatch = useDispatch<AppDispatch>();
  const userId = profile?.userId as string;

  useEffect(() => {
    notificationsModule.createNotifsListener(
      userId,
      (notifications: INotification[]) => {
        dispatch(updateNotifications(notifications));
      }
    );
  }, [dispatch, userId]);

  const onNotificationClick = (notification: INotification) => {
    if (!(notification.recipients[userId] === eRecipientStatus.seen))
      notificationsModule.markNotificationAsSeen(
        notification.notificationId,
        userId
      );
    if (
      (notification.type === 'invitation' ||
        notification.type === 'announcement') &&
      notification.trainingId
    )
      navigate('trainings/' + notification.trainingId);
  };

  return { notifications, onNotificationClick, userId };
}
