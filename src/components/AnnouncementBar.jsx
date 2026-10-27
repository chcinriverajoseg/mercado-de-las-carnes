import { useEffect, useState } from "react";
import { NEGOCIO } from "../data/negocio";
import { estadoLocal } from "../utils/horario";
import { formatCLP } from "../utils/format";

// Franja superior: despacho gratis + si el local está abierto ahora (hora de Chile).
export default function AnnouncementBar() {
  const [estado, setEstado] = useState(() => estadoLocal());

  useEffect(() => {
    const t = setInterval(() => setEstado(estadoLocal()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-brand-red-dark text-brand-cream text-[11px] sm:text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
        <p className="truncate">
          {NEGOCIO.despachoGratisDesde > 0 ? (
            <>
              <strong className="font-bold">Despacho gratis</strong> sobre {formatCLP(NEGOCIO.despachoGratisDesde)}
              <span className="hidden sm:inline">
                {" "}· {NEGOCIO.despachoTodosLosDias ? "todos los días" : ""} en {NEGOCIO.zonaDespacho}
              </span>
            </>
          ) : (
            <>Despacho en {NEGOCIO.zonaDespacho}</>
          )}
        </p>
        <a href="#ubicacion" className="shrink-0 flex items-center gap-1.5 hover:underline underline-offset-2">
          <span className={"w-1.5 h-1.5 rounded-full " + (estado.abierto ? "bg-emerald-400" : "bg-brand-cream/50")} />
          <span className="sm:hidden">{estado.abierto ? "Abierto ahora" : "Cerrado"}</span>
          <span className="hidden sm:inline">{estado.texto}</span>
        </a>
      </div>
    </div>
  );
}
