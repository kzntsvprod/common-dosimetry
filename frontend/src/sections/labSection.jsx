import UploadPanel from '../components/uploadPanel.jsx';
import SettingsPanel from '../components/settingsPanel.jsx';
import StatusBar from '../components/statusBar.jsx';
import ResultsBoard from '../components/resultsBoard.jsx';
import VisualizationPanel from '../components/visualizationPanel.jsx';
import { useLabSection } from '../hooks/useLabSection.js';
import Alert from '../components/alert.jsx';

const LabSection = ({ isActive, isDarkMode }) => {
   const {
      status,
      progress,
      results,
      config,
      setConfig,
      handleRunAnalysis,
      resetAnalysis,
      rateLimitError,
      setRateLimitError,
      validationError,
      setValidationError,
   } = useLabSection();

   return (
      <section
         id="lab"
         className="py-20 bg-slate-50 dark:bg-slate-900 relative transition-colors duration-300"
      >
         <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto">
            <div
               className={`mb-12 flex items-center gap-4 border-l-4 pl-4 transition-all duration-700 ${
                  isActive
                     ? 'border-amber-500'
                     : 'border-slate-300 dark:border-slate-700'
               }`}
            >
               <h2
                  className={`text-2xl font-bold uppercase tracking-wider transition-colors duration-700 ${
                     isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                  }`}
               >
                  Робоча панель
               </h2>
               <div
                  className={`h-px flex-1 ml-4 transition-colors duration-700 ${
                     isActive
                        ? 'bg-amber-200 dark:bg-amber-500/50'
                        : 'bg-slate-200 dark:bg-slate-800'
                  }`}
               />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-1 flex flex-col gap-6">
                  <Alert
                     type="warning"
                     title="Забагато запитів"
                     message={rateLimitError}
                     onClose={() => setRateLimitError(null)}
                  />
                  <Alert
                     type="error"
                     title="Помилка налаштувань"
                     message={validationError}
                     onClose={() => setValidationError(null)}
                  />
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
