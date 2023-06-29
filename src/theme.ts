import { createTheme } from '@mui/material';
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffba08',
    },
    secondary: {
      main: '#0b2027',
    },
    background: {
      default: '#FBFFFE',
    },
    success: {
      main: '#3e8914',
    },
    error: {
      main: '#bf0603',
    },
    warning: {
      main: '#FE5D26',
    },
    info: {
      main: '#058ed9',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 14,
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
});
