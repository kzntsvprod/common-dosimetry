import { useEffect, useRef, useState, useMemo } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const useDocumentSection = (resultsData) => {
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

   const chartData = useMemo(() => {
      if (!resultsData?.chart_data) return [];
      return resultsData.chart_data.temperature.map((t, i) => ({
         temp: t,
         experiment: resultsData.chart_data.experimental_intensity[i],
         theory: resultsData.chart_data.theoretical_intensity[i],
      }));
   }, [resultsData]);

   const params = resultsData?.parameters || {};
   const metrics = resultsData?.metrics || {};

   const peakPoint = useMemo(() => {
      if (!chartData || chartData.length === 0)
         return { temp: 0, experiment: 0 };
      return chartData.reduce(
         (max, point) => (point.experiment > max.experiment ? point : max),
         { temp: 0, experiment: 0 }
      );
   }, [chartData]);

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

   return {
      reportRef,
      isGenerating,
      reportId,
      chartData,
      params,
      metrics,
      peakPoint,
      handleDownloadPDF,
   };
};
