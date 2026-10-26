import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryIcon } from "./icons";
import Mascota from "./Mascota";
import ProductCard from "./ProductCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// Cuántos productos se muestran antes del botón "Ver todos".
const VISIBLES = 9;

export default function CategorySection({ id, nombre, descripcion, productos, alterna, bgImage }) {
  const [verTodos, setVerTodos] = useState(false);
  // Orden: "Más pedido" primero, luego disponibles, y los agotados al final.
  const orden = (p) => (p.stock === 0 ? 2 : p.destacado ? 0 : 1);
  const ordenados = [...productos].sort((a, b) => orden(a) - orden(b));
  const lista = verTodos ? ordenados : ordenados.slice(0, VISIBLES);
  const ocultos = productos.length - VISIBLES;

  return (
    <section
      id={id}
      className={"relative px-4 sm:px-6 py-20 scroll-mt-32 overflow-hidden " + (alterna ? "bg-brand-panel" : "")}
    >
      {/* foto de fondo opcional, por categoría */}
      {bgImage && (
        <>
          <img src={bgImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div
            className={
              "absolute inset-0 bg-gradient-to-b " +
              (alterna
                ? "from-brand-panel/60 via-brand-panel/80 to-brand-panel"
                : "from-brand-bg/60 via-brand-bg/80 to-brand-bg")
            }
          />
        </>
      )}

      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Mascota side={alterna ? "left" : "right"} />
        <motion.div
          className="text-center max-w-lg mx-auto mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
            <CategoryIcon id={id} className="w-6 h-6" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl mb-3">{nombre}</h2>
          <p className="text-brand-cream-dim">{descripcion}</p>
          <p className="text-xs text-brand-gray mt-2">{productos.length} productos</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {lista.map((producto, i) => (
            <ProductCard key={producto.id} producto={producto} categoriaId={id} alterna={alterna} index={i} />
          ))}
        </div>

        {ocultos > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => {
                if (verTodos) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                setVerTodos((v) => !v);
              }}
              className="border border-brand-cream-dim hover:border-brand-red hover:text-brand-red text-sm font-semibold px-8 py-3.5 rounded-sm transition"
            >
              {verTodos ? "Mostrar menos" : `Ver los ${productos.length} productos de ${nombre.toLowerCase()}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
