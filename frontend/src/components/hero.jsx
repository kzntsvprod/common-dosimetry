import { Terminal } from 'lucide-react';

const Hero = ({ scrollToSection }) => (
   <header
      id="hero"
      className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
   >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 transition-colors duration-300" />
      <div className="w-full px-6 md:px-12 py-24 relative z-10 flex flex-col items-center text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-mono text-amber-600 dark:text-amber-400 mb-8 uppercase tracking-widest transition-colors duration-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Система готова до роботи
         </div>
         <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 transition-colors duration-300">
            Дозиметричний <br />
            <span className="text-amber-600 dark:text-amber-500">
               Аналіз Даних
            </span>
         </h1>
         <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed transition-colors duration-300">
            Веб-сервіс для знаходження оптимальних параметрів фізичної моделі
            термолюмінесценції. Швидке обчислення кінетичних констант за
            оптимізаційним алгоритмом Common.
         </p>
         <button
            onClick={(e) => scrollToSection(e, 'lab')}
            className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-white shadow-md font-bold py-4 px-8 rounded-sm uppercase tracking-widest transition-all flex items-center gap-3 cursor-pointer group"
         >
            <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Розпочати аналіз
         </button>
      </div>
   </header>
);

export default Hero;
