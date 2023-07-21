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
import { TrainingsHeader } from './trainings.style';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { trainingModule } from '../../Firebase';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../Models/User/selectors';
import { ITraining } from '../../Firebase/trainingModule/trainingModule.types';
import moment from 'moment';
import { eTrainingTypes } from '../../lib/enums';
import { IUserRole } from '../../Models/User/types';
import { FullBodyLoader } from '../FullBodyLoader/FullBodyLoader';

export function Trainings() {
  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userId, role } = useSelector(getUserProfile);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      let res = await trainingModule.getMyTrainings(
        userId as string,
        role as IUserRole
      );
      setTrainings(res);
      setIsLoading(false);
    })();
  }, [userId, role]);
  if (isLoading) return <FullBodyLoader />;

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
                  <b>My trainings</b>
                </Typography>
                {role === 'trainer' && (
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
        <TableBody>
          {trainings.map((e) => (
            <TableRow
              hover
              key={e.id}
              onClick={() => navigate(`/trainings/${e.id}`)}
            >
              <TableCell>{e.title}</TableCell>
              <TableCell>{eTrainingTypes[e.type]}</TableCell>
              <TableCell>{moment(e.startDate).calendar()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
