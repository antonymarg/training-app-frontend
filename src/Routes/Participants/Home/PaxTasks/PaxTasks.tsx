import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ITask } from '../../../../Firebase/tasksModule/tasksModule.types';
import { taskModule } from '../../../../Firebase/tasksModule';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../../Models/User/selectors';
import { IUserProfile } from '../../../../Models/User/types';
import { Task } from '../../../../Components';

export function PaxTasks() {
  const { userId } = useSelector(getUserProfile) as IUserProfile;
  const [tasks, setTasks] = useState<ITask[]>([]);
  useEffect(() => {
    (async function () {
      const taskRes = await taskModule.getUserTasks(userId);
      setTasks(taskRes.filter((task) => task.status === 'pending'));
    })();
  }, [userId]);
  return (
    <Stack spacing={1}>
      <Typography variant="h4">My tasks</Typography>
      {tasks.length ? (
        <Stack direction="row" flexWrap="wrap" spacing={2}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              showTraining={true}
              userRole="participant"
            />
          ))}
        </Stack>
      ) : (
        <Typography>Congrats! No tasks for you</Typography>
      )}
    </Stack>
  );
}
