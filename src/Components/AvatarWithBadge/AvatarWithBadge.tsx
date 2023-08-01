import { Avatar, Badge, BadgeProps, Theme } from '@mui/material';
import styled from 'styled-components';
import { eTrainingConfirmStatus } from '../../lib/enums';

interface IAvatarWithBadgeProps {
  status: eTrainingConfirmStatus;
  imgSrc?: string;
}

export function AvatarWithBadge({ status, imgSrc }: IAvatarWithBadgeProps) {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
      status={status}
    >
      <Avatar sx={{ width: 24, height: 24 }} src={imgSrc} />
    </StyledBadge>
  );
}

const getBadgeColour = (status: eTrainingConfirmStatus) => {
  switch (status) {
    case eTrainingConfirmStatus.Confirmed:
    case eTrainingConfirmStatus.Accepted:
      return 'success';
    case eTrainingConfirmStatus.Declined:
      return 'error';
    case eTrainingConfirmStatus.Pending:
      return 'secondary';
  }
};

const StyledBadge = styled(Badge)(
  ({
    theme,
    status,
  }: BadgeProps & { status: eTrainingConfirmStatus; theme: Theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette[getBadgeColour(status)].main,
      color: theme.palette[getBadgeColour(status)].main,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
);
