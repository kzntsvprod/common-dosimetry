import { Radiation, Sun, Moon } from 'lucide-react';
import logo from '../assets/logo.png';

const Header = ({
   activeSection,
   scrollToSection,
   isDarkMode,
   toggleTheme,
}) => (
   <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
         <a
            href="#"
            onClick={(e) => {
               e.preventDefault();
               window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group cursor-pointer"
         >
            <Radiation className="text-amber-600 dark:text-amber-500 w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
            <img
               src={logo}
               alt="Common Logo"
               className="h-18 w-auto object-contain"
            />
         </a>
         <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider items-center h-full">
            <a
               href="#lab"
               onClick={(e) => scrollToSection(e, 'lab')}
               className={`relative h-full flex items-center transition-colors hover:text-amber-500 dark:hover:text-amber-500 ${activeSection === 'lab' ? 'text-amber-600 dark:text-amber-500 font-bold' : ''}`}
            >
               Лабораторія
            </a>
            <a
               href="#archive"
               onClick={(e) => scrollToSection(e, 'archive')}
               className={`relative h-full flex items-center transition-colors hover:text-amber-500 dark:hover:text-amber-500 ${activeSection === 'archive' ? 'text-amber-600 dark:text-amber-500 font-bold' : ''}`}
            >
               Архів
            </a>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 transition-colors"></div>
            <button
               onClick={toggleTheme}
               className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
               title="Змінити тему"
            >
               {isDarkMode ? (
                  <Sun className="w-5 h-5" />
               ) : (
                  <Moon className="w-5 h-5" />
               )}
            </button>
         </div>
      </div>
   </nav>
);

export default Header;
