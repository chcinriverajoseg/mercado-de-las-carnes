import { motion } from "framer-motion";
import { CategoryIcon } from "./icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function CategorySection({ id, nombre, descripcion, productos, alterna, bgImage }) {
  return (
    <section
      id={id}
      className={
        "relative px-6 py-20 scroll-mt-32 overflow-hidden " +
        (alterna ? "bg-brand-panel" : "")
      }
    >
      {/* foto de fondo opcional, por categoría */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
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

      {/* glow ambiental decorativo */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
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
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {productos.map((producto, i) => (
            <motion.div
              key={producto.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className={
                "relative rounded-xl p-6 border border-brand-line shadow-lg shadow-black/30 " +
                "hover:border-brand-red hover:shadow-brand-red/20 hover:-translate-y-1.5 transition-all duration-300 " +
                (alterna
                  ? "bg-gradient-to-b from-brand-panel-2 to-brand-panel"
                  : "bg-gradient-to-b from-brand-panel to-black/40")
              }
            >
              {producto.destacado && (
                <span className="absolute -top-2.5 right-4 bg-brand-red text-brand-cream text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-md shadow-brand-red/40">
                  Más pedido
                </span>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <CategoryIcon id={id} className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base leading-snug pt-1">{producto.nombre}</h3>
              </div>

              <p className="text-brand-gray text-sm mb-5 min-h-[38px]">{producto.desc}</p>

              <div className="flex items-baseline justify-between border-t border-dashed border-brand-line pt-3">
                <span className="font-display text-brand-red text-lg">{producto.precio}</span>
                <span className="text-xs text-brand-gray">{producto.unidad}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
