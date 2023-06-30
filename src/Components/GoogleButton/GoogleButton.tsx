import { Button, CircularProgress } from '@mui/material';

export function GoogleButton({
  onClick,
  isLoading,
  text,
}: {
  onClick: () => void;
  isLoading: boolean;
  text: string;
}) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{ alignSelf: 'center' }}
      onClick={onClick}
      startIcon={
        !isLoading && (
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            height="25px"
            alt="Google logo"
          />
        )
      }
    >
      {isLoading ? <CircularProgress color="secondary" size={25} /> : text}
    </Button>
  );
}
