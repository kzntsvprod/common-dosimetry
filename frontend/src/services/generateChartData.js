export const generateChartData = () => {
   const data = [];
   const Tm = 240;
   const Im = 85;
   const w = 45;

   for (let temp = 50; temp <= 450; temp += 5) {
      const theory =
         Im * Math.exp(-Math.pow(temp - Tm, 2) / (2 * Math.pow(w, 2)));
      const randomValue = Math.random();
      const noiseLevel = (randomValue - 0.5) * 6 * (theory / Im + 0.2);
      const experiment = Math.max(0, theory + noiseLevel);

      data.push({
         temp,
         theory: Number(theory.toFixed(2)),
         experiment: Number(experiment.toFixed(2)),
      });
   }
   return data;
};
