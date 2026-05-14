import { Calculator, SlidersHorizontal } from 'lucide-react';

const SettingsPanel = ({ disabled }) => (
   <div
      className={`space-y-6 transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
   >
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-lg p-5 transition-colors">
         <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            Метод обчислення
         </h3>
         <div className="grid grid-cols-2 gap-3">
            <button className="p-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-left flex flex-col gap-1 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
               <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Сімпсона
               </span>
               <span className="text-[10px] text-slate-500 dark:text-slate-500">
                  Класичний підхід
               </span>
            </button>
            <button className="p-3 rounded border border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 shadow-inner text-left flex flex-col gap-1 transition-all cursor-pointer">
               <span className="text-xs font-bold uppercase text-slate-900 dark:text-amber-100">
                  Векторне
               </span>
               <span className="text-[10px] text-amber-700/70 dark:text-amber-400/70">
                  Швидкий розрахунок
               </span>
            </button>
         </div>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-lg p-5 transition-colors">
         <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            Обмеження параметрів
         </h3>
         <div className="space-y-5">
            <div>
               <label className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mb-2 flex justify-between uppercase font-semibold">
                  <span>Енергія активації (ε), еВ</span>
               </label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     defaultValue="0.1"
                     placeholder="Min"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
                  <span className="text-slate-400 dark:text-slate-600 font-mono">
                     -
                  </span>
                  <input
                     type="text"
                     defaultValue="2.5"
                     placeholder="Max"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
               </div>
            </div>
            <div>
               <label className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mb-2 flex justify-between uppercase font-semibold">
                  <span>Частотний фактор (k₁), с⁻¹</span>
               </label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     defaultValue="1e8"
                     placeholder="Min"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
                  <span className="text-slate-400 dark:text-slate-600 font-mono">
                     -
                  </span>
                  <input
                     type="text"
                     defaultValue="1e15"
                     placeholder="Max"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
               </div>
            </div>
         </div>
      </div>
   </div>
);

export default SettingsPanel;
