import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import Hero from "./components/Hero";
import DeliveryInfo from "./components/DeliveryInfo";
import CategorySection from "./components/CategorySection";
import Featured from "./components/Featured";
import About from "./components/About";
import Location from "./components/Location";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import { categorias } from "./data/productos";

import vacunoBg from "./assets/vacuno-bg.jpg";
import cerdoBg from "./assets/cerdo-bg.jpg";
import polloBg from "./assets/pollo-bg.jpg";
import fiambreriaBg from "./assets/fiambreria-bg.jpg";
import abarroteBg from "./assets/abarrote-bg.jpg";
import empanadasBg from "./assets/empanadas-bg.jpg";

const imagenesPorCategoria = {
  vacuno: vacunoBg,
  cerdo: cerdoBg,
  pollo: polloBg,
  fiambreria: fiambreriaBg,
  abarrotes: abarroteBg,
  empanadas: empanadasBg,
};

function App() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <CategoryNav />
      </div>

      <Hero />
      <DeliveryInfo />

      {categorias.map((categoria, index) => (
        <CategorySection
          key={categoria.id}
          id={categoria.id}
          nombre={categoria.nombre}
          descripcion={categoria.descripcion}
          productos={categoria.productos}
          alterna={index % 2 === 1}
          bgImage={imagenesPorCategoria[categoria.id]}
        />
      ))}

      <Featured />
      <About />
      <Location />
      <Footer />
      <WhatsappFloat />
    </>
  );
}

export default App;
