import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { PersonalDataContainer } from './personalDataPage.style';
import { SignupSteps } from '../SignupPage';
import { usePersonalDataPage } from './usePersonalDataPage';
import { IUserRole } from '../../../../Models/User/types';

export function PersonalDataPage({
  setStep,
}: {
  setStep: (step: SignupSteps) => void;
}) {
  const { formData, setFormData, errors, isLoading, onContinue } =
    usePersonalDataPage(setStep);
  return (
    <PersonalDataContainer>
      <TextField
        id="name"
        label="Name"
        value={formData.name}
        onChange={(v) => setFormData({ ...formData, name: v.target.value })}
        error={Boolean(errors.nameError)}
        helperText={errors.nameError}
      />
      <TextField
        id="surame"
        label="Surame"
        value={formData.surname}
        onChange={(v) => setFormData({ ...formData, surname: v.target.value })}
        error={Boolean(errors.surnameError)}
        helperText={errors.surnameError}
      />
      <InputLabel id="role-label">User role</InputLabel>
      <Select
        id="userRole"
        labelId="role-label"
        value={formData.role}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value as IUserRole })
        }
      >
        <MenuItem value={'participant'}>Participant</MenuItem>
        <MenuItem value={'trainer'}>Trainer</MenuItem>
      </Select>
      <Button
        variant="contained"
        size="large"
        style={{ alignSelf: 'center' }}
        onClick={onContinue}
      >
        {isLoading ? (
          <CircularProgress color="secondary" size="25" />
        ) : (
          'Continue'
        )}
      </Button>
    </PersonalDataContainer>
  );
}
