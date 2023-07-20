import { Routes, Route } from 'react-router-dom';
import { HomePage, SignupPage, SignupCompletePage } from './Routes';
import { Navbar } from './Components/Navbar/Navbar';
import { AppContainer, LayoutContainer } from './App.style';
import { AddTrainingPage } from './Routes/Trainers/AddTrainingPage/AddTrainingPage';

function App() {
  return (
    <AppContainer>
      <Navbar />
      <LayoutContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signup/complete" element={<SignupCompletePage />} />
          <Route path="create" element={<AddTrainingPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </LayoutContainer>
    </AppContainer>
  );
}

export default App;
