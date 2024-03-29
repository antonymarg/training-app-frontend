import { Button, CircularProgress } from '@mui/material';

export function GoogleButton({
  onClick,
  isLoading,
  text,
  color,
}: {
  onClick: () => void;
  isLoading: boolean;
  text: string;
  color: 'primary' | 'secondary';
}) {
  return (
    <Button
      variant="contained"
      color={color}
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
      {isLoading ? (
        <CircularProgress
          color={color === 'primary' ? 'secondary' : 'primary'}
          size={25}
        />
      ) : (
        text
      )}
    </Button>
  );
}
