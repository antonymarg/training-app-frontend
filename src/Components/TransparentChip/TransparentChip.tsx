import { Chip, rgbToHex, ChipProps } from '@mui/material';
import styled from 'styled-components';

interface ITransparentChipsProps extends ChipProps {}

export function TransparentChip(props: ITransparentChipsProps) {
  return <MixedChip {...props} />;
}

const MixedChip = styled(Chip)(({ theme, color }) => ({
  '&.MuiChip-root': {
    borderColor: theme.palette[color as string].main,
    background: `${rgbToHex(theme.palette[color as string].light) + '20'}`,
    color: theme.palette[color as string].dark,
    '&:hover': {
      color: theme.palette[color as string].contrastText,
    },
  },
}));
