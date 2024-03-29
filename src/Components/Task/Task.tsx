import { Button, Divider, Link, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TransparentChip } from '../TransparentChip/TransparentChip';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import moment from 'moment';
import { ITask } from '../../Firebase/tasksModule/tasksModule.types';
import styled from 'styled-components';
import { IUserRole } from '../../Models/User/types';
import CheckIcon from '@mui/icons-material/Check';
interface ITaskProps {
  task: ITask;
  onTaskComplete?: (taskId: string) => Promise<void>;
  onRemind?: (task: ITask) => Promise<void>;
  showTraining?: boolean;
  userRole: IUserRole;
}

export function Task({
  task,
  onTaskComplete,
  onRemind,
  showTraining,
  userRole,
}: ITaskProps) {
  return (
    <TasksContainer>
      <Stack direction="column" spacing={1}>
        <Typography fontWeight="bold" fontSize="1.2rem">
          {task.title}
        </Typography>
        {task.status && (
          <Stack direction="row" spacing={1}>
            {task.status === 'pending' && (
              <TransparentChip
                label="Pending"
                color="secondary"
                variant="outlined"
                size="small"
              />
            )}
            {task.status === 'completed' && (
              <TransparentChip
                variant="outlined"
                label="Done"
                color="info"
                size="small"
              />
            )}
            {task.status === 'pending' &&
              moment().isAfter(task.deadline.seconds * 1000) && (
                <TransparentChip
                  variant="outlined"
                  label="Overdue"
                  color="error"
                  size="small"
                />
              )}
          </Stack>
        )}
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <HourglassTopIcon color="disabled" fontSize="small" />
        <Typography variant="subtitle2" color={grey[700]}>
          {moment.unix(task.deadline.seconds).calendar()}
        </Typography>
      </Stack>
      {userRole === 'trainer' && task.completedBy && (
        <Stack direction="row" spacing={0.5}>
          <CheckIcon color="disabled" fontSize="small" />
          <Typography variant="subtitle2" color={grey[700]}>
            Completed by{' '}
            {task.completedBy ? task.completedBy.join(', ') : 'none'}
          </Typography>
        </Stack>
      )}
      {showTraining && (
        <Link href={`/trainings/${task.trainingId}`}>
          <Typography variant="subtitle2" color={grey[700]}>
            Go to training
          </Typography>
        </Link>
      )}
      <Divider style={{ margin: '8px 0px' }} />
      <Typography>{task.description}</Typography>
      {userRole === 'participant' &&
        task.status === 'pending' &&
        onTaskComplete && (
          <Button
            size="small"
            variant="contained"
            onClick={async () => {
              await onTaskComplete(task.id);
            }}
          >
            Mark as completed
          </Button>
        )}
      {userRole === 'trainer' && onRemind && (
        <Button
          size="small"
          variant="contained"
          onClick={async () => {
            await onRemind(task);
          }}
        >
          Send reminder
        </Button>
      )}
    </TasksContainer>
  );
}

const TasksContainer = styled.div`
  border-radius: 20px;
  border: 1px solid ${grey[300]};
  padding: 16px;
  max-width: 500px;
  display: grid;
  gap: 4px;
`;
