import { Activity } from 'lucide-react';
import { useStatusBar } from '../hooks/useStatusBar.js';

const StatusBar = ({ progress }) => {
   const { currentText, isParsingDone, areConstraintsDone } =
      useStatusBar(progress);

   return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
         <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-xs text-amber-600 dark:text-amber-500 font-bold flex items-center gap-2 uppercase tracking-widest">
               <Activity className="w-4 h-4 animate-pulse" /> Обчислення...
            </span>
            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
               {progress}%
            </span>
         </div>
         <div className="h-2 bg-slate-100 dark:bg-slate-900 w-full overflow-hidden rounded-full shadow-inner">
            <div
               className="h-full bg-amber-500 transition-all duration-300 ease-out"
               style={{ width: `${progress}%` }}
            />
         </div>
         <div className="mt-5 font-mono text-[10px] text-slate-500 dark:text-slate-400 space-y-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded border border-slate-100 dark:border-slate-800 h-24 overflow-hidden flex flex-col justify-end relative transition-colors">
            {isParsingDone && (
               <p className="opacity-40">
                  &gt; Парсинг масиву температур... [OK]
               </p>
            )}
            {areConstraintsDone && (
               <p className="opacity-60">&gt; Застосування обмежень... [OK]</p>
            )}
            <p className="text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
               {currentText}
            </p>
         </div>
      </div>
   );
};

export default StatusBar;
