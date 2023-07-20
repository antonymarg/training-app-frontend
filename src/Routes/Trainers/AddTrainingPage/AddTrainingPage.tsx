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
import {
  AddTrainingPageContainer,
  ButtonContainer,
} from './addTrainingPage.style';
import {
  AutocompleteUser,
  IAutocompleteOptions,
} from '../../../Components/AutocompleteUser/AutocompleteUser';
import { useAddTrainingPage } from './useAddTrainingPage';
import {
  eTrainingDuration,
  eTrainingTopics,
  eTrainingTypes,
} from '../../../lib/enums';

const TOPIC_LIST = Object.keys(eTrainingTopics) as Array<
  keyof typeof eTrainingTopics
>;
const DURATION_LIST = Object.keys(eTrainingDuration) as Array<
  keyof typeof eTrainingDuration
>;

export function AddTrainingPage() {
  const { formData, handleInputChange, errors, onContinue, isLoading } =
    useAddTrainingPage();
  return (
    <AddTrainingPageContainer>
      <Typography variant="h4">Create new training</Typography>
      <Stack direction="column" spacing={1}>
        <TitleInput
          value={formData.title}
          error={errors.titleError}
          setValue={(v) => handleInputChange({ title: v })}
        />
        <Stack direction="row" spacing={1}>
          <AutocompleteUser<IAutocompleteOptions>
            onPick={(val: IAutocompleteOptions) =>
              handleInputChange({ cotrainer: val })
            }
            value={formData.cotrainer as IAutocompleteOptions}
            label="Cotrainer"
            userRole="trainer"
          />
          <TopicInput
            value={formData.topic}
            error={errors.topicError}
            setValue={(v) => handleInputChange({ topic: v })}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <DateOfDeliveryInput
            value={formData.dateOfDelivery}
            error={errors.dateOfDeliveryError}
            setValue={(v) => handleInputChange({ dateOfDelivery: v })}
          />
          <DurationInput
            value={formData.duration}
            error={errors.durationError}
            setValue={(v) => handleInputChange({ duration: v })}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <TypeOfTrainingInput
            value={formData.typeOfTraining as eTrainingTypes}
            error={errors.typeOfTrainingError}
            setValue={(v) =>
              handleInputChange({ ...formData, typeOfTraining: v })
            }
          />
          {formData.typeOfTraining === 'live' && (
            <LocationInput
              value={formData.location}
              setValue={(v) => handleInputChange({ location: v })}
            />
          )}
        </Stack>
        <AutocompleteUser<IAutocompleteOptions[]>
          onPick={(val) => handleInputChange({ participants: val })}
          value={formData.participants}
          label="Participants"
          userRole="participant"
          isMultiple
        />
      </Stack>

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
            'Create'
          )}
        </Button>
      </ButtonContainer>
    </AddTrainingPageContainer>
  );
}

interface IFieldInputs<V> {
  value: V;
  error?: string;
  setValue: (v: V) => void;
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
}: IFieldInputs<string>) => (
  <TextField
    id="deliveryDate"
    type="date"
    variant="outlined"
    color="primary"
    label="Date of delivery"
    required
    fullWidth
    value={value}
    InputLabelProps={{ shrink: true }}
    onChange={(v) => setValue(v.target.value)}
    error={Boolean(error)}
    helperText={error}
  />
);

const DurationInput = ({
  value,
  error,
  setValue,
}: IFieldInputs<eTrainingDuration | ''>) => (
  <FormControl fullWidth>
    <InputLabel id="duration-label">Duration</InputLabel>
    <Select
      id="duration"
      value={value}
      label="Duration"
      labelId="duration-label"
      required
      fullWidth
      onChange={(v) => setValue(v.target.value as eTrainingDuration)}
      error={Boolean(error)}
    >
      {DURATION_LIST.map((i) => (
        <MenuItem key={i} value={i}>
          {eTrainingDuration[i]}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
  </FormControl>
);

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

const LocationInput = ({
  value,
  setValue,
}: IFieldInputs<string | undefined>) => (
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
