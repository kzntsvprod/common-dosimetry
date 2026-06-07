import { useState } from 'react';

export const useLabSection = () => {
   const [status, setStatus] = useState('idle');
   const [progress, setProgress] = useState(0);
   const [results, setResults] = useState(null);

   const [config, setConfig] = useState({
      beta: 1.0,
      epsMin: 0.1,
      epsMax: 2.5,
      sMin: 8,
      sMax: 15,
      method: 'fast',
   });

   const handleRunAnalysis = async (file) => {
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

         if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || 'Помилка сервера');
         }

         const data = await response.json();

         setProgress(100);
         setResults(data);
         setTimeout(() => setStatus('results'), 400);
      } catch (err) {
         console.error('Деталі помилки:', err.message);
         setStatus('idle');
         setProgress(0);
      }
   };

   const resetAnalysis = () => {
      setResults(null);
      setStatus('idle');
      setProgress(0);
   };

   return {
      status,
      progress,
      results,
      config,
      setConfig,
      handleRunAnalysis,
      resetAnalysis,
   };
};
