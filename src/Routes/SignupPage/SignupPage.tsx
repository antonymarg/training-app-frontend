import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  ISignupWithEmailFormData,
  ISignUpFormErrors,
  IUserRole,
} from '../../Models/User/types';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { startSignupWithEmail } from '../../Models/User/actions';

const defaultFormState: ISignupWithEmailFormData = {
  name: '',
  email: '',
  password: '',
  role: 'participant',
};

// catch (error: any) {
//   console.log(error);
//   switch (error.code) {
//     case 'auth/invalid-email':
//       createUserWithEmailFailed({ emailError: 'This email is invalid' });
//       break;
//     case 'auth/weak-password':
//       createUserWithEmailFailed({
//         passwordError: 'This password is weak',
//       });
//       break;
//     default:
//       createUserWithEmailFailed({
//         genericError: 'A sudden error occurred',
//       });
//   }

const validateForm = (
  formData: ISignupWithEmailFormData
): { isValid: boolean; errors: ISignUpFormErrors } => {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
    return {
      isValid: false,
      errors: { emailError: 'Please enter a valid email' },
    };
  if (!formData.name)
    return {
      isValid: false,
      errors: { nameError: 'The name cannot be empty' },
    };
  if (formData.password.length < 6)
    return {
      isValid: false,
      errors: {
        passwordError: 'Your password cannot be less than 6 characters long',
      },
    };
  return { isValid: true, errors: {} };
};

const SignupPage = () => {
  const [formData, setFormData] =
    useState<ISignupWithEmailFormData>(defaultFormState);
  const [errors, setErrors] = useState<ISignUpFormErrors>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(defaultFormState);
    setErrors({});
  }, []);

  const onSignUpWithEmail = () => {
    let validation = validateForm(formData);
    if (!validation.isValid) return setErrors(validation.errors);
    dispatch(startSignupWithEmail(formData));
  };

  return (
    <form>
      {errors.genericError && (
        <Alert severity="error">{errors.genericError}</Alert>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '20px',
        }}
      >
        <div>
          <Typography variant="h2">Signup</Typography>
          <hr />
        </div>
        <TextField
          id="name"
          label="Name"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v.target.value })}
          error={Boolean(errors.nameError)}
          helperText={errors.nameError}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={(v) => setFormData({ ...formData, email: v.target.value })}
          error={Boolean(errors.emailError)}
          helperText={errors.emailError}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={(v) =>
            setFormData({ ...formData, password: v.target.value })
          }
          error={Boolean(errors.passwordError)}
          helperText={errors.passwordError}
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
          style={{ borderRadius: '50px', alignSelf: 'center' }}
          onClick={onSignUpWithEmail}
        >
          Sign now!
        </Button>
      </div>
    </form>
  );
};

export default SignupPage;
