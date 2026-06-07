import { useState, useEffect } from 'react';

export const useNavigation = (sectionIds = ['hero', 'lab', 'archive']) => {
   const [activeSection, setActiveSection] = useState(sectionIds[0]);

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY + window.innerHeight / 3;

         for (const section of sectionIds) {
            const element = document.getElementById(section);
            if (element) {
               const { top, bottom } = element.getBoundingClientRect();
               const absoluteTop = top + window.scrollY;
               const absoluteBottom = bottom + window.scrollY;

               if (
                  scrollPosition >= absoluteTop &&
                  scrollPosition < absoluteBottom
               ) {
                  setActiveSection(section);
                  break;
               }
            }
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, [sectionIds]);

   const scrollToSection = (e, sectionId) => {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return { activeSection, scrollToSection };
};
