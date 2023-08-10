import {
  Stack,
  Button,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  FormHelperText,
} from '@mui/material';
import { AddTrainingPageContainer } from './addTrainingPage.style';
import { AutocompleteUserMultiple, BodyContainer } from '../../../Components';
import { useAddTrainingPage } from './useAddTrainingPage';
import { eTrainingTopics, eTrainingTypes } from '../../../lib/enums';
import {
  DesktopDateTimePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { Timestamp } from 'firebase/firestore';

const TOPIC_LIST = Object.keys(eTrainingTopics) as Array<
  keyof typeof eTrainingTopics
>;

export function AddTrainingPage() {
  const { formData, handleInputChange, errors, onContinue, isLoading } =
    useAddTrainingPage();
  const isMobile = window.innerWidth < 768;

  return (
    <BodyContainer>
      <AddTrainingPageContainer>
        <Typography style={{ gridArea: 'header' }} variant="h4">
          Create new training
        </Typography>
        <Stack style={{ gridArea: 'form' }} direction="column" spacing={1}>
          <TitleInput
            value={formData.title}
            error={errors.titleError}
            setValue={(v) => handleInputChange({ title: v })}
          />
          <DescriptionInput
            value={formData.description}
            setValue={(v) => handleInputChange({ description: v })}
          />
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
            <AutocompleteUserMultiple
              onPick={(val) => handleInputChange({ trainers: val })}
              value={formData.trainers}
              label="Trainers"
              userRole="trainer"
            />
            <TopicInput
              value={formData.topic}
              error={errors.topicError}
              setValue={(v) => handleInputChange({ topic: v })}
            />
          </Stack>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
            <DateOfDeliveryInput
              value={formData.startDate as Timestamp}
              error={errors.startDateError}
              setValue={(v) => handleInputChange({ startDate: v })}
              label="Start date"
              id="startDate"
            />
            <DateOfDeliveryInput
              value={formData.endDate as Timestamp}
              error={errors.endDateError}
              setValue={(v) => handleInputChange({ endDate: v })}
              label="End date"
              id="endDate"
            />
          </Stack>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
            <TypeOfTrainingInput
              value={formData.type as eTrainingTypes}
              error={errors.typeOfTrainingError}
              setValue={(v) => handleInputChange({ ...formData, type: v })}
            />
            {formData.type === 'live' && (
              <LocationInput
                value={formData.location ?? ''}
                setValue={(v) => handleInputChange({ location: v })}
              />
            )}
          </Stack>
          <AutocompleteUserMultiple
            onPick={(val) => handleInputChange({ participants: val })}
            value={formData.participants}
            label="Participants"
            userRole="participant"
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
            'Create'
          )}
        </Button>
      </AddTrainingPageContainer>
    </BodyContainer>
  );
}

interface IFieldInputs<V> {
  value: V;
  error?: string;
  setValue: (v: V) => void;
  label?: string;
  id?: string;
}
const TitleInput = ({ value, error, setValue }: IFieldInputs<string>) => (
  <TextField
    id="title"
    label="Title"
    value={value}
    required
    fullWidth
    onChange={(v) => setValue(v.target.value)}
    error={Boolean(error)}
    helperText={error}
  />
);

const DescriptionInput = ({
  value,
  error,
  setValue,
}: IFieldInputs<string | undefined>) => (
  <TextField
    id="description"
    label="Description"
    value={value}
    multiline
    minRows={2}
    fullWidth
    onChange={(v) => setValue(v.target.value)}
    error={Boolean(error)}
    helperText={error}
  />
);

const TopicInput = ({
  value,
  error,
  setValue,
}: IFieldInputs<eTrainingTopics | ''>) => (
  <FormControl fullWidth>
    <InputLabel id="topic-label">Topic</InputLabel>
    <Select
      id="topic"
      value={value}
      label="Topic"
      labelId="topic-label"
      required
      fullWidth
      error={Boolean(error)}
      onChange={(v) => setValue(v.target.value as eTrainingTopics)}
    >
      {TOPIC_LIST.map((i) => (
        <MenuItem key={i} value={i}>
          {eTrainingTopics[i]}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
  </FormControl>
);

const DateOfDeliveryInput = ({
  value,
  error,
  setValue,
  label,
  id,
}: IFieldInputs<Timestamp>) => {
  const isMobile = window.innerWidth < 768;

  return isMobile ? (
    <MobileDateTimePicker
      label={label}
      value={value}
      onChange={(v) => setValue(v as Timestamp)}
      inputFormat="DD/MM/YY HH:mm"
      minDate={Timestamp.now()}
      renderInput={(params) => (
        <TextField
          {...params}
          id={id}
          variant="outlined"
          color="primary"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={Boolean(error)}
          helperText={error}
        />
      )}
    />
  ) : (
    <DesktopDateTimePicker
      label={label}
      value={value}
      onChange={(v) => setValue(v as Timestamp)}
      inputFormat="DD/MM/YY HH:mm"
      minDate={Timestamp.now()}
      renderInput={(params) => (
        <TextField
          {...params}
          id={id}
          variant="outlined"
          color="primary"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={Boolean(error)}
          helperText={error}
        />
      )}
    />
  );
};

const TypeOfTrainingInput = ({
  value,
  error,
  setValue,
}: IFieldInputs<eTrainingTypes | ''>) => (
  <FormControl fullWidth>
    <FormLabel id="type-of-training" error={Boolean(error)}>
      Type of training
    </FormLabel>
    <RadioGroup
      row
      value={value}
      onChange={(e) => setValue(e.target.value as eTrainingTypes)}
    >
      <FormControlLabel
        value={eTrainingTypes.live}
        control={<Radio />}
        label="Live"
      />
      <FormControlLabel
        value={eTrainingTypes.online}
        control={<Radio />}
        label="Online"
      />
    </RadioGroup>
    {error && <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
  </FormControl>
);

const LocationInput = ({ value, setValue }: IFieldInputs<string>) => (
  <TextField
    id="location"
    variant="outlined"
    color="primary"
    label="Location"
    required
    fullWidth
    value={value}
    onChange={(v) => setValue(v.target.value)}
  />
);
