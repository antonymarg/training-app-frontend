import { useDispatch } from 'react-redux';
import { updateUserLogout } from '../../Models/User/actions';
import { Button } from '@mui/material';
import { clearNotifications } from '../../Models/Notifications/actions';

export function Profile() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearNotifications());
    dispatch(updateUserLogout());
  };

  return (
    <div>
      <Button variant="contained" onClick={handleLogout} color="primary">
        Log out
      </Button>
    </div>
  );
}
