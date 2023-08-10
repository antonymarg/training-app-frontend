import { Routes, Route } from 'react-router-dom';
import HomePage from './Routes/Common/Home/HomePage';
import { SignupPage } from './Routes/Common/Signup/SignupPage/SignupPage';
import { SignupCompletePage } from './Routes/Common/Signup/SignupCompletePage/SignupCompletePage';
import { Navbar } from './Components';
import { AppContainer, LayoutContainer } from './App.style';
import { AddTrainingPage } from './Routes/Trainers/AddTrainingPage/AddTrainingPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ViewTrainingPage } from './Routes/Common/ViewTrainingPage/ViewTrainingPage';
import { ViewUser } from './Routes/Common/ViewUser/ViewUser';
import { SendAnnouncementPage } from './Routes/Trainers/SendAnnouncementPage/SendAnnouncementPage';
import { useSelector } from 'react-redux';
import { getUserRole } from './Models/User/selectors';
import { ViewFeedbackFormPage } from './Routes/Trainers/ViewFeedbackFormPage/ViewFeedbackFormPage';
import { SendFeedbackFormPage } from './Routes/Participants/SendFeedbackFormPage/SendFeedbackFormPage';
import { ViewNAFormPage } from './Routes/Trainers/ViewNAFormPage/ViewNAFormPage';
import { SendNAFormPage } from './Routes/Participants/SendNAFormPage/SendNAFormPage';

function App() {
  const userRole = useSelector(getUserRole);
  return (
    <AppContainer>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Navbar />
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signup/complete" element={<SignupCompletePage />} />
            <Route path="create" element={<AddTrainingPage />} />
            <Route
              path="trainings/:trainingId"
              element={<ViewTrainingPage />}
            />
            <Route
              path="trainings/:trainingId/announce"
              element={<SendAnnouncementPage />}
            />
            <Route
              path="trainings/:trainingId/enroll"
              element={
                userRole === 'trainer' ? <ViewNAFormPage /> : <SendNAFormPage />
              }
            />
            <Route
              path="trainings/:trainingId/feedback"
              element={
                userRole === 'trainer' ? (
                  <ViewFeedbackFormPage />
                ) : (
                  <SendFeedbackFormPage />
                )
              }
            />
            <Route path="user/:userId" element={<ViewUser />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </LayoutContainer>
      </LocalizationProvider>
    </AppContainer>
  );
}

export default App;
