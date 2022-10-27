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
      contrastText: 'white',
    },
    secondary: {
      main: "#404956"
    }
  },
  typography: {
    fontFamily: 'Cardo, Raleway',
    h1: {
      fontSize: 60,
      textTransform: 'uppercase',
      color: "#404956",
    },
    h2: {
      fontSize: 60,
      textTransform: 'uppercase',
      color: "white",
    },
    h3: {
      fontSize: 30,
      textTransform: 'uppercase',
      color: "#404956",
    },
    subtitle1: {
      fontSize: 30,
      textTransform: 'uppercase',
      color: 'white',
      lineHeight: '1.2',
    },
    subtitle2: {
      fontSize: 30,
      textTransform: 'uppercase',
      color: "#404956",
      lineHeight: '1.2',
    },
    caption: {
      fontSize: 20,
      fontStyle: "italic",
    },
    button: {
      fontSize: 18,
      textTtransform: 'uppercase',
      color: "#404956",
    },
    body1: {
      fontSize: 20,
      color: "#404956",
    },
    body2: {
      fontSize: 18,
      color: 'white',
      fontFamily: 'Raleway',
      fontWeight: '300',
      
    }

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
          color: '#404956',
          [`& .${outlinedInputClasses.notchedOutline}, &:hover .${outlinedInputClasses.notchedOutline}`]: {
            border: '2px solid',
            borderColor: "#DC9D5F",
            borderRight: 'none',
            borderTop: 'none',
            borderRadius: 0,
            borderBottomLeftRadius: '5px',
          }
        },
        input: {
          background: '#ffffffcc',
          [`&::placeholder`]: {
            color: 'rgba(0, 0, 0, 0.6)',
            fontFamily: 'Cardo',
            opacity: 1,
            fontWeight: 400,
          }
        }
      }
    },
  },
});

