import React from 'react';
import { Autocomplete, TextField, debounce } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { userModule } from '../../Firebase';
import { IUserRole } from '../../Models/User/types';

interface IAutocompleteUserProps {
  onPick: (val: IUserAutocompleteOptions[]) => void;
  value: IUserAutocompleteOptions[];
  label: string;
  required?: boolean;
  error?: string;
  userRole?: IUserRole;
}

export interface IUserAutocompleteOptions {
  label: string;
  value: string;
  id: string;
}

export function AutocompleteUserMultiple({
  onPick,
  value,
  label,
  required,
  error,
  userRole,
}: IAutocompleteUserProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<IUserAutocompleteOptions[]>(value);
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
          id: opt.userId as string,
        }));
        setOptions(fetchedOptions);
        setLoading(false);
      }, 500),
    [userRole]
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
      multiple
      noOptionsText="No users found"
      onChange={(_, v) => onPick(v)}
      value={value}
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
