import { Radiation, Moon } from 'lucide-react';

const Header = () => (
   <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
         <a href="#" className="flex items-center gap-3">
            <Radiation className="text-amber-600 w-6 h-6" />
            <span className="font-mono font-bold text-slate-900 tracking-widest uppercase">
               Common <span className="text-green-600"></span>Dosimetry
            </span>
         </a>
         <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 uppercase tracking-wider items-center">
            <a href="#lab" className="transition-colors">
               Лабораторія
            </a>
            <a href="#archive" className="transition-colors">
               Архів
            </a>
            <div className="w-px h-4 bg-slate-300"></div>
            <button
               className="text-slate-500 transition-colors flex items-center justify-center"
               title="Змінити тему"
            >
               <Moon className="w-5 h-5" />
            </button>
         </div>
      </div>
   </nav>
);

export default Header;
