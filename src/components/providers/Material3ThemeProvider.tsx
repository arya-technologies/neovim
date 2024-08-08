import { RootState } from "@/features/store";
import {
  Material3Scheme,
  Material3Theme,
  useMaterial3Theme,
} from "@pchmn/expo-material3-theme";
import { createContext, useContext, useEffect } from "react";
import { useColorScheme, Appearance } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  Provider as PaperProvider,
  ProviderProps,
  useTheme,
} from "react-native-paper";
import { useSelector } from "react-redux";

type Material3ThemeProviderProps = {
  theme: Material3Theme;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
};

const Material3ThemeProviderContext =
  createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);

export function Material3ThemeProvider({
  children,
  ...otherProps
}: ProviderProps & { sourceColor?: string; fallbackSourceColor?: string }) {
  const colorScheme = useColorScheme();

  const themeMode = useSelector(
    (state: RootState) => state.settings.appearance.colors.theme,
  );

  const { theme, updateTheme, resetTheme } = useMaterial3Theme();

  const pureBlackThemeColors: Material3Scheme = {
    ...theme.dark,
    background: "#000",
    surface: "#000",
    elevation: {
      ...theme.dark.elevation,
      level0: "#00000000",
      level1: "#0a0a0a",
      level2: "#0f0f0f",
      level3: "#121212",
      level4: "#171717",
      level5: "#212121",
    },
    backdrop: "#000000CC",
    // onSurfaceVariant: "#f00",
  };

  useEffect(() => {
    if (themeMode === "system") {
      Appearance.setColorScheme(null);
      resetTheme();
    } else if (themeMode === "light") {
      Appearance.setColorScheme("light");
    } else if (themeMode === "dark") {
      Appearance.setColorScheme("dark");
    } else if (themeMode === "pureBlack") {
      Appearance.setColorScheme("dark");
      resetTheme();
    }
  }, [themeMode]);

  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: themeMode === "pureBlack" ? pureBlackThemeColors : theme.dark,
        }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <Material3ThemeProviderContext.Provider
      value={{ theme, updateTheme, resetTheme }}
    >
      <PaperProvider theme={paperTheme} {...otherProps}>
        {children}
      </PaperProvider>
    </Material3ThemeProviderContext.Provider>
  );
}

export function useMaterial3ThemeContext() {
  const ctx = useContext(Material3ThemeProviderContext);
  if (!ctx) {
    throw new Error(
      "useMaterial3ThemeContext must be used inside Material3ThemeProvider",
    );
  }
  return ctx;
}

export const useAppTheme = useTheme<MD3Theme & { colors: Material3Scheme }>;
