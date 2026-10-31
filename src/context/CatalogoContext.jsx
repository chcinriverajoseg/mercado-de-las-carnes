import { useEffect, useMemo, useState } from "react";
import { CatalogoContext } from "./catalogoContext.js";
import { categorias as BASE } from "../data/productos";
import { aplicarPlanilla, derivar, parseCSV } from "../data/catalogo";
import { PLANILLA_URL } from "../data/negocio";

const CLAVE = "mdc-planilla";

function leerGuardado() {
  try {
    const t = localStorage.getItem(CLAVE);
    return t ? parseCSV(t) : null;
  } catch {
    return null;
  }
}

// Carga los precios de la planilla de Google. Mientras llega, muestra la última
// versión guardada en el navegador (o el catálogo del código, la primera vez).
export function CatalogoProvider({ children }) {
  const [filas, setFilas] = useState(() => (PLANILLA_URL ? leerGuardado() : null));
  const [fuente, setFuente] = useState(() => (filas ? "guardado" : "codigo"));

  useEffect(() => {
    if (!PLANILLA_URL) return;
    const control = new AbortController();
    // "&t=" evita que el navegador use una copia vieja.
    const url = PLANILLA_URL + (PLANILLA_URL.includes("?") ? "&" : "?") + "t=" + Date.now();
    fetch(url, { signal: control.signal })
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then((texto) => {
        const nuevas = parseCSV(texto);
        if (nuevas.length < 2 || !nuevas[0].some((c) => c.trim().toLowerCase() === "id")) {
          throw new Error("La planilla no tiene la columna id");
        }
        setFilas(nuevas);
        setFuente("planilla");
        try {
          localStorage.setItem(CLAVE, texto);
        } catch {
          /* sin almacenamiento: igual funciona */
        }
      })
      .catch((e) => {
        if (e.name !== "AbortError") console.warn("[catálogo] No se pudo leer la planilla, uso la versión guardada:", e.message);
      });
    return () => control.abort();
  }, []);

  const valor = useMemo(() => ({ ...derivar(aplicarPlanilla(filas, BASE)), fuente }), [filas, fuente]);

  return <CatalogoContext.Provider value={valor}>{children}</CatalogoContext.Provider>;
}
