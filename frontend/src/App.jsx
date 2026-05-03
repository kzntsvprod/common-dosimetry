import Header from './components/header.jsx';
import Hero from './components/hero.jsx';
import LabSection from './components/labSection.jsx';
import ArchiveSection from './components/archiveSection.jsx';
import Footer from './components/footer.jsx';

function App() {
   return (
      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-amber-200">
         <Header />
         <Hero />
         <LabSection />
         <ArchiveSection />
         <Footer />
      </div>
   );
}

export default App;
