import { useState, useEffect } from 'react';
import { InfoTable } from '../InfoTable/InfoTable';
import { notificationsModule } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

interface INotificationsTableProps {
  showAddAnnouncements: boolean;
  userId: string;
  trainingId: string;
}

type INotificationsDetailsTable = {
  id: string;
  title: string;
  type: string;
  text: string;
};

export function NotificationsTable({
  showAddAnnouncements,
  userId,
  trainingId,
}: INotificationsTableProps) {
  const [notifications, setNotifications] = useState<
    INotificationsDetailsTable[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      let res = await notificationsModule.getNotifications(userId, trainingId);
      setNotifications(
        res.map((e) => ({
          id: e.notificationId,
          title: e.title,
          type: e.type,
          text: e.mainText,
        }))
      );
      setIsLoading(false);
    })();
  }, [userId, trainingId]);

  return (
    <InfoTable
      isLoading={isLoading}
      noDataMessage="No announcements"
      tableData={{
        headers: ['Title', 'Type', 'Sent at'].map((h) => ({ label: h })),
        data: [...notifications],
      }}
      title="Announcements"
      showCreateButton={showAddAnnouncements}
      onCreateClick={() => navigate('/announce')}
      createButtonLabel="Send announcement"
    />
  );
}
