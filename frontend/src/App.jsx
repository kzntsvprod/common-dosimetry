import { useState, useEffect } from 'react';
import Header from './components/header.jsx';
import Hero from './components/hero.jsx';
import LabSection from './components/labSection.jsx';
import ArchiveSection from './components/archiveSection.jsx';
import Footer from './components/footer.jsx';

function App() {
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [activeSection, setActiveSection] = useState('hero');

   const toggleTheme = () => setIsDarkMode(!isDarkMode);

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [isDarkMode]);

   useEffect(() => {
      const handleScroll = () => {
         const sections = ['hero', 'lab', 'archive'];
         const scrollPosition = window.scrollY + window.innerHeight / 3;

         for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
               const { top, bottom } = element.getBoundingClientRect();
               const absoluteTop = top + window.scrollY;
               const absoluteBottom = bottom + window.scrollY;

               if (
                  scrollPosition >= absoluteTop &&
                  scrollPosition < absoluteBottom
               ) {
                  setActiveSection(section);
                  break;
               }
            }
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const scrollToSection = (e, sectionId) => {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return (
      <div
         className={`min-h-screen font-sans selection:bg-amber-200 dark:selection:bg-amber-500/30 transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-white'}`}
      >
         <Header
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
         />
         <Hero scrollToSection={scrollToSection} />
         <LabSection
            isActive={activeSection === 'lab'}
            isDarkMode={isDarkMode}
         />
         <ArchiveSection isActive={activeSection === 'archive'} />
         <Footer />
      </div>
   );
}

export default App;
