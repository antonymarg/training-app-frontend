import { useParams } from 'react-router-dom';
import { DateTimePicker, FullBodyLoader } from '../../../Components';
import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useCreateTask } from './useCreateTask';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';

export function CreateTaskPage({
  onCreated,
  training,
}: {
  onCreated: (refresh: boolean) => Promise<void>;
  training: ITraining;
}) {
  const { trainingId } = useParams();
  const { formData, setFormData, onCreateTask, isLoading } = useCreateTask(
    training,
    onCreated
  );

  if (!trainingId) return <FullBodyLoader />;
  return (
    <Stack spacing={2}>
      <TextField
        id="title"
        label="Title"
        value={formData.title}
        required
        fullWidth
        onChange={(v) => setFormData({ ...formData, title: v.target.value })}
      />
      <TextField
        id="description"
        label="Description"
        value={formData.description}
        multiline
        minRows={2}
        fullWidth
        onChange={(v) =>
          setFormData({ ...formData, description: v.target.value })
        }
      />
      <DateTimePicker
        value={formData.deadline}
        setValue={(v) => setFormData({ ...formData, deadline: v })}
        label="Deadline"
        id="deadline"
      />

      <Button
        variant="contained"
        size="large"
        onClick={onCreateTask}
        style={{ width: 'min-content', marginLeft: 'auto' }}
      >
        {isLoading ? (
          <CircularProgress color="secondary" size={25} />
        ) : (
          'Create'
        )}
      </Button>
    </Stack>
  );
}
