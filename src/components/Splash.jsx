/*import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo-inicio.png";

const ENTRADA_MS = 3000;
const SALIDA_MS = 1000;

const CHISPAS = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 3 + (i % 3) * 2,
  delay: (i % 8) * 0.3,
  duracion: 2.6 + (i % 5) * 0.55,
  color: i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-yellow-400" : "bg-white",
}));

export default function Splash() {
  const reducir = useReducedMotion();
  const [fase, setFase] = useState("entrada");

  useEffect(() => {
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
  }, [reducir]);

  if (fase === "fuera") return null;
  const saliendo = fase === "salida";
  const cortina = {
    duration: SALIDA_MS / 1000,
    ease: [0.76, 0, 0.24, 1],
  };
/*
  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* cortinas con textura metálica *//*}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-b from-[#111] via-[#1d1d1b] to-[#000]"
        animate={{ x: saliendo ? "-100%" : "0%" }}
        transition={cortina}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-b from-[#111] via-[#1d1d1b] to-[#000]"
        animate={{ x: saliendo ? "100%" : "0%" }}
        transition={cortina}
      />

      {/* fondo dinámico diagonal *//*}
      <motion.div
        className="absolute inset-0"
        initial={{ background: "linear-gradient(135deg, #0a0a0a, #1d1d1b)" }}
        animate={{
          background: [
            "linear-gradient(135deg, #0a0a0a, #1d1d1b)",
            "linear-gradient(135deg, #1d1d1b, #3a0a0a)",
            "linear-gradient(135deg, #0a0a0a, #1d1d1b)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* contenido *//*}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={saliendo ? { opacity: 0, scale: 1.25 } : { opacity: 1, scale: 1 }}
        transition={{ duration: saliendo ? 0.6 : 0.3, ease: "easeIn" }}
      >
        {/* halo dorado detrás del logo *//*}
        <motion.div
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-yellow-500/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.8, scale: [0.8, 1.05, 0.95, 1.05] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />

        {/* chispas multicolor *//*}
        {!reducir &&
          CHISPAS.map((c, i) => (
            <motion.span
              key={i}
              className={`absolute bottom-0 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)] ${c.color}`}
              style={{ left: c.left + "%", width: c.size, height: c.size }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: "-95vh", opacity: [0, 0.9, 0] }}
              transition={{ duration: c.duracion, delay: c.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

        {/* logo *//*}
        <motion.div
          className="relative w-[82vw] max-w-lg overflow-hidden rounded-md"
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
          {!reducir && (
            <motion.div
              className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              initial={{ x: "0%" }}
              animate={{ x: "450%" }}
              transition={{ duration: 0.9, delay: 1.25, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {/* lema con glow pulsante *//*}
        <motion.p
          className="relative mt-8 text-sm sm:text-base tracking-[6px] uppercase text-brand-cream-dim"
          initial={{ opacity: 0, y: 14, letterSpacing: "14px" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "6px" }}
          transition={{ duration: 0.9, delay: 1.3, ease: "easeOut" }}
          style={{
            textShadow: "0 0 12px rgba(255, 200, 150, 0.9), 0 0 24px rgba(255, 200, 150, 0.7)",
          }}
        >
          Carnes frescas · Concón
        </motion.p>

        {/* barra de carga con brillo animado *//*}
        <div className="relative mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-red-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: (ENTRADA_MS - 500) / 1000, delay: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}*/




import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo-inicio.png";

const ENTRADA_MS = 3500;
const SALIDA_MS = 1200;

const PARTICULAS = Array.from({ length: 25 }, (_, i) => ({
  left: Math.random() * 100,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 2,
  duracion: 3 + Math.random() * 2,
  color: ["bg-red-500", "bg-yellow-400", "bg-white"][i % 3],
}));

export default function Splash() {
  const reducir = useReducedMotion();
  const [fase, setFase] = useState("entrada");

  useEffect(() => {
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
  }, [reducir]);

  if (fase === "fuera") return null;
  const saliendo = fase === "salida";
  const cortina = {
    duration: SALIDA_MS / 1000,
    ease: [0.76, 0, 0.24, 1],
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* cortinas con efecto cristal */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-b from-[#111] via-[#1d1d1b] to-[#000]"
        animate={{ x: saliendo ? "-120%" : "0%", opacity: saliendo ? 0 : 1 }}
        transition={cortina}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-b from-[#111] via-[#1d1d1b] to-[#000]"
        animate={{ x: saliendo ? "120%" : "0%", opacity: saliendo ? 0 : 1 }}
        transition={cortina}
      />

      {/* fondo con partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1d1d1b] to-[#2a0a0a]" />
      {!reducir &&
        PARTICULAS.map((p, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${p.color} shadow-[0_0_12px_rgba(255,255,255,0.8)]`}
            style={{ left: p.left + "%", width: p.size, height: p.size }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{ duration: p.duracion, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* contenido */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={saliendo ? { opacity: 0, scale: 1.3 } : { opacity: 1, scale: 1 }}
        transition={{ duration: saliendo ? 0.8 : 0.4, ease: "easeInOut" }}
      >
        {/* halo multicolor */}
        <motion.div
          className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.6],
            backgroundColor: ["rgba(255,0,0,0.3)", "rgba(255,215,0,0.3)", "rgba(255,255,255,0.3)"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* logo con efecto zoom 3D */}
        <motion.div
          className="relative w-[82vw] max-w-lg overflow-hidden rounded-md"
          initial={{ scale: 0.5, rotateY: 45, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <motion.img
            src={logo}
            alt=""
            className="block w-full h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            animate={reducir ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          />
        </motion.div>

        {/* lema estilo neón */}
        <motion.p
          className="relative mt-8 text-base sm:text-lg tracking-[8px] uppercase text-red-400 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          style={{
            textShadow: "0 0 12px rgba(255,0,0,0.9), 0 0 24px rgba(255,200,150,0.7)",
          }}
        >
          Carnes frescas · Concón
        </motion.p>

        {/* barra de carga futurista */}
        <div className="relative mt-6 h-[4px] w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-white"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: (ENTRADA_MS - 500) / 1000, delay: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}


 /*esplash cortina
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo-inicio.png";

const ENTRADA_MS = 3800;
const SALIDA_MS = 1100;

const PARTICULAS = Array.from({ length: 18 }, (_, i) => ({
  left: Math.random() * 100,
  size: 1.5 + Math.random() * 3,
  delay: Math.random() * 3,
  duration: 3 + Math.random() * 3,
  color: [
    "rgba(255, 255, 255, 0.7)",
    "rgba(220, 38, 38, 0.7)",
    "rgba(250, 204, 21, 0.6)",
  ][i % 3],
}));

export default function Splash() {
  const reducir = useReducedMotion();
  const [fase, setFase] = useState("entrada");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const entrada = setTimeout(
      () => setFase("salida"),
      reducir ? 1200 : ENTRADA_MS
    );

    const salida = setTimeout(
      () => {
        setFase("fuera");
        document.body.style.overflow = "";
      },
      (reducir ? 1200 : ENTRADA_MS) + SALIDA_MS
    );

    return () => {
      clearTimeout(entrada);
      clearTimeout(salida);
      document.body.style.overflow = "";
    };
  }, [reducir]);

  if (fase === "fuera") return null;

  const saliendo = fase === "salida";

  const transicionCortina = {
    duration: SALIDA_MS / 1500,
    ease: [0.76, 0, 0.24, 1],
  };

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
      aria-hidden="true"
    >
      {/* =====================================================
          FONDO
      ====================================================== *//*}

      <div className="absolute inset-0 bg-[#050505]" />

      {/* Degradado rojo *//*}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at center, rgba(127,29,29,0.28) 0%, rgba(0,0,0,0.85) 55%, #000 100%)",
        }}
      />

      {/* Luz superior *//*}
      <motion.div
        className="absolute left-1/2 top-0 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full blur-[100px]"
        animate={
          reducir
            ? undefined
            : {
                opacity: [0.15, 0.3, 0.15],
                scale: [0.9, 1.1, 0.9],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(220,38,38,0.45), transparent 70%)",
        }}
      />

      {/* =====================================================
          PARTÍCULAS
      ====================================================== *//*}

      {!reducir &&
        PARTICULAS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 10px ${p.color}`,
            }}
            animate={{
              y: ["0vh", "-110vh"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

      {/* =====================================================
          CONTENIDO
      ====================================================== *//*}

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={
          saliendo
            ? {
                opacity: 0,
                scale: 1.08,
                y: -20,
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
              }
        }
        transition={{
          duration: saliendo ? 0.7 : 0.5,
          ease: "easeInOut",
        }}
      >
        {/* =================================================
            HALO DETRÁS DEL LOGO
        ================================================== *//*}

        <motion.div
          className="absolute h-[360px] w-[360px] rounded-full sm:h-[520px] sm:w-[520px]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={
            reducir
              ? { opacity: 0.35, scale: 1 }
              : {
                  opacity: [0.25, 0.5, 0.25],
                  scale: [0.95, 1.05, 0.95],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(220,38,38,0.35) 0%, rgba(220,38,38,0.08) 40%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        {/* =================================================
            LOGO
        ================================================== *//*}

        <motion.div
          className="relative z-10 w-[82vw] max-w-[520px]"
          initial={{
            opacity: 0,
            scale: 0.65,
            y: 35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.25,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Resplandor del logo *//*}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            animate={
              reducir
                ? undefined
                : {
                    opacity: [0.25, 0.55, 0.25],
                    scale: [0.95, 1.05, 0.95],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(220,38,38,0.65), rgba(250,204,21,0.15), transparent 70%)",
            }}
          />

          <motion.img
            src={logo}
            alt="Logo"
            className="relative z-10 block w-full h-auto"
            animate={
              reducir
                ? undefined
                : {
                    scale: [1, 1.025, 1],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            style={{
              filter:
                "drop-shadow(0 0 18px rgba(255,255,255,0.25)) drop-shadow(0 0 35px rgba(220,38,38,0.35))",
            }}
          />

          {/* Línea de luz que recorre el logo *//*}
          {!reducir && (
            <motion.div
              className="absolute inset-y-0 -left-[100%] z-20 w-[35%] skew-x-[-20deg]"
              animate={{
                left: ["-100%", "160%"],
              }}
              transition={{
                duration: 1.5,
                delay: 1.8,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                filter: "blur(8px)",
              }}
            />
          )}
        </motion.div>

        {/* =================================================
            TEXTO
        ================================================== *//*}

        <motion.div
          className="relative z-10 mt-8 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.35,
            ease: "easeOut",
          }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.35em] text-white sm:text-lg"
            style={{
              textShadow: "0 0 18px rgba(255,255,255,0.25)",
            }}
          >
            Carnes frescas
          </p>

          <div className="mx-auto mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-500/70 sm:w-12" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-red-400">
              Concón
            </span>

            <span className="h-px w-8 bg-red-500/70 sm:w-12" />
          </div>
        </motion.div>

        {/* =================================================
            CARGA
        ================================================== *//*}

        <motion.div
          className="relative z-10 mt-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.6,
          }}
        >
          <div className="h-[3px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-60">
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-red-600 via-red-400 to-yellow-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: (ENTRADA_MS - 700) / 1000,
                delay: 0.2,
                ease: "easeInOut",
              }}
            />
          </div>

          <p className="mt-3 text-center text-[9px] uppercase tracking-[0.3em] text-white/35">
            Calidad · Frescura · Confianza
          </p>
        </motion.div>
      </motion.div>

      {/* =====================================================
          CORTINAS DE SALIDA
      ====================================================== *//*}

      <motion.div
        className="absolute inset-y-0 left-0 z-50 w-1/2 bg-gradient-to-r from-black via-[#120505] to-[#240707]"
        animate={{
          x: saliendo ? "-105%" : "0%",
        }}
        transition={transicionCortina}
      />

      <motion.div
        className="absolute inset-y-0 right-0 z-50 w-1/2 bg-gradient-to-l from-black via-[#120505] to-[#240707]"
        animate={{
          x: saliendo ? "105%" : "0%",
        }}
        transition={transicionCortina}
      />

      {/* Línea central durante la salida *//*}
      <motion.div
        className="absolute left-1/2 top-0 z-[60] h-full w-px -translate-x-1/2 bg-red-500/40"
        initial={{ opacity: 0 }}
        animate={{
          opacity: saliendo ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: SALIDA_MS / 1000,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
*/


/*/splash 2
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo-inicio.png";

const DURACION_SPLASH = 2000;

export default function Splash() {
  const reducir = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, DURACION_SPLASH);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  // Si el usuario prefiere reducir movimiento,
  // mostramos una transición mucho más sencilla.
  if (reducir) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.5 }}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-[78vw] max-w-[480px]"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.35,
        delay: 1.65,
        ease: "easeOut",
      }}
    >
      {/* =====================================================
          FONDO
      ====================================================== *//*}

      <div className="absolute inset-0 bg-[#050505]" />

      {/* Halo rojo central *//*}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: [0, 0.45, 0.3],
          scale: [0.5, 1, 1.08],
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(220,38,38,0.45) 0%, rgba(127,29,29,0.15) 45%, transparent 72%)",
        }}
      />

      {/* Halo dorado muy sutil *//*}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0.1] }}
        transition={{
          duration: 1.4,
          delay: 0.2,
          ease: "easeOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(250,204,21,0.35), transparent 70%)",
        }}
      />

      {/* =====================================================
          DESTELLO INICIAL
      ====================================================== *//*}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[2px] w-[70vw] -translate-x-1/2 -translate-y-1/2"
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 0.8,
          delay: 0.05,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(239,68,68,0.8), rgba(250,204,21,0.8), transparent)",
          boxShadow: "0 0 20px rgba(239,68,68,0.5)",
        }}
      />

      {/* =====================================================
          CONTENIDO
      ====================================================== *//*}

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        initial={{
          opacity: 0,
          scale: 0.72,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* =================================================
            LOGO
        ================================================== *//*}

        <motion.div
          className="relative w-[78vw] max-w-[500px]"
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: "easeInOut",
          }}
        >
          {/* Resplandor detrás del logo *//*}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: [0, 0.55, 0.3],
              scale: [0.7, 1.05, 1],
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: "easeOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(220,38,38,0.6), rgba(250,204,21,0.12), transparent 70%)",
            }}
          />

          <motion.img
            src={logo}
            alt="Logo"
            className="relative z-10 block h-auto w-full"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              filter:
                "drop-shadow(0 0 15px rgba(255,255,255,0.2)) drop-shadow(0 0 35px rgba(220,38,38,0.35))",
            }}
          />

          {/* =================================================
              BRILLO QUE PASA POR EL LOGO
          ================================================== *//*}

          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-[60%] z-20 w-[30%] skew-x-[-20deg]"
            initial={{
              left: "-60%",
              opacity: 0,
            }}
            animate={{
              left: ["-60%", "150%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.7,
              delay: 0.85,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
              filter: "blur(7px)",
            }}
          />
        </motion.div>

        {/* =================================================
            TEXTO
        ================================================== *//*}

        <motion.div
          className="mt-6 text-center"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.85,
            ease: "easeOut",
          }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.32em] text-white sm:text-lg"
            style={{
              textShadow: "0 0 15px rgba(255,255,255,0.25)",
            }}
          >
            Carnes frescas
          </p>

          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-500/70" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-400 sm:text-xs">
              Concón
            </span>

            <span className="h-px w-8 bg-red-500/70" />
          </div>
        </motion.div>
      </motion.div>

      {/* =====================================================
          ZOOM FINAL HACIA EL USUARIO
      ====================================================== *//*}

      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-black"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0, 0.85],
        }}
        transition={{
          duration: 0.35,
          delay: 1.55,
          ease: "easeIn",
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{
          scale: 1,
          opacity: 0,
        }}
        animate={{
          scale: 2.8,
          opacity: [0, 0.25, 0],
        }}
        transition={{
          duration: 0.45,
          delay: 1.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18), rgba(220,38,38,0.08) 35%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />
    </motion.div>
  );
}


/* splash 3

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo-inicio.png";

const DURACION_SPLASH = 2000;

export default function Splash() {
  const reducir = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, DURACION_SPLASH);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  // =========================================================
  // MODO REDUCIDO
  // =========================================================

  if (reducir) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080202]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.5,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="
            w-[90vw]
            max-w-[520px]
          "
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#080202]"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.28,
        delay: 1.72,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* =====================================================
          FONDO BASE
      ====================================================== *//*}

      <div className="absolute inset-0 bg-[#080202]" />

      {/* Degradado rojo central *//*}

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
        }}
        style={{
          background: `
            radial-gradient(
              circle at 50% 48%,
              rgba(150, 10, 10, 0.30) 0%,
              rgba(80, 5, 5, 0.16) 28%,
              transparent 62%
            )
          `,
        }}
      />

      {/* =====================================================
          LUZ ROJA EN MOVIMIENTO
      ====================================================== *//*}

      <motion.div
        className="absolute -left-[35%] top-1/2 h-[80vh] w-[70vw]"
        initial={{
          x: "-20%",
          opacity: 0,
          rotate: -18,
        }}
        animate={{
          x: "170%",
          opacity: [0, 0.16, 0.12, 0],
          rotate: -18,
        }}
        transition={{
          duration: 1.9,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(220,25,25,0.8), transparent)",
          filter: "blur(45px)",
        }}
      />

      {/* =====================================================
          LÍNEA DE LUZ CINEMATOGRÁFICA
      ====================================================== *//*}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[1px] w-[130vw] -translate-x-1/2 -translate-y-1/2"
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.15,
          delay: 0.15,
          ease: [0.65, 0, 0.35, 1],
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), rgba(220,30,30,0.9), transparent)",
          boxShadow:
            "0 0 12px rgba(255,255,255,0.45), 0 0 30px rgba(220,30,30,0.45)",
        }}
      />

      {/* =====================================================
          PARTÍCULAS / BRASAS
      ====================================================== *//*}

      <motion.div
        className="absolute left-[18%] top-[30%] h-1 w-1 rounded-full bg-red-400"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: [0, 0.8, 0],
          y: -70,
        }}
        transition={{
          duration: 1.3,
          delay: 0.4,
        }}
      />

      <motion.div
        className="absolute left-[78%] top-[62%] h-1 w-1 rounded-full bg-red-300"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: [0, 0.7, 0],
          y: -80,
        }}
        transition={{
          duration: 1.4,
          delay: 0.55,
        }}
      />

      <motion.div
        className="absolute left-[28%] top-[68%] h-[3px] w-[3px] rounded-full bg-white"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.8,
          delay: 0.8,
        }}
      />

      <motion.div
        className="absolute left-[70%] top-[28%] h-[3px] w-[3px] rounded-full bg-red-300"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.9,
          delay: 0.65,
        }}
      />

      {/* =====================================================
          CONTENIDO CENTRAL
      ====================================================== *//*}

      <motion.div
        className="
          relative
          z-20
          flex
          w-full
          flex-col
          items-center
          justify-center
          px-5
        "
        initial={{
          opacity: 0,
          scale: 0.72,
          y: 18,
        }}
        animate={{
          opacity: 1,
          scale: [0.72, 1.04, 1],
          y: 0,
        }}
        transition={{
          duration: 0.95,
          delay: 0.18,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* =================================================
            LOGO
        ================================================== *//*}

        <motion.div
          className="
            relative
            w-[90vw]
            max-w-[520px]
            sm:w-[78vw]
            sm:max-w-[500px]
            md:w-[65vw]
            lg:w-[520px]
          "
        >
          {/* Luz detrás del logo *//*}

          <motion.div
            className="absolute inset-[-10%] -z-10"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: [0, 0.45, 0.18],
              scale: [0.7, 1.08, 1],
            }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: "easeOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(210,20,20,0.4), transparent 68%)",
              filter: "blur(25px)",
            }}
          />

          {/* =================================================
              LOGO PRINCIPAL
          ================================================== *//*}

          <motion.img
            src={logo}
            alt="Logo"
            className="relative z-10 block h-auto w-full"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.45,
              delay: 0.35,
            }}
            style={{
              filter:
                "drop-shadow(0 8px 18px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(220,30,30,0.28))",
            }}
          />

          {/* =================================================
              BARRIDO DE LUZ SOBRE EL LOGO
          ================================================== *//*}

          <motion.div
            className="
              pointer-events-none
              absolute
              inset-y-0
              z-30
              w-[24%]
              skew-x-[-18deg]
            "
            initial={{
              left: "-35%",
              opacity: 0,
            }}
            animate={{
              left: ["-35%", "125%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.75,
              delay: 0.72,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
              filter: "blur(4px)",
            }}
          />
        </motion.div>

        {/* =================================================
            TEXTO
        ================================================== *//*}

        <motion.div
          className="mt-5 text-center sm:mt-6"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.95,
            ease: "easeOut",
          }}
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.28em]
              text-white
              sm:text-base
              md:text-lg
            "
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            Carnes frescas
          </p>

          <div className="mt-2 flex items-center justify-center gap-2 sm:gap-3">
            <motion.span
              className="h-px w-7 bg-red-500 sm:w-10"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 1.0,
              }}
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-red-400
                sm:text-xs
              "
            >
              Concón
            </span>

            <motion.span
              className="h-px w-7 bg-red-500 sm:w-10"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 1.0,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* =====================================================
          FLASH FINAL
      ====================================================== *//*}

      <motion.div
        className="pointer-events-none absolute inset-0 z-40 bg-white"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0, 0.18, 0],
        }}
        transition={{
          duration: 0.22,
          delay: 1.58,
          ease: "easeOut",
        }}
      />

      {/* =====================================================
          SALIDA FINAL A NEGRO
      ====================================================== *//*}

      <motion.div
        className="pointer-events-none absolute inset-0 z-50 bg-black"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0, 0.9],
        }}
        transition={{
          duration: 0.25,
          delay: 1.72,
          ease: "easeIn",
        }}
      />
    </motion.div>
  );
}*/
