import { createContext, useContext, useEffect, useState } from "react";

// Context
const DarkModeContext = createContext();

// Provider
/**
 * DarkModeProvider component to wrap the application or parts of the application that need
 * access to dark mode functionality. It reads the initial mode from localStorage and allows
 * toggling between dark and light modes.
 *
 *
 * @component
 * @param {Object} props - Props passed to the provider
 * @param {ReactNode} props.children - The components that will have access to the dark mode context
 * @returns {JSX.Element} The provider for the dark mode context.
 */
function DarkModeProvider({ children }) {
  // Read initial state from localStorage or default to "light-mode"
  const initialMode = localStorage.getItem("isDarkMode") || "light-mode";

  const [isDarkMode, setIsDarkMode] = useState(initialMode);

  useEffect(() => {
    if (isDarkMode === "dark-mode") {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }

    // Save the mode to localStorage
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((darkState) =>
      darkState === "dark-mode" ? "light-mode" : "dark-mode"
    );
    console.log("Theme status: ", isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook
function useDarkMode() {
  //Get the context
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }

  return context;
}

// Export custom hook , darkmodeProvider
export { useDarkMode, DarkModeProvider };
