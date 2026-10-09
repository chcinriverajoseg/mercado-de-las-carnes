import { motion } from "framer-motion";
import Mascota from "./Mascota";
import { WHATSAPP_NUMBER } from "../data/cortes";

export default function Featured() {
  return (
    <section id="corte-semana" className="relative scroll-mt-16 px-6 pt-4 md:pt-40 pb-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Mascota side="left" top="-top-36" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-brand-panel to-brand-panel-2 rounded-xl p-8 sm:p-14 grid sm:grid-cols-2 gap-10 items-center overflow-hidden border-l-4 border-brand-red shadow-xl shadow-black/40"
        >
          <div>
            <span className="inline-block bg-brand-red text-brand-cream text-xs font-bold tracking-[2px] uppercase px-3.5 py-1.5 rounded-full mb-5 shadow-md shadow-brand-red/40">
              Corte de la semana
            </span>
            <h3 className="font-display text-3xl mb-4">Malaya al jugo</h3>
            <p className="text-brand-cream-dim mb-6">
              Nuestra especialidad de la semana: corte magro y sabroso, ideal
              para preparar al jugo o a la plancha. Cantidad limitada.
            </p>
            <a
              href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=Hola%2C%20quiero%20consultar%20por%20la%20malaya%20al%20jugo"}
              target="_blank"
              rel="noopener"
              className="inline-block bg-brand-red hover:bg-red-600 text-brand-cream font-bold text-sm px-7 py-3.5 rounded-sm shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all"
            >
              Consultar disponibilidad
            </a>
          </div>

          <div className="aspect-[4/3] bg-brand-panel-2 border border-dashed border-brand-line rounded-lg flex items-center justify-center text-brand-gray text-sm text-center p-5">
            Foto del corte de la semana<br />(reemplazar con imagen real)
          </div>
        </motion.div>
      </div>
    </section>
  );
}
