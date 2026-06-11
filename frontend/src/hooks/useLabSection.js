import { useState } from 'react';

export const useLabSection = () => {
   const [status, setStatus] = useState('idle');
   const [progress, setProgress] = useState(0);
   const [results, setResults] = useState(null);
   const [rateLimitError, setRateLimitError] = useState(null);
   const [validationError, setValidationError] = useState(null);

   const [fileName, setFileName] = useState('');

   const [config, setConfig] = useState({
      beta: 1.0,
      epsMin: 0.1,
      epsMax: 2.5,
      sMin: 8,
      sMax: 15,
      method: 'fast',
   });

   const handleRunAnalysis = async (file) => {
      setFileName(file.name);

      setRateLimitError(null);
      setValidationError(null);

      const epsMinNum = parseFloat(config.epsMin);
      const epsMaxNum = parseFloat(config.epsMax);
      const sMinNum = parseFloat(config.sMin);
      const sMaxNum = parseFloat(config.sMax);

      if (
         isNaN(epsMinNum) ||
         isNaN(epsMaxNum) ||
         isNaN(sMinNum) ||
         isNaN(sMaxNum)
      ) {
         setValidationError('Всі поля обмежень повинні бути числами.');
         return;
      }

      if (epsMinNum >= epsMaxNum) {
         setValidationError(
            'Мінімальна енергія активації (E) повинна бути меншою за максимальну.'
         );
         return;
      }

      if (sMinNum >= sMaxNum) {
         setValidationError(
            'Мінімальний степінь частотного фактора повинен бути меншим за максимальний.'
         );
         return;
      }

      setStatus('computing');
      setProgress(10);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('beta', config.beta);
      formData.append('eps_min', config.epsMin);
      formData.append('eps_max', config.epsMax);
      formData.append('s_exp_min', config.sMin);
      formData.append('s_exp_max', config.sMax);
      formData.append('method', config.method);

      try {
         setProgress(40);
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/optimization/process`,
            {
               method: 'POST',
               body: formData,
            }
         );

         if (response.status === 429) {
            setRateLimitError(
               'Ви вичерпали ліміт (5 запитів на хвилину). Зачекайте трішки перед наступною спробою.'
            );
            setStatus('idle');
            setProgress(0);
            return;
         }

         if (!response.ok) {
            const errData = await response.json();
            if (response.status === 400) {
               setValidationError(errData.detail || 'Некоректні дані');
               setStatus('idle');
               setProgress(0);
               return;
            }
            throw new Error(errData.detail || 'Помилка сервера');
         }

         const data = await response.json();

         setProgress(100);
         setResults(data);
         setTimeout(() => setStatus('results'), 400);
      } catch (err) {
         console.error('Деталі помилки:', err.message);
         setValidationError(`Помилка сервера: ${err.message}`);
         setStatus('idle');
         setProgress(0);
      }
   };

   const resetAnalysis = () => {
      setResults(null);
      setStatus('idle');
      setProgress(0);
      setRateLimitError(null);
      setValidationError(null);
      setFileName('');
   };

   return {
      status,
      progress,
      results,
      config,
      setConfig,
      rateLimitError,
      setRateLimitError,
      validationError,
      setValidationError,
      handleRunAnalysis,
      resetAnalysis,
      fileName,
   };
};
