import styled from 'styled-components';
import {
  Avatar,
  Badge,
  BadgeProps,
  Paper,
  Theme,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { eTrainingConfirmStatus } from '../../lib/enums';

interface IUserAvatarProps {
  picture?: string;
  fullName: string;
  userId: string;
  status: eTrainingConfirmStatus;
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

const StyledPaper = styled(Paper)`
  width: min-content;
  text-align: center;
  padding: 8px 12px;

  :hover {
    box-shadow: ${(props) => props.theme.shadows[5]};
    cursor: pointer;
  }
`;

export function UserAvatar({
  picture,
  fullName,
  status,
  userId,
}: IUserAvatarProps) {
  const navigate = useNavigate();
  return (
    <StyledPaper elevation={1} onClick={() => navigate(`/user/${userId}`)}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        status={status}
      >
        <Avatar alt={fullName} src={picture} />
      </StyledBadge>
      <Typography variant="body2" flexWrap="wrap">
        {fullName}
      </Typography>
    </StyledPaper>
  );
}
