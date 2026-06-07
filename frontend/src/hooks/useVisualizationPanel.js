import { useMemo } from 'react';

export const useVisualizationPanel = (resultsData) => {
   const chartData = useMemo(() => {
      if (!resultsData?.chart_data) return [];

      return resultsData.chart_data.temperature.map((t, i) => ({
         temp: t,
         experiment: resultsData.chart_data.experimental_intensity[i],
         theory: resultsData.chart_data.theoretical_intensity[i],
      }));
   }, [resultsData]);

   return { chartData };
};
