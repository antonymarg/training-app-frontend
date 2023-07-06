import { useDispatch } from 'react-redux';
import { updateUserLogout } from '../../Models/User/actions';

const ParticipantPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(updateUserLogout());
  return (
    <div className="App">
      <div className="container">Participant</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default ParticipantPage;
