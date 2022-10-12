import { createTheme, outlinedInputClasses } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#DC9D5F",
    },
    secondary: {
      main: "#404956"
    }
  },
  typography: {
    fontFamily: 'Cardo',
    h1: {
      fontSize: 60,
      textTtransform: 'uppercase',
    },
    h2: {
      fontSize: 45,
      textTtransform: 'uppercase'
    },
    h3: {
      fontSize: 25,
      textTtransform: 'uppercase'
    },
    subtitle1: {
      fontSize: 25,
    },
    caption: {
      fontSize: 20,
      fontStyle: "italic",
    },
    button: {
      fontSize: 20,
      textTtransform: 'uppercase',
    },
    body1: {
      fontSize: 18,
    },

  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  components: {
    'MuiOutlinedInput': {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}, &:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#DC9D5F",
            borderRight: 'none',
            borderTop: 'none',
            borderRadius: 0,
            borderBottomLeftRadius: '4px',
            backgroundColor: "#ffffffcc"
          },
        },
      }
    },
  },
});

