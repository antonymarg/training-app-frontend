import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { trainingModule } from '../../Firebase';
import moment from 'moment';
import { eTrainingConfirmStatus, eTrainingTopics } from '../../lib/enums';
import { IUserRole } from '../../Models/User/types';
import { InfoTable } from '../InfoTable/InfoTable';

interface ITrainingTableProps {
  role: IUserRole;
  userId: string;
  timePeriod: 'past' | 'presentAndFuture' | 'all';
  trainingStatus: eTrainingConfirmStatus;
  allowAddTrainingButton: boolean;
  label: string;
  showFooter?: boolean;
}
type ITrainingDetailsTable = {
  id: string;
  title: string;
  topic: string;
  date: string;
};

export function TrainingsTable({
  userId,
  label,
  allowAddTrainingButton,
  showFooter,
  ...searchCriteria
}: ITrainingTableProps) {
  const [trainings, setTrainings] = useState<ITrainingDetailsTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      let res = await trainingModule.getTrainings(
        userId,
        searchCriteria.role,
        searchCriteria
      );
      setTrainings(
        res.map((training) => {
          let { id, title, topic, startDate } = training;
          return {
            id,
            title,
            topic: eTrainingTopics[topic],
            date: moment.unix(startDate.seconds).calendar(),
          };
        })
      );
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <InfoTable
      isLoading={isLoading}
      noDataMessage="No trainings"
      tableData={{
        headers: ['Title', 'Topic', 'Starting'].map((h) => ({ label: h })),
        data: [...trainings],
      }}
      title={label}
      showCreateButton={allowAddTrainingButton}
      onCreateClick={() => navigate('/create')}
      createButtonLabel="Add Training"
      onRowClick={(e, id) => navigate(`/trainings/${id}`)}
      showFooter={showFooter}
    />
  );
}
