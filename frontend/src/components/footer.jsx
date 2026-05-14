import { Radiation } from 'lucide-react';

const Footer = () => (
   <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 transition-colors duration-300">
      <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="text-slate-500 dark:text-slate-400 text-xs font-mono transition-colors">
            © 2026 Common Dosimetry
         </div>
         <div className="text-slate-400 dark:text-slate-500 text-xs font-mono flex items-center gap-4 transition-colors">
            <span>REACT 19</span>
            <span>•</span>
            <span>FASTAPI</span>
            <span>•</span>
            <span className="text-amber-500 dark:text-amber-600 flex items-center gap-1 transition-colors">
               <Radiation className="w-3 h-3" />
            </span>
         </div>
      </div>
   </footer>
);

export default Footer;
