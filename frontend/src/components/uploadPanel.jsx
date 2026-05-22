import { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

const UploadPanel = ({ onUpload }) => {
   const fileInputRef = useRef(null);

   const handleDivClick = () => {
      fileInputRef.current.click();
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         onUpload(file);
      }
   };

   return (
      <>
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv, .txt"
            className="hidden"
         />
         <div
            onClick={handleDivClick}
            className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500 group"
         >
            <UploadCloud className="w-12 h-12 mb-4 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors" />
            <h3 className="text-slate-900 dark:text-white font-bold mb-2 transition-colors">
               Завантажити дані
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 transition-colors">
               Формати .csv або .txt
            </p>
            <div className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
               Клікніть для вибору файлу
            </div>
         </div>
      </>
   );
};

export default UploadPanel;
