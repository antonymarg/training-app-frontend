import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../Models/Notifications/selector';
import { AppDispatch } from '../../Store';
import { addNotification } from '../../Models/Notifications/actions';
import { INotification } from '../../Models/Notifications/types';
import { notificationsModule } from '../../Firebase';
import { getUserProfile } from '../../Models/User/selectors';
import { useNavigate } from 'react-router-dom';

export function useNotifications() {
  const notifications = useSelector(getNotifications);
  const navigate = useNavigate();
  const profile = useSelector(getUserProfile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let listener = notificationsModule.createNotifsListener(
      profile?.userId as string,
      (notif: INotification) => dispatch(addNotification(notif))
    );
    return () => listener();
  }, [dispatch, profile?.userId]);

  const onNotificationClick = (notification: INotification) => {
    if (!notification.seen)
      notificationsModule.markNotificationAsSeen(
        profile?.userId as string,
        notification.id
      );
    if (
      notification.type === 'invitation' &&
      notification.extraInfo?.trainingId
    )
      navigate('trainings/' + notification.extraInfo.trainingId);
  };

  return { notifications, onNotificationClick };
}
