import { motion, useReducedMotion } from "framer-motion";
import mascota from "../assets/mascota.png";

// Mascota decorativa que flota suavemente y entra con animación al hacer scroll.
// side: "left" | "right" (esquina superior de la sección donde se coloca).
export default function Mascota({ side = "right", top = "-top-4", className = "" }) {
  const reducir = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={
        "hidden md:block absolute z-10 pointer-events-none " +
        top +
        " " +
        (side === "left" ? "left-0 " : "right-0 ") +
        className
      }
    >
      <motion.img
        src={mascota}
        alt=""
        loading="lazy"
        className="w-28 lg:w-36 h-auto drop-shadow-[0_10px_18px_rgba(216,31,26,0.35)]"
        animate={reducir ? undefined : { y: [0, -12, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
