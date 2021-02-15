// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      alt: string;
      secondary: string;
      trim: string;
      focus: string;
    };
  }
}
