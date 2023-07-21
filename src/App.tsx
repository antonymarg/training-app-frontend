import { Routes, Route } from 'react-router-dom';
import { HomePage, SignupPage, SignupCompletePage } from './Routes';
import { Navbar } from './Components/Navbar/Navbar';
import { AppContainer, LayoutContainer } from './App.style';
import { AddTrainingPage } from './Routes/Trainers/AddTrainingPage/AddTrainingPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ViewTrainingPage } from './Routes/Trainers/ViewTrainingPage/ViewTrainingPage';

function App() {
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
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </LayoutContainer>
      </LocalizationProvider>
    </AppContainer>
  );
}

export default App;
