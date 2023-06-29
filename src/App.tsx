import { Routes, Route } from 'react-router-dom';
import { HomePage, SignupPage } from './Routes';
import { Navbar } from './Components/Navbar/Navbar';
import { AppContainer, LayoutContainer } from './App.style';

function App() {
  return (
    <AppContainer>
      <Navbar />
      <LayoutContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </LayoutContainer>
    </AppContainer>
  );
}

export default App;
