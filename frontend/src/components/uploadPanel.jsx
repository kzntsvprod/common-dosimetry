import { UploadCloud } from 'lucide-react';
import { useUploadPanel } from '../hooks/useUploadPanel.js';

const UploadPanel = ({ onUpload }) => {
   const {
      fileInputRef,
      isDragging,
      handleDivClick,
      handleFileChange,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
   } = useUploadPanel(onUpload);
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
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
               isDragging
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500'
            }`}
         >
            <div className="pointer-events-none flex flex-col items-center">
               <UploadCloud
                  className={`w-12 h-12 mb-4 transition-colors ${
                     isDragging
                        ? 'text-amber-500'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-500'
                  }`}
               />
               <h3 className="text-slate-900 dark:text-white font-bold mb-2 transition-colors">
                  Завантажити дані
               </h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 transition-colors">
                  Формати .csv або .txt
               </p>
               <div
                  className={`font-mono text-xs px-3 py-1.5 rounded-md border transition-colors ${
                     isDragging
                        ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/50 dark:border-amber-700 dark:text-amber-300'
                        : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30 group-hover:text-amber-700 dark:group-hover:text-amber-400'
                  }`}
               >
                  {isDragging
                     ? 'Відпустіть файл тут'
                     : 'Клікніть або перетягніть файл'}
               </div>
            </div>
         </div>
      </>
   );
};

export default UploadPanel;
