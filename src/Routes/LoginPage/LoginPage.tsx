import { useState, useEffect } from 'react';
import { Alert, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { startLoginWithEmail } from '../../Models/User/actions';
import { IUserCredentials } from '../../Firebase/userModule/userModule.types';
import { ILoginFormErrors } from './LoginForm.types';

const defaultFormState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserCredentials>(defaultFormState);
  const [errors, setErrors] = useState<ILoginFormErrors>({});

  useEffect(() => {
    setFormData(defaultFormState);
    setErrors({});
  }, []);

  const onLoginClick = () => {
    setErrors({});
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      return {
        isValid: false,
        errors: { emailError: 'Please enter a valid email' },
      };
    dispatch(startLoginWithEmail(formData));
    // .catch((error) => {
    //   switch (error.code) {
    //     case 'auth/invalid-email':
    //       setErrors({ emailError: 'This email is invalid' });
    //       break;
    //     case 'auth/wrong-password':
    //       setErrors({ passwordError: 'This password is wrong' });
    //       break;
    //     default:
    //       setErrors({ genericError: 'A sudden error occurred' });
    //   }}
  };

  return (
    <>
      {errors.genericError && <Alert severity="error">Wrong user data!</Alert>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          gap: '20px',
        }}
      >
        <div>
          <Typography variant="h2">Login</Typography>
          <hr />
        </div>
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
        <Button
          variant="contained"
          size="large"
          style={{ borderRadius: '50px', alignSelf: 'center' }}
          onClick={onLoginClick}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
