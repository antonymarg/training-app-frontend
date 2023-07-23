import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { TrainingsHeader } from './trainingsTable.style';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { trainingModule } from '../../Firebase';
import { ITraining } from '../../Firebase/trainingModule/trainingModule.types';
import moment from 'moment';
import { eTrainingConfirmStatus, eTrainingTypes } from '../../lib/enums';
import { IUserRole } from '../../Models/User/types';
import { FullBodyLoader } from '../FullBodyLoader/FullBodyLoader';

interface ITrainingTableProps {
  role: IUserRole;
  userId: string;
  timePeriod: 'past' | 'presentAndFuture' | 'all';
  trainingStatus: eTrainingConfirmStatus[];
  allowAddTrainingButton: boolean;
  label: string;
}

export function TrainingsTable({
  userId,
  label,
  allowAddTrainingButton,
  ...searchCriteria
}: ITrainingTableProps) {
  const [trainings, setTrainings] = useState<ITraining[]>([]);
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
      setTrainings(res);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  if (isLoading) return <FullBodyLoader />;

  const getTableBody = () => {
    if (trainings.length === 0)
      return (
        <TableRow>
          <TableCell colSpan={3}>
            <Typography color="gray">No trainings available</Typography>
          </TableCell>
        </TableRow>
      );
    return trainings.map((e) => (
      <TableRow hover key={e.id} onClick={() => navigate(`/trainings/${e.id}`)}>
        <TableCell>{e.title}</TableCell>
        <TableCell>{eTrainingTypes[e.type]}</TableCell>
        <TableCell>{moment(e.startDate).calendar()}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ padding: 0 }}>
            <TableCell colSpan={4} style={{ padding: '0px' }}>
              <TrainingsHeader>
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{ gridArea: 'text' }}
                >
                  <b>{label}</b>
                </Typography>
                {allowAddTrainingButton && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ gridArea: 'button' }}
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/create')}
                  >
                    Add training
                  </Button>
                )}
              </TrainingsHeader>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{getTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
}
