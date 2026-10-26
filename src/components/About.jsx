import { motion } from "framer-motion";
import Mascota from "./Mascota";
import fachada from "../assets/hero-bg.webp";
import { fotoProducto } from "../utils/fotos";
import { TOTAL_PRODUCTOS } from "../data/productos";

const fotoA = fotoProducto("Asado de tira");
const fotoB = fotoProducto("Lomo vetado");
// Si aún no hay fotos reales de productos, se muestra solo la fachada.
const hayFotos = Boolean(fotoA && fotoB);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="nosotros" className="relative px-4 sm:px-6 py-24 overflow-hidden scroll-mt-32">
      <div className="absolute top-1/3 -left-24 w-[320px] h-[320px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Mascota side="right" className="lg:-top-12" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-3.5"
        >
          <img
            src={fachada}
            alt="Fachada del local en Avenida Concón Reñaca"
            loading="lazy"
            className={
              "h-full w-full object-cover border border-brand-line rounded-lg shadow-lg shadow-black/30 " +
              (hayFotos ? "row-span-2" : "col-span-2 aspect-[4/3]")
            }
          />
          {hayFotos && (
            <>
              <img
                src={fotoA}
                alt="Asado de tira"
                loading="lazy"
                className="aspect-square w-full object-cover border border-brand-line rounded-lg shadow-lg shadow-black/30"
              />
              <img
                src={fotoB}
                alt="Lomo vetado"
                loading="lazy"
                className="aspect-square w-full object-cover border border-brand-line rounded-lg shadow-lg shadow-black/30"
              />
            </>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-xs tracking-[4px] uppercase text-brand-red font-semibold mb-2.5 inline-block">
            Nuestra historia
          </span>
          <h2 className="font-display text-3xl sm:text-4xl mb-5 lg:pr-32">
            Carnicería de barrio, con nombre propio
          </h2>
          <p className="text-brand-cream-dim mb-4">
            Mercado de las Carnes nace para ofrecer algo simple: carne
            fresca, buen trato y precios claros, todos los días de la semana.
          </p>
          <p className="text-brand-cream-dim mb-4">
            Seleccionamos cada corte pensando en lo que realmente se cocina
            en Concón — desde el asado del domingo hasta el pedido rápido
            para la semana.
          </p>

          <div className="flex gap-6 sm:gap-9 mt-8 pt-7 border-t border-brand-line">
            <div>
              <strong className="font-display text-brand-red text-2xl block mb-1">100%</strong>
              <span className="text-xs text-brand-gray uppercase tracking-wide">Carne fresca</span>
            </div>
            <div>
              <strong className="font-display text-brand-red text-2xl block mb-1">7</strong>
              <span className="text-xs text-brand-gray uppercase tracking-wide">Días atendiendo</span>
            </div>
            <div>
              <strong className="font-display text-brand-red text-2xl block mb-1">+{Math.floor(TOTAL_PRODUCTOS / 10) * 10}</strong>
              <span className="text-xs text-brand-gray uppercase tracking-wide">Productos</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
