import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { ThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './theme';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </StyledThemeProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
