import { useState } from 'react';
import {
   BookOpen,
   AlertTriangle,
   FileText,
   ChevronRight,
   ArrowLeft,
} from 'lucide-react';

const ArchiveSection = ({ isActive }) => {
   const [activeModal, setActiveModal] = useState(null);

   const modalContent = {
      physics: {
         title: 'Фізика процесу',
         icon: <BookOpen className="w-6 h-6 text-amber-500" />,
         content: (
            <div className="space-y-4 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
               <p>
                  <strong>Термолюмінесценція (ТЛ)</strong> — це явище світіння
                  деяких речовин (кристалофосфорів) при їх нагріванні. Воно
                  виникає, коли електрони, що раніше були захоплені в так званих
                  "пастках" (дефектах кристалічної ґратки) під дією іонізуючого
                  випромінювання, звільняються за рахунок теплової енергії.
               </p>
               <p>
                  Цей процес супроводжується рекомбінацією електронів з дірками
                  в центрах люмінесценції, що призводить до випромінювання
                  фотонів. Загальна кількість випроміненого світла — тобто площа
                  під кривою на графіку — прямо пропорційна кількості захоплених
                  електронів, а отже, й накопиченій дозі поглиненого
                  випромінювання.
               </p>
               <p>
                  Для опису цього явища використовують різні кінетичні моделі,
                  найвідомішими з яких є моделі першого (Рендалла-Вілкінса),
                  другого (Гарліка-Гібсона) та загального порядку кінетики.
               </p>
            </div>
         ),
      },
      chernobyl: {
         title: 'Історія: ЧАЕС',
         icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
         content: (
            <div className="space-y-4 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
               <p>
                  Під час ліквідації наслідків аварії на Чорнобильській АЕС у
                  1986 році гостро постала проблема масового та точного
                  індивідуального дозиметричного контролю в умовах надзвичайно
                  високих та змішаних радіаційних полів.
               </p>
               <p>
                  Методи ТЛ-дозиметрії (зокрема детектори на основі LiF:Mg,Ti)
                  виявилися надзвичайно ефективними завдяки своїй високій
                  чутливості, здатності вимірювати дози в широкому діапазоні та
                  можливості зберігати радіаційну пам'ять тривалий час.
               </p>
               <p className="bg-amber-50 dark:bg-amber-900/20 p-4 border-l-4 border-amber-500 rounded-r-lg text-slate-700 dark:text-slate-200 text-sm">
                  Дані, зібрані за допомогою ТЛ-дозиметрів, стали основою для
                  розрахунку дозових навантажень ліквідаторів і дозволили
                  оптимізувати час їхнього перебування в небезпечних зонах.
               </p>
            </div>
         ),
      },
      dictionary: {
         title: 'Словник термінів',
         icon: <FileText className="w-6 h-6 text-amber-500" />,
         content: (
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
               <ul className="space-y-4">
                  <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                     <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                        <span className="italic">s</span>{' '}
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                           Частотний фактор (с⁻¹)
                        </span>
                     </span>
                     Описує ймовірність того, що захоплений електрон здійснить
                     спробу покинути пастку за одиницю часу.
                  </li>
                  <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                     <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                        ε{' '}
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                           Енергія активації (еВ)
                        </span>
                     </span>
                     Термічна енергія (глибина пастки), необхідна для звільнення
                     електрона в зону провідності.
                  </li>
                  <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                     <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                        b{' '}
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                           Порядок кінетики
                        </span>
                     </span>
                     Емпіричний параметр (від 1 до 2), що визначає ймовірність
                     повторного захоплення електрона перед рекомбінацією.
                  </li>
                  <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                     <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                        FOM{' '}
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                           Показник якості (%)
                        </span>
                     </span>
                     Figure of Merit — критерій, який показує відсоток
                     відхилення теоретичної кривої від експериментальних точок
                     (чим менше, тим краще).
                  </li>
                  <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                     <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                        &Delta;S{' '}
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                           Різниця площ (%)
                        </span>
                     </span>
                     Різниця площ — критерій, який показує розбіжність між
                     сумарними площами під теоретичною та експериментальною
                     кривими (чим менше, тим точніше збігається загальна
                     світлосума).
                  </li>
               </ul>
            </div>
         ),
      },
   };

   return (
      <section
         id="archive"
         className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 relative transition-colors duration-300"
      >
         <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto">
            <div
               className={`mb-12 flex items-center gap-4 border-l-4 pl-4 transition-all duration-700 ${isActive ? 'border-amber-500' : 'border-slate-300 dark:border-slate-700'}`}
            >
               <h2
                  className={`text-2xl font-bold uppercase tracking-wider transition-colors duration-700 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}
               >
                  Науковий архів
               </h2>
               <div
                  className={`h-px flex-1 ml-4 transition-colors duration-700 ${isActive ? 'bg-amber-200 dark:bg-amber-500/50' : 'bg-slate-200 dark:bg-slate-800'}`}
               />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div
                  onClick={() => setActiveModal('physics')}
                  className="group cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 flex flex-col"
               >
                  <BookOpen className="text-slate-500 dark:text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-500 w-8 h-8 mb-4 transition-colors duration-300" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 mb-3 transition-colors duration-300">
                     Фізика процесу
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                     Термолюмінесценція (ТЛ) — це явище світіння деяких речовин
                     (кристалофосфорів) при їх нагріванні. Воно виникає, коли
                     електрони, що раніше були захоплені в так званих "пастках"
                     (дефектах кристалічної ґратки) під дією іонізуючого
                     випромінювання, звільняються за рахунок теплової енергії.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 font-semibold group-hover:gap-3 transition-all duration-300">
                     Читати далі <ChevronRight className="w-3 h-3" />
                  </div>
               </div>
               <div
                  onClick={() => setActiveModal('chernobyl')}
                  className="group cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 flex flex-col"
               >
                  <AlertTriangle className="text-slate-500 dark:text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-500 w-8 h-8 mb-4 transition-colors duration-300" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 mb-3 transition-colors duration-300">
                     Історія: ЧАЕС
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                     Під час ліквідації наслідків аварії на Чорнобильській АЕС у
                     1986 році гостро постала проблема масового та точного
                     індивідуального дозиметричного контролю в умовах
                     надзвичайно високих та змішаних радіаційних полів.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 font-semibold group-hover:gap-3 transition-all duration-300">
                     Читати далі <ChevronRight className="w-3 h-3" />
                  </div>
               </div>
               <div
                  onClick={() => setActiveModal('dictionary')}
                  className="group cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 flex flex-col"
               >
                  <FileText className="text-slate-500 dark:text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-500 w-8 h-8 mb-4 transition-colors duration-300" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 mb-3 transition-colors duration-300">
                     Словник термінів
                  </h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 flex-1 pointer-events-none">
                     <li>
                        <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold">
                           <span className="italic">s</span>{' '}
                        </span>{' '}
                        - Частотний фактор
                     </li>
                     <li>
                        <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold">
                           ε
                        </span>{' '}
                        - Енергія активації (еВ)
                     </li>
                     <li>
                        <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold">
                           b
                        </span>{' '}
                        - Порядок кінетики
                     </li>
                     <li>
                        <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold">
                           FOM
                        </span>{' '}
                        - Показник якості
                     </li>
                     <li>
                        <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold">
                           &Delta;S
                        </span>{' '}
                        - Різниця площ
                     </li>
                  </ul>
                  <div className="mt-5 flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 font-semibold group-hover:gap-3 transition-all duration-300">
                     Читати далі <ChevronRight className="w-3 h-3" />
                  </div>
               </div>
            </div>
         </div>
         {activeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 dark:bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
               <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setActiveModal(null)}
               ></div>
               <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex items-center gap-4 shrink-0 transition-colors">
                     <button
                        onClick={() => setActiveModal(null)}
                        className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Назад"
                     >
                        <ArrowLeft className="w-5 h-5" />
                     </button>
                     <div className="flex items-center gap-3">
                        {modalContent[activeModal].icon}
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider transition-colors">
                           {modalContent[activeModal].title}
                        </h3>
                     </div>
                  </div>
                  <div className="p-5 sm:p-8 overflow-y-auto">
                     {modalContent[activeModal].content}
                  </div>
               </div>
            </div>
         )}
      </section>
   );
};

export default ArchiveSection;
