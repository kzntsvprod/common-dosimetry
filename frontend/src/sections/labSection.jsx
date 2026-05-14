import { useState } from 'react';
import UploadPanel from '../components/uploadPanel.jsx';
import SettingsPanel from '../components/settingsPanel.jsx';
import StatusBar from '../components/statusBar.jsx';
import ResultsBoard from '../components/resultsBoard.jsx';
import VisualizationPanel from '../components/visualizationPanel.jsx';

const LabSection = ({ isActive, isDarkMode }) => {
   const [status, setStatus] = useState('idle');
   const [progress, setProgress] = useState(0);

   const handleUpload = () => {
      setStatus('computing');
      setProgress(0);

      const interval = setInterval(() => {
         setProgress((prev) => {
            if (prev >= 100) {
               clearInterval(interval);
               setTimeout(() => setStatus('results'), 400);
               return 100;
            }
            const jump = Math.floor(Math.random() * 15) + 5;
            return Math.min(prev + jump, 100);
         });
      }, 400);
   };

   const resetAnalysis = () => setStatus('idle');

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
                        <UploadPanel onUpload={handleUpload} />
                        <SettingsPanel disabled={false} />
                     </>
                  )}
                  {status === 'computing' && (
                     <>
                        <StatusBar progress={progress} />
                        <SettingsPanel disabled={true} />
                     </>
                  )}
                  {status === 'results' && (
                     <ResultsBoard onReset={resetAnalysis} />
                  )}
               </div>
               <VisualizationPanel status={status} isDarkMode={isDarkMode} />
            </div>
         </div>
      </section>
   );
};

export default LabSection;
