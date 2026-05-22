import { CheckCircle2, Download } from 'lucide-react';

const ResultsBoard = ({ onReset, resultsData }) => {
   const params = resultsData?.parameters || {};
   const metrics = resultsData?.metrics || {};

   return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-500 transition-colors">
         <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 px-5 py-4 flex items-center justify-between transition-colors">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />{' '}
               Результати Аналізу
            </span>
         </div>
         <div className="p-6 space-y-5">
            <div>
               <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">
                  Частотний фактор (s)
               </div>
               <div className="font-mono text-3xl text-amber-600 dark:text-amber-500 font-black tracking-tight">
                  {params.s ? params.s.toExponential(2) : '0.00e+00'}{' '}
                  <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                     с⁻¹
                  </span>
               </div>
            </div>
            <div>
               <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">
                  Енергія активації (ε)
               </div>
               <div className="font-mono text-3xl text-slate-800 dark:text-white font-black tracking-tight transition-colors">
                  {params.epsilon ? params.epsilon.toFixed(4) : '0.0000'}{' '}
                  <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                     еВ
                  </span>
               </div>
            </div>
            <div>
               <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">
                  Кінетичний порядок (b)
               </div>
               <div className="font-mono text-3xl text-slate-800 dark:text-white font-black tracking-tight transition-colors">
                  {params.b ? params.b.toFixed(4) : '0.0000'}
               </div>
            </div>
            <div className="pt-5 border-t border-slate-100 dark:border-slate-700 flex justify-between transition-colors">
               <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">
                     Показник якості (FOM)
                  </div>
                  <div className="font-mono text-xl text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 inline-block px-2 py-1 rounded transition-colors">
                     {metrics.fom ? metrics.fom.toFixed(2) : '0.00'}%
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">
                     Різниця площ (ΔS)
                  </div>
                  <div className="font-mono text-xl text-slate-600 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-700 inline-block px-2 py-1 rounded transition-colors">
                     {metrics.delta_s ? metrics.delta_s.toFixed(2) : '0.00'}%
                  </div>
               </div>
            </div>
         </div>
         <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 space-y-3 transition-colors">
            <button
               onClick={onReset}
               className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-sm text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded hover:bg-slate-100 dark:hover:bg-slate-700 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
            >
               Новий аналіз
            </button>
            <button className="w-full bg-slate-800 dark:bg-amber-600 text-white shadow-md font-bold py-3 px-4 rounded hover:bg-slate-700 dark:hover:bg-amber-500 uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
               <Download className="w-4 h-4" /> Експорт у PDF
            </button>
         </div>
      </div>
   );
};

export default ResultsBoard;
