import { useState } from 'react';
import { ITaskOnCreate } from '../../../Firebase/tasksModule/tasksModule.types';
import { Timestamp } from 'firebase/firestore';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';

export const useCreateTask = (
  training: ITraining,
  onCreated: (refresh: boolean) => void
) => {
  const [formData, setFormData] = useState<ITaskOnCreate>({
    title: '',
    description: '',
    deadline: Timestamp.now(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onCreateTask = () => {
    setIsLoading(true);
    onCreated(true);
    setIsLoading(false);
  };
  return { formData, setFormData, onCreateTask, isLoading };
};
