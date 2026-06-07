import Header from './sections/header.jsx';
import Hero from './sections/hero.jsx';
import LabSection from './sections/labSection.jsx';
import ArchiveSection from './sections/archiveSection.jsx';
import Footer from './sections/footer.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useNavigation } from './hooks/useNavigation.js';

function App() {
   const { isDarkMode, toggleTheme } = useTheme();
   const { activeSection, scrollToSection } = useNavigation([
      'hero',
      'lab',
      'archive',
   ]);

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
