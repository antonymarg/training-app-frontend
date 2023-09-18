import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { SendFollowUpContainer } from './sendFollowUp.style';
import { trainingModule } from '../../../Firebase';

interface IFollowUpOnCreate {
  file: File | null;
  title: string;
  description: string;
}

const defaultState: IFollowUpOnCreate = {
  file: null,
  title: '',
  description: '',
};

export function SendFollowUpPage({
  onSent,
}: {
  onSent: (refresh: boolean) => Promise<void>;
}) {
  const { trainingId } = useParams();
  const [formData, setFormData] = useState<IFollowUpOnCreate>(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const onContinue = async () => {
    if (!formData.file) return;
    setIsLoading(true);
    await trainingModule.uploadFollowUpMaterial(trainingId as string, {
      ...formData,
      file: formData.file as File,
    });
    setIsLoading(false);
    await onSent(true);
  };

  return (
    <SendFollowUpContainer>
      <Stack style={{ gridArea: 'form' }} direction="column" spacing={1}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography>
            {formData.file
              ? `You've selected: ${formData.file.name}`
              : 'Please select your file'}
          </Typography>
          <input
            accept="*"
            id="upload-file"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) =>
              e.target.files?.length
                ? setFormData({
                    ...formData,
                    file: e.target.files[0],
                  })
                : formData.file
            }
          />
          <label htmlFor="upload-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              sx={{ textAlign: 'center' }}
            >
              {formData.file ? 'or change your selection' : 'Select a file'}
            </Button>
          </label>
        </Stack>
        <TextField
          label="Title"
          fullWidth
          onChange={(v) => setFormData({ ...formData, title: v.target.value })}
        />
        <TextField
          label="Description"
          multiline
          minRows={2}
          fullWidth
          onChange={(v) =>
            setFormData({ ...formData, description: v.target.value })
          }
        />
      </Stack>
      <Button
        variant="contained"
        size="large"
        onClick={onContinue}
        style={{ gridArea: 'button' }}
      >
        {isLoading ? (
          <CircularProgress color="secondary" size={25} />
        ) : (
          'Upload'
        )}
      </Button>
    </SendFollowUpContainer>
  );
}
