import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import Hero from "./components/Hero";
import About from "./components/About";
import DeliveryInfo from "./components/DeliveryInfo";
import CategorySection from "./components/CategorySection";
import Featured from "./components/Featured";
import Location from "./components/Location";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import CartDrawer from "./components/CartDrawer";
import StockPanel from "./components/StockPanel";
import Splash from "./components/Splash";
import SearchResults from "./components/SearchResults";
import { useShop } from "./context/useShop";
import { categorias } from "./data/productos";

import vacunoBg from "./assets/vacuno-bg.webp";
import cerdoBg from "./assets/cerdo-bg.webp";
import polloBg from "./assets/pollo-bg.webp";
import fiambreriaBg from "./assets/fiambreria-bg.webp";
import abarroteBg from "./assets/abarrote-bg.webp";
import empanadasBg from "./assets/empanadas-bg.webp";

const imagenesPorCategoria = {
  vacuno: vacunoBg,
  cerdo: cerdoBg,
  pollo: polloBg,
  fiambreria: fiambreriaBg,
  abarrotes: abarroteBg,
  empanadas: empanadasBg,
};

function App() {
  const { busqueda } = useShop();
  const buscando = busqueda.trim().length > 0;

  return (
    <>
      <Splash />
      <div className="sticky top-0 z-50">
        <Header />
        <CategoryNav />
      </div>

      <main>
        <Hero />
        <About />
        <DeliveryInfo />

        {buscando ? (
          <SearchResults />
        ) : (
          categorias.map((categoria, index) => (
            <CategorySection
              key={categoria.id}
              id={categoria.id}
              nombre={categoria.nombre}
              descripcion={categoria.descripcion}
              productos={categoria.productos}
              alterna={index % 2 === 1}
              bgImage={imagenesPorCategoria[categoria.id]}
            />
          ))
        )}

        <Featured />
        <Location />
      </main>
      <Footer />
      <WhatsappFloat />
      <CartDrawer />
      <StockPanel />
    </>
  );
}

export default App;
