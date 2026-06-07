import { useMemo } from 'react';

export const useStatusBar = (progress) => {
   return useMemo(() => {
      let currentText = '> Ініціалізація...';
      const isParsingDone = progress > 50;
      const areConstraintsDone = progress > 80;

      if (progress > 20) currentText = '> Парсинг масиву температур...';
      if (progress > 50) currentText = '> Застосування обмежень...';
      if (progress > 80)
         currentText = '> Оптимізація параметрів (Алгоритм Common)...';

      return {
         currentText,
         isParsingDone,
         areConstraintsDone,
      };
   }, [progress]);
};
