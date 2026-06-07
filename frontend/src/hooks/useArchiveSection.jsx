import { useState, useMemo } from 'react';
import { BookOpen, AlertTriangle, FileText } from 'lucide-react';

export const useArchiveSection = () => {
   const [activeModal, setActiveModal] = useState(null);

   const openModal = (modalId) => setActiveModal(modalId);
   const closeModal = () => setActiveModal(null);

   const modalContent = useMemo(
      () => ({
         physics: {
            title: 'Фізика процесу',
            icon: <BookOpen className="w-6 h-6 text-amber-500" />,
            content: (
               <div className="space-y-4 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                     <strong>Термолюмінесценція (ТЛ)</strong> — це явище
                     світіння деяких речовин (кристалофосфорів) при їх
                     нагріванні. Воно виникає, коли електрони, що раніше були
                     захоплені в так званих "пастках" (дефектах кристалічної
                     ґратки) під дією іонізуючого випромінювання, звільняються
                     за рахунок теплової енергії.
                  </p>
                  <p>
                     Цей процес супроводжується рекомбінацією електронів з
                     дірками в центрах люмінесценції, що призводить до
                     випромінювання фотонів. Загальна кількість випроміненого
                     світла — тобто площа під кривою на графіку — прямо
                     пропорційна кількості захоплених електронів, а отже, й
                     накопиченій дозі поглиненого випромінювання.
                  </p>
                  <p>
                     Для опису цього явища використовують різні кінетичні
                     моделі, найвідомішими з яких є моделі першого
                     (Рендалла-Вілкінса), другого (Гарліка-Гібсона) та
                     загального порядку кінетики.
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
                     індивідуального дозиметричного контролю в умовах
                     надзвичайно високих та змішаних радіаційних полів.
                  </p>
                  <p>
                     Методи ТЛ-дозиметрії (зокрема детектори на основі
                     LiF:Mg,Ti) виявилися надзвичайно ефективними завдяки своїй
                     високій чутливості, здатності вимірювати дози в широкому
                     діапазоні та можливості зберігати радіаційну пам'ять
                     тривалий час.
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
                        Описує ймовірність того, що захоплений електрон
                        здійснить спробу покинути пастку за одиницю часу.
                     </li>
                     <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                           ε{' '}
                           <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                              Енергія активації (еВ)
                           </span>
                        </span>
                        Термічна енергія (глибина пастки), необхідна для
                        звільнення електрона в зону провідності.
                     </li>
                     <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                           b{' '}
                           <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                              Порядок кінетики
                           </span>
                        </span>
                        Емпіричний параметр (від 1 до 2), що визначає
                        ймовірність повторного захоплення електрона перед
                        рекомбінацією.
                     </li>
                     <li className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-lg mb-1 block">
                           FOM{' '}
                           <span className="text-sm text-slate-500 dark:text-slate-400 font-sans font-normal ml-2">
                              Показник якості (%)
                           </span>
                        </span>
                        Figure of Merit — критерій, який показує відсоток
                        відхилення теоретичної кривої від експериментальних
                        точок (чим менше, тим краще).
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
      }),
      []
   );

   return {
      activeModal,
      modalContent,
      openModal,
      closeModal,
   };
};
