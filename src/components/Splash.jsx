import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo-inicio.webp";

// Pantalla de bienvenida con secuencia en 3 tiempos:
//  1) el logo se revela desde el centro (círculo) con efecto de enfoque
//  2) un destello recorre el logo, suben chispas rojas y aparece el lema
//  3) dos cortinas se abren hacia los lados y se revela la página
const ENTRADA_MS = 2400; // cuándo empiezan a abrirse las cortinas
const SALIDA_MS = 900; // cuánto tardan las cortinas en abrirse

const CHISPAS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 3 + (i % 3) * 2,
  delay: (i % 8) * 0.3,
  duracion: 2.6 + (i % 5) * 0.55,
}));

export default function Splash() {
  const reducir = useReducedMotion();
  // Se muestra solo la primera vez por sesión: al recargar o volver no hace esperar.
  const [fase, setFase] = useState(() => {
    try {
      return sessionStorage.getItem("mdc-splash") ? "fuera" : "entrada";
    } catch {
      return "entrada";
    }
  }); // entrada -> salida -> fuera

  useEffect(() => {
    if (fase === "fuera") return;
    try {
      sessionStorage.setItem("mdc-splash", "1");
    } catch {
      /* sin almacenamiento: se mostrará cada vez */
    }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setFase("salida"), reducir ? 1200 : ENTRADA_MS);
    const t2 = setTimeout(
      () => {
        setFase("fuera");
        document.body.style.overflow = "";
      },
      (reducir ? 1200 : ENTRADA_MS) + SALIDA_MS
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducir]);

  if (fase === "fuera") return null;
  const saliendo = fase === "salida";
  const cortina = {
    duration: SALIDA_MS / 1000,
    ease: [0.76, 0, 0.24, 1],
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* cortinas */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#1d1d1b]"
        animate={{ x: saliendo ? "-100%" : "0%" }}
        transition={cortina}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#1d1d1b]"
        animate={{ x: saliendo ? "100%" : "0%" }}
        transition={cortina}
      />

      {/* contenido */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={saliendo ? { opacity: 0, scale: 1.25 } : { opacity: 1, scale: 1 }}
        transition={{ duration: saliendo ? 0.6 : 0.3, ease: "easeIn" }}
      >
        {/* chispas que suben */}
        {!reducir &&
          CHISPAS.map((c, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-brand-red shadow-[0_0_12px_rgba(216,31,26,0.9)]"
              style={{ left: c.left + "%", width: c.size, height: c.size }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: "-95vh", opacity: [0, 0.9, 0] }}
              transition={{ duration: c.duracion, delay: c.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

        {/* logo: revelado circular + enfoque */}
        <motion.div
          className="relative w-[82vw] max-w-lg"
          initial={{ clipPath: "circle(0% at 50% 50%)", scale: 1.2, filter: "blur(14px)" }}
          animate={{ clipPath: "circle(75% at 50% 50%)", scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <motion.img
            src={logo}
            alt=""
            className="block w-full h-auto"
            animate={reducir ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          />
          {/* destello que cruza el logo (recortado con la forma del logo) */}
          {!reducir && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                WebkitMaskImage: `url(${logo})`,
                maskImage: `url(${logo})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              <motion.div
                className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                initial={{ x: "0%" }}
                animate={{ x: "450%" }}
                transition={{ duration: 0.9, delay: 1.25, ease: "easeInOut" }}
              />
            </div>
          )}
        </motion.div>

        {/* lema */}
        <motion.p
          className="relative mt-8 text-xs sm:text-sm tracking-[6px] uppercase text-brand-cream-dim"
          initial={{ opacity: 0, y: 14, letterSpacing: "14px" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "6px" }}
          transition={{ duration: 0.9, delay: 1.3, ease: "easeOut" }}
        >
          Carnes frescas · Concón
        </motion.p>

        {/* barra de carga */}
        <div className="relative mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-brand-red"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: (ENTRADA_MS - 500) / 1000, delay: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
