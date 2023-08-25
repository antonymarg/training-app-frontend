import { TextField, useMediaQuery } from '@mui/material';
import {
  DesktopDateTimePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { Timestamp } from 'firebase/firestore';

interface IDateTimePickerProps {
  value: Timestamp;
  error?: string;
  setValue: (v: Timestamp) => void;
  label: string;
  id: string;
}

export const DateTimePicker = ({
  value,
  error,
  setValue,
  label,
  id,
}: IDateTimePickerProps) => {
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  return isMobile ? (
    <MobileDateTimePicker
      label={label}
      value={value.toDate().toISOString()}
      onChange={(v: string | null) => {
        setValue(Timestamp.fromDate(v ? new Date(v) : new Date()));
      }}
      inputFormat="DD/MM/YY HH:mm"
      minDate={new Date().toISOString()}
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
      value={value.toDate().toISOString()}
      onChange={(v: string | null) => {
        setValue(Timestamp.fromDate(v ? new Date(v) : new Date()));
      }}
      inputFormat="DD/MM/YY HH:mm"
      minDate={new Date().toISOString()}
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
