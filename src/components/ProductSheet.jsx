import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/useShop";
import { CategoryIcon } from "./icons";
import { fotoProducto } from "../utils/fotos";
import { USOS, CONSEJOS } from "../data/productos";
import { waLink } from "../data/negocio";
import { esPorKilo, formatCantidad, formatCLP, parsePrecio, ofertaInfo, stockInfo, PASO_KILO } from "../utils/format";

// Ficha de producto: se abre al tocar la foto o el nombre de un producto.
export default function ProductSheet() {
  const { ficha, closeFicha } = useShop();

  useEffect(() => {
    if (!ficha) return;
    const onKey = (e) => e.key === "Escape" && closeFicha();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ficha, closeFicha]);

  return (
    <AnimatePresence>
      {ficha && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-[85]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFicha}
          />
          <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={ficha.nombre}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="pointer-events-auto w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto bg-brand-panel border border-brand-line rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/60"
            >
              <Contenido key={ficha.id} producto={ficha} cerrar={closeFicha} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Contenido({ producto, cerrar }) {
  const { addItem } = useShop();
  const porKilo = esPorKilo(producto.unidad);
  const paso = porKilo ? PASO_KILO : 1;
  const [cantidad, setCantidad] = useState(1);

  const foto = fotoProducto(producto.nombre);
  const precioNum = parsePrecio(producto.precio);
  const oferta = ofertaInfo(producto);
  const info = stockInfo(producto.stock);
  const agotado = producto.stock === 0;

  const cambiar = (dir) => setCantidad((c) => Math.max(paso, Math.round((c + dir * paso) * 10) / 10));

  return (
    <div className="grid sm:grid-cols-2">
      <div className="relative bg-brand-panel-2 aspect-[4/3] sm:aspect-auto sm:min-h-full flex items-center justify-center">
        {foto ? (
          <img src={foto} alt={producto.nombre} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-brand-red/70">
            <CategoryIcon id={producto.categoriaId} className="w-20 h-20" />
            <span className="text-xs text-brand-gray">Foto próximamente</span>
          </div>
        )}
        <button
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute top-3 right-3 sm:hidden w-9 h-9 rounded-full bg-black/60 text-brand-cream text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="p-5 sm:p-7 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] text-brand-red font-semibold">{producto.categoria}</p>
            <h2 className="font-display text-2xl sm:text-3xl mt-1 leading-tight">{producto.nombre}</h2>
          </div>
          <button
            onClick={cerrar}
            aria-label="Cerrar"
            className="hidden sm:block text-brand-gray hover:text-brand-red text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {oferta.enOferta && (
            <span className="bg-amber-400 text-black text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full">
              {oferta.ahorroPct ? `Ahorras ${oferta.ahorroPct}%` : "Oferta"}
            </span>
          )}
          {producto.destacado && (
            <span className="bg-brand-red text-brand-cream text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
              Más pedido
            </span>
          )}
          <span className={"text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border " + info.className}>
            {info.label}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-4">
          <span className="font-display text-brand-red text-3xl">{producto.precio}</span>
          {oferta.antes > 0 && <span className="text-sm text-brand-gray line-through">{formatCLP(oferta.antes)}</span>}
          <span className="text-sm text-brand-gray">{producto.unidad}</span>
        </div>

        <p className="text-brand-cream-dim text-sm mt-3">{producto.desc}</p>

        {producto.usos?.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold text-brand-cream-dim mb-2">Ideal para</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {producto.usos.map((u) => (
                <span key={u} className="text-xs border border-brand-line bg-brand-panel-2 px-2.5 py-1 rounded-full">
                  {USOS[u]}
                </span>
              ))}
            </div>
            <p className="text-xs text-brand-gray leading-relaxed">
              <strong className="text-brand-cream-dim">Consejo: </strong>
              {CONSEJOS[producto.usos[0]]}
            </p>
          </div>
        )}

        <div className="mt-auto pt-6">
          {!agotado && (
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => cambiar(-1)}
                  aria-label="Menos"
                  className="w-9 h-9 rounded-full border border-brand-line hover:border-brand-red hover:text-brand-red"
                >
                  −
                </button>
                <span className="min-w-[4.5rem] text-center font-semibold">{formatCantidad(cantidad, producto.unidad)}</span>
                <button
                  onClick={() => cambiar(1)}
                  aria-label="Más"
                  className="w-9 h-9 rounded-full border border-brand-line hover:border-brand-red hover:text-brand-red"
                >
                  +
                </button>
              </div>
              {precioNum > 0 && <span className="font-display text-xl">{formatCLP(precioNum * cantidad)}</span>}
            </div>
          )}

          <button
            disabled={agotado}
            onClick={() => {
              addItem(producto, cantidad);
              cerrar();
            }}
            className="w-full bg-brand-red hover:bg-red-600 disabled:bg-brand-panel-2 disabled:text-brand-gray disabled:cursor-not-allowed text-brand-cream font-bold text-sm uppercase tracking-wide py-3.5 rounded-sm transition"
          >
            {agotado ? "Agotado" : "Agregar al carrito"}
          </button>
          <a
            href={waLink(`Hola, quería consultar por ${producto.nombre}`)}
            target="_blank"
            rel="noopener"
            className="block text-center text-xs text-brand-cream-dim hover:text-brand-red mt-3 underline underline-offset-4"
          >
            {agotado ? "Avísame cuando vuelva a llegar" : "¿Lo quieres en un corte o grosor especial? Pregúntanos"}
          </a>
        </div>
      </div>
    </div>
  );
}
