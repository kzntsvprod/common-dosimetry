import { UploadCloud } from 'lucide-react';

const UploadPanel = () => (
   <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer border-slate-300 bg-white">
      <UploadCloud className="w-12 h-12 mb-4 text-amber-500" />
      <h3 className="text-slate-900 font-bold mb-2">Завантажити дані</h3>
      <p className="text-sm text-slate-500 mb-4">Формати .csv або .txt</p>
      <div className="font-mono text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
         Клікніть для вибору файлу
      </div>
   </div>
);

export default UploadPanel;
