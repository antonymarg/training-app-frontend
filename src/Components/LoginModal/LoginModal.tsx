import {
  Alert,
  TextField,
  Button,
  Typography,
  Link,
  Dialog,
  CircularProgress,
} from '@mui/material';
import { useLogin } from './useLogin';
import {
  LoginPageContainer,
  EmailAndPassContainer,
  StyledDialogTitle,
  StyledDivider,
} from './loginPage.style';
import { GoogleButton } from '../GoogleButton/GoogleButton';

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal = ({ onClose, open }: LoginModalProps) => {
  const {
    errors,
    isLoading,
    onLoginClick,
    formData,
    setFormData,
    onLoginWithGoogleClick,
  } = useLogin({ open, onClose });

  return (
    <Dialog onClose={onClose} open={open} maxWidth={false}>
      <StyledDialogTitle>Login</StyledDialogTitle>
      <LoginPageContainer>
        {errors.genericError && (
          <Alert severity="error">{errors.genericError}</Alert>
        )}
        <EmailAndPassContainer>
          <TextField
            id="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={(v) =>
              setFormData({ ...formData, email: v.target.value })
            }
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
            style={{ alignSelf: 'center' }}
            onClick={onLoginClick}
          >
            {isLoading === 'credentials' ? (
              <CircularProgress color="secondary" size="25" />
            ) : (
              'Login'
            )}
          </Button>
        </EmailAndPassContainer>
        <StyledDivider>
          <Typography variant="overline">Or</Typography>
        </StyledDivider>
        <GoogleButton
          onClick={onLoginWithGoogleClick}
          isLoading={isLoading === 'google'}
          text="Sign in with Google"
        />
        <Typography textAlign="center">
          If you don't have an account, make one{' '}
          <Link href="/signup">here</Link>!
        </Typography>
      </LoginPageContainer>
    </Dialog>
  );
};
