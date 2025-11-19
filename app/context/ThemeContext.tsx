import React from 'react';

export type AppColorScheme = 'light' | 'dark';

export const ThemeContext = React.createContext({
  theme: 'light' as AppColorScheme,
  toggleTheme: () => {},
});

export function useAppTheme() {
  return React.useContext(ThemeContext);
}
