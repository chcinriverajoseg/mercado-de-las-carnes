import { useMemo } from "react";
import { useShop } from "../context/useShop";
import { normalizar } from "../utils/format";
import { waLink } from "../data/negocio";
import ProductCard from "./ProductCard";
import { fotoProducto } from "../utils/fotos";

export default function SearchResults() {
  const { busqueda, setBusqueda, todosLosProductos } = useShop();

  const resultados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    if (!q) return [];
    const palabras = q.split(/\s+/);
    return todosLosProductos.filter((p) => {
      const texto = normalizar(p.nombre + " " + p.categoria);
      return palabras.every((w) => texto.includes(w));
    });
  }, [busqueda, todosLosProductos]);

  const conMarco = resultados.some((p) => fotoProducto(p.nombre));

  return (
    <section id="resultados" className="relative px-4 sm:px-6 py-16 scroll-mt-32 min-h-[50vh]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs tracking-[4px] uppercase text-brand-red-text font-semibold">Búsqueda</span>
            <h2 className="font-display text-2xl sm:text-3xl mt-1">
              {resultados.length} {resultados.length === 1 ? "resultado" : "resultados"} para “{busqueda.trim()}”
            </h2>
          </div>
          <button
            onClick={() => setBusqueda("")}
            className="text-sm text-brand-cream-dim hover:text-brand-red-text underline underline-offset-4"
          >
            Ver catálogo completo
          </button>
        </div>

        {resultados.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {resultados.map((p, i) => (
              <ProductCard key={p.id} producto={p} categoriaId={p.categoriaId} index={i} conMarco={conMarco} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-brand-panel border border-brand-line rounded-xl p-10">
            <p className="text-brand-cream-dim mb-5">
              No encontramos ese producto en el catálogo, pero puede que lo tengamos en el local.
            </p>
            <a
              href={waLink(`Hola, ¿tienen ${busqueda.trim()}?`)}
              target="_blank"
              rel="noopener"
              className="inline-block bg-brand-red hover:bg-[#d81f1a] text-brand-cream font-bold text-sm px-6 py-3 rounded-sm transition"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
