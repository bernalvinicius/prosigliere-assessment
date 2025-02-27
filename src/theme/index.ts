import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      white: string;
      red: string;
      gryffindor: string;
      slytherin: string;
      hufflepuff: string;
      ravenclaw: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      white?: string;
      red?: string;
      gryffindor?: string;
      slytherin?: string;
      hufflepuff?: string;
      ravenclaw?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#0f1b25' },
    secondary: { main: '#a78851' },
    custom: {
      white: '#ffffff',
      red: '#ff0000',
      gryffindor: '#a12330',
      slytherin: '#266c4d',
      hufflepuff: '#f3b000',
      ravenclaw: '#4895c9',
    },
  },
});

export default theme;
