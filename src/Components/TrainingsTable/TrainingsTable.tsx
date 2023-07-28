import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { trainingModule } from '../../Firebase';
import moment from 'moment';
import { eTrainingConfirmStatus } from '../../lib/enums';
import { IUserRole } from '../../Models/User/types';
import { InfoTable } from '../InfoTable/InfoTable';

interface ITrainingTableProps {
  role: IUserRole;
  userId: string;
  timePeriod: 'past' | 'presentAndFuture' | 'all';
  trainingStatus: eTrainingConfirmStatus;
  allowAddTrainingButton: boolean;
  label: string;
}
type ITrainingDetailsTable = {
  id: string;
  title: string;
  type: string;
  date: string;
};

export function TrainingsTable({
  userId,
  label,
  allowAddTrainingButton,
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
          let { id, title, type, startDate } = training;
          return { id, title, type, date: moment(startDate).calendar() };
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
        headers: ['Title', 'Type', 'Data'].map((h) => ({ label: h })),
        data: [...trainings],
      }}
      title={label}
      showCreateButton={allowAddTrainingButton}
      onCreateClick={() => navigate('/create')}
      createButtonLabel="AddTraining"
      onRowClick={(e, id) => navigate(`/trainings/${id}`)}
    />
  );
}
