import { BookOpen, ChevronRight, AlertTriangle, FileText } from 'lucide-react';

const ArchiveSection = () => (
   <section
      id="archive"
      className="py-20 border-t border-slate-200 bg-slate-50"
   >
      <div className="w-full px-6 md:px-12">
         <div className="mb-12 flex items-center gap-4 border-l-4 border-slate-400 pl-4">
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">
               Науковий архів
            </h2>
            <div className="h-px bg-slate-300 flex-1 ml-4" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
               <BookOpen className="text-slate-500 w-8 h-8 mb-4 transition-colors" />
               <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Фізика процесу
               </h3>
               <p className="text-sm text-slate-600 leading-relaxed">
                  Термолюмінесценція — це явище світіння деяких речовин
                  (кристалофосфорів) при їх нагріванні. Загальна кількість
                  випроміненого світла — тобто площа під кривою на графіку —
                  прямо пропорційна накопиченій дозі радіації.
               </p>
               <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-600 font-semibold transition-opacity">
                  Читати далі <ChevronRight className="w-3 h-3" />
               </div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
               <AlertTriangle className="text-slate-500 w-8 h-8 mb-4 transition-colors" />
               <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Історія: ЧАЕС
               </h3>
               <p className="text-sm text-slate-600 leading-relaxed">
                  Методи ТЛ-дозиметрії активно використовувались при ліквідації
                  наслідків аварії на Чорнобильській АЕС для точного визначення
                  накопиченої дози опромінення ліквідаторів.
               </p>
               <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-600 font-semibold transition-opacity">
                  Читати далі <ChevronRight className="w-3 h-3" />
               </div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-lg">
               <FileText className="text-slate-500 w-8 h-8 mb-4 transition-colors" />
               <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Словник термінів
               </h3>
               <ul className="text-sm text-slate-600 space-y-2">
                  <li>
                     <span className="text-slate-900 font-mono font-semibold">
                        k₁
                     </span>{' '}
                     - Частотний фактор
                  </li>
                  <li>
                     <span className="text-slate-900 font-mono font-semibold">
                        ε
                     </span>{' '}
                     - Енергія активації (еВ)
                  </li>
                  <li>
                     <span className="text-slate-900 font-mono font-semibold">
                        b
                     </span>{' '}
                     - Порядок кінетики
                  </li>
                  <li>
                     <span className="text-slate-900 font-mono font-semibold">
                        FOM
                     </span>{' '}
                     - Показник якості
                  </li>
                  <li>
                     <span className="text-slate-900 font-mono font-semibold">
                        &Delta;S
                     </span>{' '}
                     - Різниця площ
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </section>
);

export default ArchiveSection;
