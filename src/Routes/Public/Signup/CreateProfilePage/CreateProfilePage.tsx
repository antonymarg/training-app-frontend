import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  CircularProgress,
  Select,
  Stack,
  FormControl,
  Alert,
  Autocomplete,
} from '@mui/material';
import {
  CreateProfileContainer,
  ProfilePicContainer,
  MainFormContainer,
  ProfilePicture,
  ButtonContainer,
} from './createProfilePage.style';
import { useCreateProfilePage } from './useCreateProfilePage';
import { IUserRole } from '../../../../Models/User/types';
import { countries } from 'countries-list';
import { IGender } from '../../../../Models/User/types';
import userImage from '../../../../Assets/img/user.png';

const GENDER_LIST: IGender[] = [
  'Male',
  'Female',
  'Non-binary',
  'Gender fluid',
  'Agender',
  'Prefer not to say',
];

export function CreateProfilePage({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const { formData, setFormData, errors, isLoading, onContinue } =
    useCreateProfilePage({ userId, email });
  return (
    <>
      {errors.genericError && (
        <Alert severity="error">{errors.genericError}</Alert>
      )}
      <CreateProfileContainer>
        <ProfilePicContainer>
          <ProfilePicture
            alt="profile"
            src={
              formData.img
                ? URL.createObjectURL(new Blob([formData.img]))
                : userImage
            }
          />
          <input
            accept="image/*"
            id="upload-photo"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) =>
              e.target.files?.length
                ? setFormData({
                    ...formData,
                    img: e.target.files[0],
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
              label="Name"
              required
              color="primary"
              fullWidth
              value={formData.name}
              onChange={(v) =>
                setFormData({ ...formData, name: v.target.value })
              }
              error={Boolean(errors.nameError)}
              helperText={errors.nameError}
            />
            <TextField
              id="surame"
              label="Surname"
              required
              fullWidth
              color="primary"
              value={formData.surname}
              onChange={(v) =>
                setFormData({ ...formData, surname: v.target.value })
              }
              error={Boolean(errors.surnameError)}
              helperText={errors.surnameError}
            />
          </Stack>
          <TextField
            id="bio"
            label="Tell us a little bit about you "
            fullWidth
            color="primary"
            multiline
            minRows={2}
            value={formData.bio}
            onChange={(v) => setFormData({ ...formData, bio: v.target.value })}
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
                <TextField
                  {...params}
                  value={formData.country}
                  label="Country"
                  required
                  error={Boolean(errors.countryError)}
                  helperText={errors.countryError}
                />
              )}
            />
            <TextField
              id="dateOfBirth"
              type="date"
              variant="outlined"
              color="primary"
              label="Date of birth"
              required
              fullWidth
              value={formData.dateOfBirth}
              InputLabelProps={{ shrink: true }}
              onChange={(v) =>
                setFormData({ ...formData, dateOfBirth: v.target.value })
              }
            />
          </Stack>
          <Stack spacing={2} direction="row" alignItems="end">
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                id="gender"
                value={formData.gender}
                label="Gender"
                labelId="gender-label"
                required
                fullWidth
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    gender: v.target.value as IGender,
                  })
                }
              >
                {GENDER_LIST.map((i) => (
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                id="role"
                value={formData.role}
                labelId="role-label"
                label="Role"
                fullWidth
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    role: v.target.value as IUserRole,
                  })
                }
              >
                <MenuItem value="trainer">Trainer</MenuItem>
                <MenuItem value="participant">Participant</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </MainFormContainer>
        <ButtonContainer>
          <Button
            variant="contained"
            size="large"
            onClick={onContinue}
            style={{ gridArea: 'button' }}
          >
            {isLoading ? (
              <CircularProgress color="secondary" size="25" />
            ) : (
              'Continue'
            )}
          </Button>
        </ButtonContainer>
      </CreateProfileContainer>
    </>
  );
}
