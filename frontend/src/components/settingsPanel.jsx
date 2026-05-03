import { Calculator, SlidersHorizontal } from 'lucide-react';

const SettingsPanel = () => (
   <div className="space-y-6">
      <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-5">
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-slate-400" />
            Метод обчислення
         </h3>
         <div className="grid grid-cols-2 gap-3">
            <button className="p-3 rounded border border-slate-200 bg-slate-50 text-left flex flex-col gap-1 cursor-pointer">
               <span className="text-xs font-bold uppercase text-slate-600">
                  Сімпсона
               </span>
               <span className="text-[10px] text-slate-500">
                  Класичний підхід
               </span>
            </button>
            <button className="p-3 rounded border border-slate-300 bg-slate-100 shadow-inner text-left flex flex-col gap-1 transition-all cursor-pointer">
               <span className="text-xs font-bold uppercase text-slate-900">
                  Векторне
               </span>
               <span className="text-[10px] text-slate-500">
                  Швидкий розрахунок
               </span>
            </button>
         </div>
      </div>
      <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-5">
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            Обмеження параметрів
         </h3>
         <div className="space-y-5">
            <div>
               <label className="text-[10px] text-slate-600 font-mono mb-2 flex justify-between uppercase font-semibold">
                  <span>Енергія активації (ε), еВ</span>
               </label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     name="epsMin"
                     defaultValue="0.1"
                     placeholder="Min"
                     className="w-full bg-slate-50 border border-slate-300 outline-none rounded p-2 text-sm font-mono text-slate-900 transition-colors"
                  />
                  <span className="text-slate-400 font-mono">-</span>
                  <input
                     type="text"
                     name="epsMax"
                     defaultValue="2.5"
                     placeholder="Max"
                     className="w-full bg-slate-50 border border-slate-300 outline-none rounded p-2 text-sm font-mono text-slate-900 transition-colors"
                  />
               </div>
            </div>
            <div>
               <label className="text-[10px] text-slate-600 font-mono mb-2 flex justify-between uppercase font-semibold">
                  <span>Частотний фактор (k₁), с⁻¹</span>
               </label>
               <div className="flex items-center gap-2">
                  <input
                     type="text"
                     name="k1Min"
                     defaultValue="1e8"
                     placeholder="Min"
                     className="w-full bg-slate-50 border border-slate-300 outline-none rounded p-2 text-sm font-mono text-slate-900 transition-colors"
                  />
                  <span className="text-slate-400 font-mono">-</span>
                  <input
                     type="text"
                     name="k1Max"
                     defaultValue="1e15"
                     placeholder="Max"
                     className="w-full bg-slate-50 border border-slate-300 outline-none rounded p-2 text-sm font-mono text-slate-900 transition-colors"
                  />
               </div>
            </div>
         </div>
      </div>
   </div>
);

export default SettingsPanel;
