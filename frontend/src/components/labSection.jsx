import UploadPanel from './uploadPanel.jsx';
import SettingsPanel from './settingsPanel.jsx';
import VisualizationPanel from './visualizationPanel.jsx';

const LabSection = () => (
   <section id="lab" className="py-20 bg-slate-50 relative">
      <div className="w-full px-6 md:px-12">
         <div className="mb-12 flex items-center gap-4 border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">
               Робоча панель
            </h2>
            <div className="h-px bg-slate-300 flex-1 ml-4" />
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-6">
               <UploadPanel />
               <SettingsPanel />
            </div>
            <VisualizationPanel />
         </div>
      </div>
   </section>
);

export default LabSection;
