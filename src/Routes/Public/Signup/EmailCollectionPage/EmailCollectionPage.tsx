import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { GoogleButton } from '../../../../Components/GoogleButton/GoogleButton';
import {
  EmailCollectionContainer,
  FormContainer,
  StyledDivider,
} from './EmailColelctionPage.style';
import { useEmailCollection } from './useEmailCollectionPage';
import { SignupSteps } from '../SignupPage/SignupPage';

export function EmailCollectionPage({
  setStep,
}: {
  setStep: (step: SignupSteps) => void;
}) {
  const {
    formData,
    setFormData,
    isLoading,
    errors,
    onSignupWithCredentials,
    onSignupWithGoogle,
  } = useEmailCollection(setStep);

  return (
    <EmailCollectionContainer>
      <FormContainer>
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
        <TextField
          id="confirmPassword"
          type="password"
          label="Confirm password"
          value={formData.confirmPassword}
          onChange={(v) =>
            setFormData({ ...formData, confirmPassword: v.target.value })
          }
          error={Boolean(errors.confirmPasswordError)}
          helperText={errors.confirmPasswordError}
        />
        <Button
          variant="contained"
          size="large"
          style={{ alignSelf: 'center' }}
          onClick={onSignupWithCredentials}
        >
          {isLoading === 'credentials' ? (
            <CircularProgress color="secondary" size="25" />
          ) : (
            'Sign up'
          )}
        </Button>
      </FormContainer>
      <StyledDivider>
        <Typography variant="overline">Or</Typography>
      </StyledDivider>
      <GoogleButton
        onClick={onSignupWithGoogle}
        isLoading={false}
        text="Sign up with Google"
      />
    </EmailCollectionContainer>
  );
}
