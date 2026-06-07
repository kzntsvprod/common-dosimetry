import { Activity } from 'lucide-react';
import {
   ResponsiveContainer,
   ComposedChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
   Area,
   Line,
} from 'recharts';
import CustomTooltip from './customTooltip.jsx';
import { useVisualizationPanel } from '../hooks/useVisualizationPanel.js';

const VisualizationPanel = ({ status, isDarkMode, resultsData }) => {
   const { chartData } = useVisualizationPanel(resultsData);

   return (
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-lg p-6 flex flex-col min-h-[450px] transition-colors">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Activity className="w-4 h-4 text-amber-500" /> Візуалізація
               моделі
            </h3>
            {status === 'results' && (
               <span className="text-[10px] font-bold font-mono text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded border border-green-200 dark:border-green-800 shadow-sm transition-colors">
                  ОПТИМІЗОВАНО
               </span>
            )}
         </div>
         <div className="flex-1 relative flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-lg overflow-hidden p-4 transition-colors">
            {status === 'idle' && (
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 z-0 transition-colors" />
            )}
            {status === 'idle' && (
               <div className="text-slate-400 dark:text-slate-500 font-mono text-sm flex flex-col items-center gap-3 relative z-10 animate-in fade-in transition-colors">
                  <Activity className="w-10 h-10 opacity-30" />
                  <span>Очікування даних для побудови графіка...</span>
               </div>
            )}
            {status === 'computing' && (
               <div className="text-amber-500 dark:text-amber-500 font-mono text-sm flex flex-col items-center gap-3 relative z-10 animate-pulse transition-colors">
                  <Activity className="w-10 h-10" />
                  <span>Аналіз експериментальних даних...</span>
               </div>
            )}
            {status === 'results' && (
               <div className="w-full h-full animate-in fade-in zoom-in-95 duration-700">
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                     >
                        <CartesianGrid
                           strokeDasharray="3 3"
                           vertical={false}
                           stroke={isDarkMode ? '#334155' : '#e2e8f0'}
                        />
                        <XAxis
                           dataKey="temp"
                           type="number"
                           domain={['auto', 'auto']}
                           tickCount={9}
                           stroke={isDarkMode ? '#64748b' : '#94a3b8'}
                           tick={{
                              fill: isDarkMode ? '#94a3b8' : '#64748b',
                              fontSize: 12,
                              fontFamily: 'monospace',
                           }}
                           label={{
                              value: 'Температура (°C)',
                              position: 'insideBottom',
                              style: { textAnchor: 'middle' },
                              offset: -15,
                              fill: isDarkMode ? '#cbd5e1' : '#475569',
                              fontSize: 13,
                              fontWeight: 'bold',
                           }}
                        />
                        <YAxis
                           stroke={isDarkMode ? '#64748b' : '#94a3b8'}
                           tick={{
                              fill: isDarkMode ? '#94a3b8' : '#64748b',
                              fontSize: 12,
                              fontFamily: 'monospace',
                           }}
                           label={{
                              value: 'Інтенсивність (ум. од.)',
                              angle: -90,
                              position: 'insideLeft',
                              style: { textAnchor: 'middle' },
                              offset: 15,
                              fill: isDarkMode ? '#cbd5e1' : '#475569',
                              fontSize: 13,
                              fontWeight: 'bold',
                           }}
                        />
                        <Tooltip
                           content={<CustomTooltip isDarkMode={isDarkMode} />}
                           cursor={{
                              stroke: isDarkMode ? '#475569' : '#cbd5e1',
                              strokeWidth: 1,
                              strokeDasharray: '4 4',
                           }}
                        />
                        <Legend
                           verticalAlign="top"
                           align="center"
                           height={36}
                           iconType="circle"
                           wrapperStyle={{
                              fontSize: '13px',
                              fontWeight: 'bold',
                              fontFamily: 'monospace',
                              color: isDarkMode ? '#cbd5e1' : '#475569',
                           }}
                        />
                        <Area
                           type="monotone"
                           dataKey="theory"
                           name="Теорія"
                           stroke="#f59e0b"
                           strokeWidth={3}
                           fillOpacity={isDarkMode ? 0.25 : 0.15}
                           fill="#f59e0b"
                           activeDot={{
                              r: 6,
                              fill: '#f59e0b',
                              stroke: isDarkMode ? '#1e293b' : '#fff',
                              strokeWidth: 2,
                           }}
                        />
                        <Line
                           type="monotone"
                           dataKey="experiment"
                           name="Експеримент"
                           stroke={isDarkMode ? '#94a3b8' : '#475569'}
                           strokeWidth={2}
                           dot={false}
                           activeDot={{
                              r: 4,
                              fill: isDarkMode ? '#94a3b8' : '#475569',
                              stroke: isDarkMode ? '#1e293b' : '#fff',
                           }}
                        />
                     </ComposedChart>
                  </ResponsiveContainer>
               </div>
            )}
         </div>
      </div>
   );
};

export default VisualizationPanel;
