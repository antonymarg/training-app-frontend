import React from 'react';
import { Autocomplete, TextField, debounce } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { userModule } from '../../Firebase';
import { IUserRole } from '../../Models/User/types';

interface IAutocompleteUserProps<T> {
  onPick: (val: T) => void;
  value: T;
  label: string;
  required?: boolean;
  error?: string;
  isMultiple?: boolean;
  userRole?: IUserRole;
}

export interface IAutocompleteOptions {
  label: string;
  value: string;
}

export function AutocompleteUser<OptionsType>({
  onPick,
  value,
  label,
  required,
  error,
  isMultiple,
  userRole,
}: IAutocompleteUserProps<OptionsType>) {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = useState<IAutocompleteOptions[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useMemo(
    () =>
      debounce(async (input: string) => {
        let searchFields = {
          role: userRole,
          emailStartsWith: input,
        };
        let fetchedOptions = (
          await userModule.getUsersByEmail(searchFields)
        ).map((opt) => ({
          label: `${opt.name} ${opt.surname}`,
          value: opt.email as string,
        }));
        setOptions(fetchedOptions);
        setLoading(false);
      }, 500),
    []
  );

  useEffect(() => {
    setLoading(true);
    setOptions([]);
    loadUsers(inputValue);
  }, [loadUsers, inputValue]);

  return (
    <Autocomplete
      id="country"
      fullWidth
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      multiple={isMultiple}
      noOptionsText="No users found"
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          label={label}
          placeholder="Use their email"
          required={required}
          error={Boolean(error)}
          helperText={error}
        />
      )}
    />
  );
}
