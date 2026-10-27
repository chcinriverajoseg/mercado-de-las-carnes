import { motion } from "framer-motion";
import Mascota from "./Mascota";
import ProductCard from "./ProductCard";
import { OFERTAS } from "../data/productos";
import { NEGOCIO } from "../data/negocio";
import { formatCLP } from "../utils/format";

export default function Ofertas() {
  if (OFERTAS.length === 0) return null;

  return (
    <section id="ofertas" className="relative px-4 sm:px-6 py-20 scroll-mt-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Mascota side="right" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="inline-block bg-amber-400 text-black text-xs font-extrabold tracking-[2px] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Ofertas de la semana
          </span>
          <h2 className="font-display text-3xl sm:text-4xl mb-3">Los mejores cortes, a mejor precio</h2>
          <p className="text-brand-cream-dim">
            Precios especiales por tiempo limitado.
            {NEGOCIO.despachoGratisDesde > 0 &&
              ` Y si tu compra supera ${formatCLP(NEGOCIO.despachoGratisDesde)}, el despacho es gratis.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {OFERTAS.map((p, i) => (
            <ProductCard key={p.id} producto={p} categoriaId={p.categoriaId} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
