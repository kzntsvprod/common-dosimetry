import { LineChart, ChevronRight } from 'lucide-react';
import heroGraphic from '../assets/tld_reader.png';

const Hero = ({ scrollToSection }) => (
   <header
      id="hero"
      className="relative overflow-hidden bg-slate-50 dark:bg-[#0f1523] transition-colors duration-300"
   >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 transition-colors duration-300" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 min-h-screen flex flex-col justify-center">
         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-16 lg:mt-0">
            <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
               <h1 className="text-4xl md:text-5xl lg:text-[54px] font-serif text-slate-900 dark:text-white uppercase tracking-tight mb-6 leading-[1.15] transition-colors duration-300">
                  Дозиметричний <br />
                  Оптимізатор{' '}
                  <span className="text-amber-600 dark:text-[#E87B1E] transition-colors duration-300">
                     Commoni
                  </span>
               </h1>

               <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-serif transition-colors duration-300">
                  Веб-сервіс для точного знаходження параметрів фізичної моделі
                  термолюмінесценції. Швидке обчислення кінетичних констант за
                  алгоритмом сіткового пошуку.
               </p>

               <button
                  onClick={(e) => scrollToSection(e, 'lab')}
                  className="bg-amber-500 hover:bg-amber-600 dark:bg-[#E87B1E] dark:hover:bg-[#d66a15] text-white shadow-md font-bold py-4 px-8 rounded-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 cursor-pointer group"
               >
                  <LineChart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Розпочати аналіз
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
            <div className="flex-1 w-full lg:w-1/2 relative">
               <img
                  src={heroGraphic}
                  alt="Commoni Optimization 3D Graphic"
                  className="block mx-auto w-full max-w-[650px] scale-130 lg:scale-155 h-auto object-contain drop-shadow-2xl transition-all duration-300"
               />
            </div>
         </div>
      </div>
   </header>
);

export default Hero;
