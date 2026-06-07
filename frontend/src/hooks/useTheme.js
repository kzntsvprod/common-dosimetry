import { useState, useEffect } from 'react';

export const useTheme = () => {
   const [isDarkMode, setIsDarkMode] = useState(false);

   const toggleTheme = () => setIsDarkMode(!isDarkMode);

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [isDarkMode]);

   return { isDarkMode, toggleTheme };
};
