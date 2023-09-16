import { useState } from 'react';
import { ITaskOnCreate } from '../../../Firebase/tasksModule/tasksModule.types';
import { Timestamp } from 'firebase/firestore';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { notificationsModule } from '../../../Firebase';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { taskModule } from '../../../Firebase/tasksModule';

export const useCreateTask = (
  training: ITraining,
  onCreated: (refresh: boolean) => void
) => {
  const userProfile = useSelector(getUserProfile);
  const [formData, setFormData] = useState<ITaskOnCreate>({
    title: '',
    description: '',
    deadline: Timestamp.now(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onCreateTask = async () => {
    setIsLoading(true);
    await taskModule.createTask(
      training.id,
      userProfile?.userId as string,
      formData,
      Object.keys(training.participants)
    );
    await notificationsModule.sendNotification({
      senderId: userProfile?.userId as string,
      title: 'New task: ' + formData.title,
      mainText: 'You have a new task for ' + training.title,
      type: 'task',
      trainingId: training.id,
      recipients: Object.keys(training.participants),
    });
    onCreated(true);
    setIsLoading(false);
  };
  return { formData, setFormData, onCreateTask, isLoading };
};
