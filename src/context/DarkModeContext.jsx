import { createContext, useContext, useEffect, useState } from "react";

// Context
const DarkModeContext = createContext();

// Provider
function DarkModeProvider({ children }) {
  // Read initial state from localStorage
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
