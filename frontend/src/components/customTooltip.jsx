const CustomTooltip = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
      return (
         <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-4 text-sm font-mono z-50 transition-colors">
            <p className="text-slate-500 dark:text-slate-400 mb-3 border-b border-slate-100 dark:border-slate-700 pb-2 uppercase text-xs font-bold tracking-wider">
               Температура:{' '}
               <span className="text-slate-900 dark:text-white">
                  {label} °C
               </span>
            </p>
            {payload.map((entry, index) => (
               <div
                  key={index}
                  className="flex justify-between gap-8 mb-1 last:mb-0"
               >
                  <span
                     style={{ color: entry.color }}
                     className="font-bold flex items-center gap-2"
                  >
                     <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                     ></div>
                     {entry.name}:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">
                     {entry.value}
                  </span>
               </div>
            ))}
         </div>
      );
   }
   return null;
};

export default CustomTooltip;
