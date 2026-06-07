import { useState } from 'react';

export const useResultsBoard = (resultsData) => {
   const [showReport, setShowReport] = useState(false);

   const params = resultsData?.parameters || {};
   const metrics = resultsData?.metrics || {};

   const openReport = () => setShowReport(true);
   const closeReport = () => setShowReport(false);

   return {
      showReport,
      params,
      metrics,
      openReport,
      closeReport,
   };
};
