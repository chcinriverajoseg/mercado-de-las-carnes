import { motion } from "framer-motion";
import Mascota from "./Mascota";
import { waLink } from "../data/negocio";
import { CORTE_SEMANA, buscarProducto } from "../data/productos";
import { fotoProducto } from "../utils/fotos";
import { useShop } from "../context/useShop";

export default function Featured() {
  const { addItem } = useShop();
  const producto = buscarProducto(CORTE_SEMANA.id);
  // Foto: primero "corte-de-la-semana.*", si no existe usa la foto del producto.
  const foto = fotoProducto("corte-de-la-semana") || (producto && fotoProducto(producto.nombre));
  const disponible = producto && producto.stock > 0;

  return (
    <section id="corte-semana" className="relative scroll-mt-32 px-4 sm:px-6 pt-4 md:pt-40 pb-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Mascota side="left" top="-top-36" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-brand-panel to-brand-panel-2 rounded-xl p-6 sm:p-14 grid sm:grid-cols-2 gap-10 items-center overflow-hidden border-l-4 border-brand-red shadow-xl shadow-black/40"
        >
          <div>
            <span className="inline-block bg-brand-red text-brand-cream text-xs font-bold tracking-[2px] uppercase px-3.5 py-1.5 rounded-full mb-5 shadow-md shadow-brand-red/40">
              Corte de la semana
            </span>
            <h3 className="font-display text-3xl mb-4">{CORTE_SEMANA.titulo}</h3>
            <p className="text-brand-cream-dim mb-5">{CORTE_SEMANA.texto}</p>
            {producto && (
              <p className="mb-6">
                <span className="font-display text-brand-red-text text-2xl">{producto.precio}</span>{" "}
                <span className="text-sm text-brand-gray">{producto.unidad}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {disponible && (
                <button
                  onClick={() => addItem(producto, 1)}
                  className="bg-brand-red hover:bg-[#d81f1a] text-brand-cream font-bold text-sm px-7 py-3.5 rounded-sm shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all"
                >
                  Agregar 1 kg al carrito
                </button>
              )}
              <a
                href={waLink(`Hola, quiero consultar por la ${CORTE_SEMANA.titulo.toLowerCase()}`)}
                target="_blank"
                rel="noopener"
                className="border border-brand-cream-dim hover:border-brand-red hover:text-brand-red-text text-sm font-semibold px-7 py-3.5 rounded-sm transition"
              >
                Consultar disponibilidad
              </a>
            </div>
          </div>

          {foto ? (
            <img
              src={foto}
              alt={CORTE_SEMANA.titulo}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover border border-brand-line shadow-lg shadow-black/40"
            />
          ) : (
            <div className="aspect-[4/3] bg-brand-panel-2 border border-dashed border-brand-line rounded-lg flex flex-col items-center justify-center gap-3 text-center p-5">
              <span className="font-display text-5xl text-brand-red/40">★</span>
              <span className="text-brand-cream-dim text-sm">Corte fresco, preparado el mismo día.</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
