import { Typography, Button } from '@mui/material';
import { TrainingsContainer, TrainingsHeader } from './trainings.style';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export function Trainings() {
  const navigate = useNavigate();
  return (
    <TrainingsContainer>
      <TrainingsHeader>
        <Typography variant="body1" color="secondary" sx={{ gridArea: 'text' }}>
          <b>My trainings</b>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ gridArea: 'button' }}
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
        >
          Add training
        </Button>
      </TrainingsHeader>
      <div style={{ height: '200px' }}></div>
    </TrainingsContainer>
  );
}
