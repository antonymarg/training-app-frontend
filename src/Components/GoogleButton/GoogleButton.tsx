import { Button } from '@mui/material';

export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{ alignSelf: 'center' }}
      onClick={onClick}
      startIcon={
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          height="25px"
          alt="Google logo"
        />
      }
    >
      Sign in with Google
    </Button>
  );
}
