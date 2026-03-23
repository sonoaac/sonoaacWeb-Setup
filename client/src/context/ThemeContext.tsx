import { createContext, useContext, useEffect } from "react";

interface ThemeContextValue {
  theme: "light";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always light — remove any previously stored dark preference
    document.documentElement.removeAttribute("data-theme");
    try { localStorage.removeItem("sonoaac-theme"); } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
