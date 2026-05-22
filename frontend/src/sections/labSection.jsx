import { useState } from 'react';
import UploadPanel from '../components/uploadPanel.jsx';
import SettingsPanel from '../components/settingsPanel.jsx';
import StatusBar from '../components/statusBar.jsx';
import ResultsBoard from '../components/resultsBoard.jsx';
import VisualizationPanel from '../components/visualizationPanel.jsx';

const LabSection = ({ isActive, isDarkMode }) => {
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
            'http://127.0.0.1:8000/api/optimization/process',
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

   return (
      <section
         id="lab"
         className="py-20 bg-slate-50 dark:bg-slate-900 relative transition-colors duration-300"
      >
         <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto">
            <div
               className={`mb-12 flex items-center gap-4 border-l-4 pl-4 transition-all duration-700 ${isActive ? 'border-amber-500' : 'border-slate-300 dark:border-slate-700'}`}
            >
               <h2
                  className={`text-2xl font-bold uppercase tracking-wider transition-colors duration-700 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}
               >
                  Робоча панель
               </h2>
               <div
                  className={`h-px flex-1 ml-4 transition-colors duration-700 ${isActive ? 'bg-amber-200 dark:bg-amber-500/50' : 'bg-slate-200 dark:bg-slate-800'}`}
               />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-1 flex flex-col gap-6">
                  {status === 'idle' && (
                     <>
                        <UploadPanel
                           onUpload={(file) => handleRunAnalysis(file)}
                        />
                        <SettingsPanel
                           config={config}
                           setConfig={setConfig}
                           disabled={false}
                        />
                     </>
                  )}
                  {status === 'computing' && (
                     <>
                        <StatusBar progress={progress} />
                        <SettingsPanel
                           config={config}
                           setConfig={setConfig}
                           disabled={true}
                        />
                     </>
                  )}
                  {status === 'results' && (
                     <ResultsBoard
                        onReset={resetAnalysis}
                        resultsData={results}
                     />
                  )}
               </div>
               <VisualizationPanel
                  status={status}
                  isDarkMode={isDarkMode}
                  resultsData={results}
               />
            </div>
         </div>
      </section>
   );
};

export default LabSection;
