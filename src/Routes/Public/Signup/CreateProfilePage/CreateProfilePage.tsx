import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  CircularProgress,
  Select,
  Stack,
  FormControl,
  Autocomplete,
} from '@mui/material';
import {
  CreateProfileContainer,
  ProfilePicContainer,
  MainFormContainer,
  ProfilePicture,
} from './createProfilePage.style';
import { SignupSteps } from '../SignupPage/SignupPage';
import { useCreateProfilePage } from './useCreateProfilePage';
import { IUserRole } from '../../../../Models/User/types';
import { countries } from 'countries-list';
import { IGender } from '../../../../Models/User/types';

export function CreateProfilePage({
  setStep,
}: {
  setStep: (step: SignupSteps) => void;
}) {
  const { formData, setFormData, errors, isLoading, onContinue } =
    useCreateProfilePage(setStep);
  return (
    <CreateProfileContainer>
      <ProfilePicContainer>
        <ProfilePicture alt="profile" src={formData.img} style={{}} />
        <input
          accept="image/*"
          id="upload-photo"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={(e) =>
            e.target.files?.length
              ? setFormData({
                  ...formData,
                  img: URL.createObjectURL(e.target.files[0]),
                })
              : formData.img
          }
        />
        <label htmlFor="upload-photo">
          <Button
            variant="contained"
            color="secondary"
            component="span"
            fullWidth
            sx={{ textAlign: 'center' }}
          >
            Upload your profile picture
          </Button>
        </label>
      </ProfilePicContainer>
      <MainFormContainer>
        <Stack spacing={2} direction={'row'}>
          <TextField
            id="name"
            color="primary"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(v) => setFormData({ ...formData, name: v.target.value })}
            error={Boolean(errors.nameError)}
            helperText={errors.nameError}
          />
          <TextField
            id="surame"
            label="Surname"
            value={formData.surname}
            fullWidth
            color="primary"
            onChange={(v) =>
              setFormData({ ...formData, surname: v.target.value })
            }
            error={Boolean(errors.surnameError)}
            helperText={errors.surnameError}
          />
        </Stack>
        <TextField
          label="Tell us a little bit about you "
          fullWidth
          color="primary"
          multiline
          minRows={2}
          value={formData.bio}
          onChange={(v) => setFormData({ ...formData, bio: v.target.value })}
          helperText="Optional"
        />
        <Stack spacing={2} direction="row" alignItems="end">
          <Autocomplete
            id="country"
            fullWidth
            options={Object.values(countries)
              .map((item) => item.name)
              .sort()}
            onChange={(_, val) =>
              setFormData({ ...formData, country: val || '' })
            }
            renderInput={(params) => (
              <TextField {...params} value={formData.country} label="Country" />
            )}
          />
          <TextField
            type="date"
            variant="outlined"
            color="primary"
            label="Date of birth"
            fullWidth
            value={formData.dateOfBirth}
            onChange={(v) =>
              setFormData({ ...formData, dateOfBirth: v.target.value })
            }
          />
        </Stack>
        <Stack spacing={2} direction="row" alignItems="end">
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={formData.gender}
              label="Gender"
              fullWidth
              onChange={(v) =>
                setFormData({ ...formData, gender: v.target.value as IGender })
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Nonbinary">Non-binary</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={formData.role}
              label="Role"
              fullWidth
              onChange={(v) =>
                setFormData({ ...formData, role: v.target.value as IUserRole })
              }
            >
              <MenuItem value="trainer">Trainer</MenuItem>
              <MenuItem value="participant">Participant</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" size="large" fullWidth onClick={onContinue}>
          {isLoading ? (
            <CircularProgress color="secondary" size="25" />
          ) : (
            'Continue'
          )}
        </Button>
      </MainFormContainer>
    </CreateProfileContainer>
  );
}
