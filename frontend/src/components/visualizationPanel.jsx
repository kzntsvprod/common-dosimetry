import { Activity } from 'lucide-react';

const VisualizationPanel = () => (
   <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-lg p-6 flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Візуалізація моделі
         </h3>
      </div>
      <div className="flex-1 relative flex items-center justify-center border border-slate-200 bg-slate-50 rounded overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:10%_10%] opacity-60" />
         <div className="text-slate-400 font-mono text-sm flex flex-col items-center gap-2 relative z-10">
            <Activity className="w-8 h-8 opacity-40" />
            Очікування даних...
         </div>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-mono text-slate-500 uppercase font-semibold">
         <span>0 °C</span>
         <span>Температура (T)</span>
         <span>500 °C</span>
      </div>
   </div>
);

export default VisualizationPanel;
