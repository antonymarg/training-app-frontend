import { Button } from '@mui/material';
import { StyledMenu } from './menu.style';

export function Menu() {
  return (
    <StyledMenu>
      <Button variant="contained" color="secondary" size="large">
        Start
      </Button>
    </StyledMenu>
  );
}
