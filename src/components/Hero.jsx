import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "../data/cortes";
import heroBg from "../assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative text-center px-6 pt-24 pb-28 overflow-hidden">
      {/* foto de fondo */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      {/* degradado para que el texto se lea bien encima de la foto */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg/80 to-brand-bg" />

      {/* glows ambientales */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-red/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[15%] w-[280px] h-[280px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[15%] w-[220px] h-[220px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs tracking-[4px] uppercase text-brand-red font-semibold mb-4"
        >
          Carnicería de barrio · Concón
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl leading-tight mb-6"
        >
          Carne de verdad,<br />
          cortada como <span className="text-brand-red whitespace-nowrap">se debe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-cream-dim text-lg max-w-md mx-auto mb-9"
        >
          Cortes seleccionados, atención directa y el sabor de la carnicería
          de siempre — ahora a un mensaje de distancia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=Hola%2C%20quiero%20hacer%20un%20pedido"}
            target="_blank"
            rel="noopener"
            className="bg-brand-red hover:bg-red-600 text-brand-cream font-bold text-sm px-8 py-4 rounded-sm shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all"
          >
            Hacer un pedido
          </a>
          <a
            href="#vacuno"
            className="border border-brand-cream-dim hover:border-brand-red hover:text-brand-red text-sm font-semibold px-8 py-4 rounded-sm transition"
          >
            Ver cortes disponibles
          </a>
        </motion.div>
      </div>
    </section>
  );
}
