import { useEffect, useRef, useState } from 'react';
import { Printer, X, Radiation } from 'lucide-react';
import {
   ResponsiveContainer,
   ComposedChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Legend,
   Area,
   Line,
} from 'recharts';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const DocumentSection = ({ onClose, resultsData }) => {
   const reportRef = useRef(null);
   const [isGenerating, setIsGenerating] = useState(false);

   const [reportId] = useState(() =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
   );

   useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
         document.body.style.overflow = '';
      };
   }, []);

   const chartData = resultsData?.chart_data
      ? resultsData.chart_data.temperature.map((t, i) => ({
           temp: t,
           experiment: resultsData.chart_data.experimental_intensity[i],
           theory: resultsData.chart_data.theoretical_intensity[i],
        }))
      : [];

   const params = resultsData?.parameters || {};
   const metrics = resultsData?.metrics || {};

   const peakPoint = chartData.reduce(
      (max, point) => (point.experiment > max.experiment ? point : max),
      { temp: 0, experiment: 0 }
   );

   const handleDownloadPDF = async () => {
      const element = reportRef.current;
      if (!element) return;

      try {
         setIsGenerating(true);

         const imgData = await toPng(element, {
            quality: 1,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
            style: {
               transform: 'none',
               margin: '0',
            },
         });

         const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
         });

         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pdfHeight =
            (element.offsetHeight * pdfWidth) / element.offsetWidth;

         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

         const dateString = new Date().toISOString().split('T')[0];
         pdf.save(`Protocol_${dateString}_${reportId}.pdf`);
      } catch (error) {
         console.error('Помилка при генерації PDF:', error);
      } finally {
         setIsGenerating(false);
      }
   };

   return (
      <>
         <style>{`
            @media print {
               @page {
                  size: A4 portrait;
                  margin: 0 !important; 
               }
               body {
                  margin: 0 !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
               }
               ::-webkit-scrollbar {
                  display: none !important;
               }
            }
         `}</style>

         <div className="fixed inset-0 z-[190] bg-slate-950/75 backdrop-blur-md print:bg-transparent print:backdrop-blur-none transition-all"></div>

         <div className="fixed top-20 left-75 flex flex-col items-start gap-2 print:hidden z-[210]">
            <button
               onClick={onClose}
               className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white p-3 rounded-full shadow-lg transition-all hover:rotate-90"
               title="Закрити"
            >
               <X className="w-6 h-6" />
            </button>
         </div>
         <div className="fixed top-20 right-45 flex flex-col items-end gap-2 print:hidden z-[210]">
            <button
               onClick={handleDownloadPDF}
               disabled={isGenerating}
               className={`bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 font-bold transition-all ${
                  isGenerating ? 'opacity-70 cursor-wait' : 'hover:scale-105'
               }`}
            >
               <Printer
                  className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`}
               />
               {isGenerating ? 'Генерація PDF...' : 'Зберегти PDF'}
            </button>
         </div>
         <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:p-8 overflow-y-auto print:p-0 print:overflow-hidden pointer-events-none">
            <div
               ref={reportRef}
               className="bg-white pointer-events-auto text-slate-900 w-full max-w-[210mm] min-h-[297mm] shadow-[0_20px_50px_rgba(0,0,0,0.5)] print:shadow-none relative mt-12 print:mt-0 mb-12 flex flex-col overflow-hidden print:w-[210mm] print:h-[297mm] print:absolute print:top-0 print:left-0"
            >
               <div
                  className="absolute left-0 top-0 bottom-0 w-3 bg-amber-500 print:bg-amber-500"
                  style={{
                     WebkitPrintColorAdjust: 'exact',
                     printColorAdjust: 'exact',
                  }}
               ></div>
               <div className="pl-14 pr-10 py-12 flex flex-col h-full flex-1 w-full">
                  <div className="border-b-2 border-slate-200 pb-6 mb-8 flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <div
                           className="bg-slate-900 text-amber-500 p-3 rounded-lg print:bg-slate-900"
                           style={{
                              WebkitPrintColorAdjust: 'exact',
                              printColorAdjust: 'exact',
                           }}
                        >
                           <Radiation className="w-8 h-8" />
                        </div>
                        <div>
                           <h1 className="text-2xl font-black uppercase tracking-widest text-slate-900">
                              Протокол Аналізу
                           </h1>
                           <p className="text-slate-500 font-mono text-[11px] mt-1 uppercase tracking-wider">
                              ID: {reportId} • Система Commoni
                           </p>
                        </div>
                     </div>
                     <div
                        className="text-right font-mono text-[11px] text-slate-600 bg-slate-50 p-3 rounded border border-slate-100 print:bg-slate-50 print:border-slate-200"
                        style={{
                           WebkitPrintColorAdjust: 'exact',
                           printColorAdjust: 'exact',
                        }}
                     >
                        <p className="mb-1">
                           <span className="font-bold text-slate-900">
                              ДАТА:
                           </span>{' '}
                           {new Date().toLocaleDateString('uk-UA')}
                        </p>
                        <p>
                           <span className="font-bold text-slate-900">
                              ЧАС:
                           </span>{' '}
                           {new Date().toLocaleTimeString('uk-UA', {
                              hour: '2-digit',
                              minute: '2-digit',
                           })}
                        </p>
                     </div>
                  </div>
                  <div className="mb-8">
                     <h2 className="text-sm font-bold uppercase mb-3 text-slate-400 tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{' '}
                        Вхідні параметри
                     </h2>
                     <div className="grid grid-cols-3 gap-3 font-mono text-sm">
                        <div className="p-3 border border-slate-200 rounded">
                           <span className="text-slate-400 block text-[10px] uppercase mb-1">
                              Метод
                           </span>
                           <span className="font-bold text-slate-800">
                              Векторне обчисл.
                           </span>
                        </div>
                        <div className="p-3 border border-slate-200 rounded">
                           <span className="text-slate-400 block text-[10px] uppercase mb-1">
                              Режим
                           </span>
                           <span className="font-bold text-slate-800">
                              Оптимізація
                           </span>
                        </div>
                        <div className="p-3 border border-slate-200 rounded">
                           <span className="text-slate-400 block text-[10px] uppercase mb-1">
                              Статус
                           </span>
                           <span className="font-bold text-green-600">
                              Успішно
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="mb-8">
                     <h2 className="text-sm font-bold uppercase mb-3 text-slate-400 tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{' '}
                        Графік узгодження
                     </h2>
                     <div className="h-[320px] border border-slate-200 rounded p-4 pointer-events-none">
                        <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart
                              data={chartData}
                              margin={{
                                 top: 20,
                                 right: 20,
                                 bottom: 20,
                                 left: 0,
                              }}
                           >
                              <CartesianGrid
                                 strokeDasharray="3 3"
                                 vertical={false}
                                 stroke="#e2e8f0"
                              />
                              <XAxis
                                 dataKey="temp"
                                 type="number"
                                 domain={['auto', 'auto']}
                                 tickCount={9}
                                 stroke="#94a3b8"
                                 tick={{
                                    fill: '#64748b',
                                    fontSize: 12,
                                    fontFamily: 'monospace',
                                 }}
                                 label={{
                                    value: 'Температура (T), °C',
                                    position: 'insideBottom',
                                    offset: -15,
                                    fill: '#475569',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                 }}
                              />
                              <YAxis
                                 stroke="#94a3b8"
                                 tick={{
                                    fill: '#64748b',
                                    fontSize: 12,
                                    fontFamily: 'monospace',
                                 }}
                                 label={{
                                    value: 'Інтенсивність ТЛ (ум. од.)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle' },
                                    offset: 15,
                                    fill: '#475569',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                 }}
                              />
                              <Legend
                                 verticalAlign="top"
                                 height={36}
                                 iconType="circle"
                                 wrapperStyle={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace',
                                    color: '#475569',
                                 }}
                              />
                              <Area
                                 isAnimationActive={false}
                                 type="monotone"
                                 dataKey="theory"
                                 name="Теорія"
                                 stroke="#f59e0b"
                                 strokeWidth={3}
                                 fillOpacity={0.15}
                                 fill="#f59e0b"
                                 activeDot={false}
                              />
                              <Line
                                 isAnimationActive={false}
                                 type="monotone"
                                 dataKey="experiment"
                                 name="Експеримент"
                                 stroke="#475569"
                                 strokeWidth={2}
                                 dot={false}
                                 activeDot={false}
                              />
                           </ComposedChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="mb-8">
                     <h2 className="text-sm font-bold uppercase mb-3 text-amber-600 tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{' '}
                        Результати оптимізації
                     </h2>
                     <div className="grid grid-cols-4 gap-3 mb-3">
                        <div
                           className="p-3 border border-amber-200 bg-amber-50/50 rounded text-center print:bg-amber-50 print:border-amber-200"
                           style={{
                              WebkitPrintColorAdjust: 'exact',
                              printColorAdjust: 'exact',
                           }}
                        >
                           <div className="text-[10px] text-amber-700 uppercase font-bold mb-1">
                              Частот. фактор (s)
                           </div>
                           <div className="text-lg font-black font-mono text-slate-900">
                              {params.s !== undefined && params.s !== null
                                 ? Number(params.s).toExponential(2)
                                 : '0.00'}{' '}
                              <span className="opacity-65">с⁻¹</span>
                           </div>
                        </div>
                        <div
                           className="p-3 border border-amber-200 bg-amber-50/50 rounded text-center print:bg-amber-50 print:border-amber-200"
                           style={{
                              WebkitPrintColorAdjust: 'exact',
                              printColorAdjust: 'exact',
                           }}
                        >
                           <div className="text-[10px] text-amber-700 uppercase font-bold mb-1">
                              Енергія акт. (ε)
                           </div>
                           <div className="text-lg font-black font-mono text-slate-900">
                              {params.epsilon !== undefined &&
                              params.epsilon !== null
                                 ? Number(params.epsilon).toFixed(4)
                                 : '0.00'}{' '}
                              <span className="opacity-65">еВ</span>
                           </div>
                        </div>
                        <div
                           className="p-3 border border-amber-200 bg-amber-50/50 rounded text-center print:bg-amber-50 print:border-amber-200"
                           style={{
                              WebkitPrintColorAdjust: 'exact',
                              printColorAdjust: 'exact',
                           }}
                        >
                           <div className="text-[10px] text-amber-700 uppercase font-bold mb-1">
                              Порядок кін. (b)
                           </div>
                           <div className="text-lg font-black font-mono text-slate-900">
                              {params.b !== undefined && params.b !== null
                                 ? Number(params.b).toFixed(4)
                                 : '0.00'}
                           </div>
                        </div>
                        <div
                           className="p-3 border border-amber-200 bg-amber-50/50 rounded text-center print:bg-amber-50 print:border-amber-200"
                           style={{
                              WebkitPrintColorAdjust: 'exact',
                              printColorAdjust: 'exact',
                           }}
                        >
                           <div className="text-[10px] text-amber-700 uppercase font-bold mb-1">
                              Швидкість нагріву (Beta)
                           </div>
                           <div className="text-lg font-black font-mono text-slate-900">
                              {params.beta !== undefined && params.beta !== null
                                 ? Number(params.beta).toFixed(4)
                                 : '0.00'}{' '}
                              <span className="opacity-65">К/сек</span>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 border border-slate-200 rounded flex justify-between items-center">
                           <div className="text-[11px] text-slate-500 uppercase font-bold">
                              FOM (Показник)
                           </div>
                           <div className="text-lg font-bold font-mono text-slate-900">
                              {metrics.fom !== undefined && metrics.fom !== null
                                 ? Number(metrics.fom).toFixed(2)
                                 : '0.00'}
                              %
                           </div>
                        </div>
                        <div className="p-3 border border-slate-200 rounded flex justify-between items-center">
                           <div className="text-[11px] text-slate-500 uppercase font-bold">
                              ΔS (Різниця площ)
                           </div>
                           <div className="text-lg font-bold font-mono text-slate-900">
                              {metrics.delta_s !== undefined &&
                              metrics.delta_s !== null
                                 ? Number(metrics.delta_s).toFixed(2)
                                 : '0.00'}
                              %
                           </div>
                        </div>

                        <div className="p-3 border border-slate-200 rounded flex justify-between items-center">
                           <div className="text-[11px] text-slate-500 uppercase font-bold">
                              Екстремум піку
                           </div>
                           <div className="text-right font-mono font-bold">
                              <div className="text-slate-900 flex items-baseline justify-start gap-1.5 mb-1">
                                 <span className="text-[10px] text-slate-400 font-normal">
                                    T:
                                 </span>
                                 <span className="text-base leading-none">
                                    {chartData.length > 0
                                       ? Number(peakPoint.temp).toFixed(1)
                                       : '0.0'}{' '}
                                    <span className="opacity-65">°C</span>
                                 </span>
                              </div>
                              <div className="text-amber-600 flex items-baseline justify-start gap-1.5">
                                 <span className="text-[10px] text-amber-500/70 font-normal">
                                    I:
                                 </span>
                                 <span className="text-base leading-none">
                                    {chartData.length > 0
                                       ? Number(peakPoint.experiment).toFixed(1)
                                       : '0.0'}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-auto pt-8 border-t border-slate-200 flex justify-between text-sm font-mono text-slate-600">
                     <div className="w-[45%]">
                        <p className="mb-8 font-bold uppercase text-[10px] text-slate-400 tracking-wider">
                           Дослідження провів:
                        </p>
                        <div className="border-b border-slate-400 mb-1"></div>
                        <p className="text-left text-[10px] text-slate-500">
                           Підпис, ПІБ
                        </p>
                     </div>
                     <div className="w-[45%]">
                        <p className="mb-8 font-bold uppercase text-[10px] text-slate-400 tracking-wider">
                           Керівник / Перевірив:
                        </p>
                        <div className="border-b border-slate-400 mb-1"></div>
                        <p className="text-left text-[10px] text-slate-500">
                           Підпис, ПІБ
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default DocumentSection;
