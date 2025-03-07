import { createTheme } from '@mui/material/styles';

/**
 * The statement "declare module '@mui/material/styles'" is necessary to expand
 * the MUI type with the new properties that I' a'm adding to the theme,
 * in this case, the 'custom' one.
 */
declare module '@mui/material/styles' {
  /**
   * Palette: It's the interface that defines the final format of the color palette,
   * when accessing theme.palette, TypeScript will know that 'custom' exists as a part of the palette
   */
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
  /**
   * PaletteOptions: It's used when you are configuring the theme and setting initial values.
   * It's used for the values ​​you pass to createTheme.
   * PaletteOptions is a more flexible and optional version, while Palette defines
   * how configured values ​​should be typed
   */
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
