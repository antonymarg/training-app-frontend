import { StyledMenu } from './menu.style';
import { useSelector } from 'react-redux';
import { getUser } from '../../Models/User/selectors';

import { NotificationsMenu } from '../NotificationsMenu/NotificationMenu';

export function Menu() {
  const user = useSelector(getUser);

  return <StyledMenu>{user.isLoggedIn && <NotificationsMenu />}</StyledMenu>;
}
