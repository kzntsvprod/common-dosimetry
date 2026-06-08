import { Calculator, SlidersHorizontal } from 'lucide-react';

const SettingsPanel = ({ disabled, config, setConfig }) => (
   <div
      className={`space-y-6 transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
   >
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-lg p-5 transition-colors">
         <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            Метод обчислення
         </h3>
         <div className="grid grid-cols-2 gap-3">
            <button
               onClick={() => setConfig({ ...config, method: 'simpson' })}
               className={`p-3 rounded border text-left flex flex-col gap-1 cursor-pointer transition-all ${config.method === 'simpson' ? 'border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 shadow-inner' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600'}`}
            >
               <span
                  className={`text-xs font-bold uppercase ${config.method === 'simpson' ? 'text-slate-900 dark:text-amber-100' : 'text-slate-600 dark:text-slate-400'}`}
               >
                  Сімпсона
               </span>
               <span
                  className={`text-[10px] ${config.method === 'simpson' ? 'text-amber-700/70 dark:text-amber-400/70' : 'text-slate-500 dark:text-slate-500'}`}
               >
                  Класичний підхід
               </span>
            </button>
            <button
               onClick={() => setConfig({ ...config, method: 'fast' })}
               className={`p-3 rounded border text-left flex flex-col gap-1 cursor-pointer transition-all ${config.method === 'fast' ? 'border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 shadow-inner' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600'}`}
            >
               <span
                  className={`text-xs font-bold uppercase ${config.method === 'fast' ? 'text-slate-900 dark:text-amber-100' : 'text-slate-600 dark:text-slate-400'}`}
               >
                  Векторне
               </span>
               <span
                  className={`text-[10px] ${config.method === 'fast' ? 'text-amber-700/70 dark:text-amber-400/70' : 'text-slate-500 dark:text-slate-500'}`}
               >
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
                  <span>Швидкість нагріву (beta), К/с</span>
               </label>
               <input
                  type="text"
                  value={config.beta}
                  onChange={(e) =>
                     setConfig({ ...config, beta: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
               />
            </div>
            <div>
               <label className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mb-2 flex justify-between uppercase font-semibold">
                  <span>Енергія активації (ε), еВ</span>
               </label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={config.epsMin}
                     onChange={(e) =>
                        setConfig({ ...config, epsMin: e.target.value })
                     }
                     placeholder="Min"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
                  <span className="text-slate-400 dark:text-slate-600 font-mono">
                     -
                  </span>
                  <input
                     type="text"
                     value={config.epsMax}
                     onChange={(e) =>
                        setConfig({ ...config, epsMax: e.target.value })
                     }
                     placeholder="Max"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
               </div>
            </div>
            <div>
               <label className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mb-2 flex justify-between uppercase font-semibold">
                  <span>Частотний фактор (x для s = 10ˣ), с⁻¹</span>
               </label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     value={config.sMin}
                     onChange={(e) =>
                        setConfig({ ...config, sMin: e.target.value })
                     }
                     placeholder="Min"
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none rounded p-2 text-sm font-mono text-slate-900 dark:text-white transition-colors focus:border-amber-400 dark:focus:border-amber-500"
                  />
                  <span className="text-slate-400 dark:text-slate-600 font-mono">
                     -
                  </span>
                  <input
                     type="text"
                     value={config.sMax}
                     onChange={(e) =>
                        setConfig({ ...config, sMax: e.target.value })
                     }
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
