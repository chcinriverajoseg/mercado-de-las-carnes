import { motion } from "framer-motion";
import { waLink } from "../data/negocio";
import heroBg from "../assets/hero-bg.webp";

export default function Hero() {
  return (
    <section className="relative text-center px-4 sm:px-6 pt-6 sm:pt-10 pb-24 overflow-hidden">
      {/* glows ambientales */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-red/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[15%] w-[280px] h-[280px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[15%] w-[220px] h-[220px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      {/* foto de la fachada completa, sin recortes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl mx-auto mb-12 rounded-xl overflow-hidden border border-brand-line shadow-2xl shadow-black/60"
      >
        <img
          src={heroBg}
          width="1800"
          height="798"
          alt="Fachada de Mercado de las Carnes"
          fetchPriority="high"
          className="block w-full h-auto"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-bg/60 to-transparent" />
      </motion.div>

      <div className="relative max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs tracking-[4px] uppercase text-brand-red-text font-semibold mb-4"
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
          cortada como <span className="text-brand-red-text whitespace-nowrap">se debe</span>
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="bg-brand-red hover:bg-[#d81f1a] text-brand-cream font-bold text-sm px-8 py-4 rounded-sm shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all"
          >
            Hacer un pedido
          </a>
          <a
            href="#vacuno"
            className="border border-brand-cream-dim hover:border-brand-red hover:text-brand-red-text text-sm font-semibold px-8 py-4 rounded-sm transition"
          >
            Ver catálogo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
