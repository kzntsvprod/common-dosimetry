import { Radiation } from 'lucide-react';

const Footer = () => (
   <footer className="border-t border-slate-200 bg-white py-8">
      <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="text-slate-500 text-xs font-mono">
            © 2026 Common Dosimetry. Дипломна робота.
         </div>
         <div className="text-slate-400 text-xs font-mono flex items-center gap-4">
            <span>REACT 18</span>
            <span>•</span>
            <span>FASTAPI</span>
            <span>•</span>
            <span className="text-amber-500 flex items-center gap-1">
               <Radiation className="w-3 h-3" />
            </span>
         </div>
      </div>
   </footer>
);

export default Footer;
