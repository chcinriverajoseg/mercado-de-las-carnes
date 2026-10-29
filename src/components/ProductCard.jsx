import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryIcon } from "./icons";
import { useShop } from "../context/useShop";
import { fotoProducto } from "../utils/fotos";
import { stockInfo, esPorKilo, formatCantidad, formatCLP, parsePrecio, ofertaInfo } from "../utils/format";
import { USOS } from "../data/productos";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// Pesos rápidos para productos por kilo (como en las carnicerías online grandes).
const PESOS = [0.5, 1, 2];

// conMarco: si otras tarjetas de la misma lista tienen foto, esta muestra un recuadro
// del mismo tamaño (con el ícono) para que todas queden parejas.
export default function ProductCard({ producto, categoriaId, alterna = false, index = 0, conMarco = false }) {
  const { addItem, openFicha } = useShop();
  const porKilo = esPorKilo(producto.unidad);
  const [cantidad, setCantidad] = useState(1);

  const info = stockInfo(producto.stock);
  const agotado = producto.stock === 0;
  const foto = fotoProducto(producto.nombre);
  const precioNum = parsePrecio(producto.precio);
  const oferta = ofertaInfo(producto);
  const abrirFicha = () => openFicha({ ...producto, categoriaId });

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className={
        "relative flex flex-col rounded-xl p-3 sm:p-6 border border-brand-line shadow-lg shadow-black/30 " +
        "hover:border-brand-red hover:shadow-brand-red/20 hover:-translate-y-1 transition-all duration-300 " +
        (alterna ? "bg-gradient-to-b from-brand-panel-2 to-brand-panel" : "bg-gradient-to-b from-brand-panel to-black/40")
      }
    >
      {(foto || conMarco) && (
        <button
          type="button"
          onClick={abrirFicha}
          aria-label={"Ver detalle de " + producto.nombre}
          className="block -mx-3 -mt-3 sm:-mx-6 sm:-mt-6 mb-3 sm:mb-4 aspect-square sm:aspect-[4/3] overflow-hidden rounded-t-xl bg-brand-panel-2"
        >
          {foto ? (
            <img
              src={foto}
              alt={producto.nombre}
              loading="lazy"
              className={
                "h-full w-full object-cover transition-transform duration-500 hover:scale-105 " +
                (agotado ? "grayscale opacity-60" : "")
              }
            />
          ) : (
            <span className="h-full w-full flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-brand-panel-2 to-brand-bg text-brand-red/50">
              <CategoryIcon id={categoriaId} className="w-12 h-12 sm:w-16 sm:h-16" />
              <span className="text-[10px] uppercase tracking-[2px] text-brand-gray">Foto pronto</span>
            </span>
          )}
        </button>
      )}

      {oferta.enOferta && (
        <span className="absolute -top-2.5 left-2 sm:left-4 z-10 bg-amber-400 text-black text-[9px] sm:text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-md shadow-black/40">
          {oferta.ahorroPct ? `Ahorras ${oferta.ahorroPct}%` : "Oferta"}
        </span>
      )}

      {producto.destacado && (
        <span className="absolute -top-2.5 right-2 sm:right-4 z-10 bg-brand-red text-brand-cream text-[9px] sm:text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-md shadow-brand-red/40">
          Más pedido
        </span>
      )}

      <div className="flex items-start gap-3 mb-1 sm:mb-2">
        {!foto && !conMarco && (
          <div className="hidden sm:flex w-9 h-9 shrink-0 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red-text">
            <CategoryIcon id={categoriaId} className="w-5 h-5" />
          </div>
        )}
        <h3 className="font-semibold text-sm sm:text-base leading-snug sm:pt-1">
          <button type="button" onClick={abrirFicha} className="text-left hover:text-brand-red-text transition-colors">
            {producto.nombre}
          </button>
        </h3>
      </div>

      <p className="hidden sm:block text-brand-gray text-sm mb-3">{producto.desc}</p>

      {producto.usos?.length > 0 && (
        <p className="hidden sm:block text-[11px] text-brand-cream-dim mb-3">
          Ideal para: {producto.usos.map((u) => USOS[u]).join(" · ")}
        </p>
      )}

      <span
        className={
          "self-start text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border mb-2 sm:mb-3 " +
          info.className
        }
      >
        {info.label}
      </span>

      <div className="mt-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 border-t border-dashed border-brand-line pt-2 sm:pt-3 mb-2 sm:mb-3">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-brand-red-text text-base sm:text-lg">{producto.precio}</span>
            {oferta.antes > 0 && (
              <span className="text-[11px] sm:text-xs text-brand-gray line-through">{formatCLP(oferta.antes)}</span>
            )}
          </span>
          <span className="text-[11px] sm:text-xs text-brand-gray">{producto.unidad}</span>
        </div>

        {porKilo && !agotado && (
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mb-2 sm:mb-2.5" role="group" aria-label={"Cantidad de " + producto.nombre}>
            {PESOS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCantidad(p)}
                aria-pressed={cantidad === p}
                className={
                  "text-[11px] sm:text-xs font-semibold py-1.5 rounded-sm border transition-colors " +
                  (cantidad === p
                    ? "border-brand-red bg-brand-red/15 text-brand-cream"
                    : "border-brand-line text-brand-cream-dim hover:border-brand-red/60")
                }
              >
                {formatCantidad(p, producto.unidad)}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => addItem(producto, porKilo ? cantidad : 1)}
          disabled={agotado}
          className={
            "w-full text-[11px] sm:text-xs font-bold uppercase tracking-wide px-2 sm:px-4 py-2.5 rounded-sm transition-all " +
            (agotado
              ? "bg-brand-panel-2 text-brand-gray cursor-not-allowed"
              : "bg-brand-red hover:bg-[#d81f1a] text-brand-cream shadow-md shadow-brand-red/30 hover:shadow-brand-red/50")
          }
        >
          {agotado ? (
            "Agotado"
          ) : (
            <>
              Agregar
              {porKilo && precioNum ? (
                <span className="hidden sm:inline"> · {formatCLP(precioNum * cantidad)}</span>
              ) : (
                <span className="hidden sm:inline"> al carrito</span>
              )}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
