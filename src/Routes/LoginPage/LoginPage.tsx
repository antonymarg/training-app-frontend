import { useState, useEffect } from 'react';
import { Alert, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { startLoginWithEmailThunk } from '../../Models/User/thunks';
import { IUserCredentials } from '../../Firebase/userModule/userModule.types';
import { ILoginFormErrors } from '../../Models/User/types';
import { getUser } from '../../Models/User/selectors';
import { AppDispatch } from '../../Store';

const defaultFormState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const [formData, setFormData] = useState<IUserCredentials>(defaultFormState);
  const [errors, setErrors] = useState<ILoginFormErrors>({});

  useEffect(() => {
    setFormData(defaultFormState);
    setErrors({});
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) navigate('/');
  }, [user.isLoggedIn, navigate]);

  useEffect(() => {
    if (user.error?.loginError) setErrors(user.error.loginError);
  }, [user.error?.loginError]);

  const onLoginClick = () => {
    setErrors({});
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      return {
        isValid: false,
        errors: { emailError: 'Please enter a valid email' },
      };
    dispatch(startLoginWithEmailThunk(formData));
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
