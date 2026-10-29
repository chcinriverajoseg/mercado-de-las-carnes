import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryIcon } from "./icons";
import Mascota from "./Mascota";
import ProductCard from "./ProductCard";
import { USOS } from "../data/productos";
import { parsePrecio } from "../utils/format";
import { fotoProducto } from "../utils/fotos";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// Cuántos productos se muestran antes del botón "Ver todos".
const VISIBLES = 9;

const ORDENES = {
  relevancia: "Más pedidos",
  precioAsc: "Precio: menor a mayor",
  precioDesc: "Precio: mayor a menor",
  nombre: "Nombre A–Z",
};

// Los agotados siempre van al final, sea cual sea el orden elegido.
function ordenar(lista, criterio) {
  const peso = (p) => (p.stock === 0 ? 1 : 0);
  const precio = (p) => parsePrecio(p.precio) || Infinity;
  const comparar = {
    relevancia: (a, b) => (b.destacado ? 1 : 0) + (b.oferta ? 1 : 0) - ((a.destacado ? 1 : 0) + (a.oferta ? 1 : 0)),
    precioAsc: (a, b) => precio(a) - precio(b),
    precioDesc: (a, b) => (parsePrecio(b.precio) || 0) - (parsePrecio(a.precio) || 0),
    nombre: (a, b) => a.nombre.localeCompare(b.nombre, "es"),
  }[criterio];
  return [...lista].sort((a, b) => peso(a) - peso(b) || comparar(a, b));
}

export default function CategorySection({ id, nombre, descripcion, productos, alterna, bgImage }) {
  const [verTodos, setVerTodos] = useState(false);
  const [uso, setUso] = useState(""); // "" = todos
  const [criterio, setCriterio] = useState("relevancia");

  // Solo se muestran los filtros de uso que tienen productos en esta categoría.
  const usosDisponibles = Object.keys(USOS).filter((u) => productos.some((p) => p.usos?.includes(u)));
  const filtrados = uso ? productos.filter((p) => p.usos?.includes(uso)) : productos;
  const ordenados = ordenar(filtrados, criterio);
  const lista = verTodos ? ordenados : ordenados.slice(0, VISIBLES);
  const ocultos = ordenados.length - VISIBLES;
  const conMarco = lista.some((p) => fotoProducto(p.nombre));

  const chip = (activo) =>
    "whitespace-nowrap text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors " +
    (activo
      ? "border-brand-red bg-brand-red text-brand-cream"
      : "border-brand-line bg-brand-bg/60 text-brand-cream-dim hover:border-brand-red hover:text-brand-red-text");

  return (
    <section
      id={id}
      className={"relative px-4 sm:px-6 py-14 sm:py-20 scroll-mt-32 overflow-hidden " + (alterna ? "bg-brand-panel" : "")}
    >
      {/* foto de fondo opcional, por categoría */}
      {bgImage && (
        <>
          <img src={bgImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div
            className={
              "absolute inset-0 bg-gradient-to-b " +
              (alterna
                ? "from-brand-panel/60 via-brand-panel/80 to-brand-panel"
                : "from-brand-bg/60 via-brand-bg/80 to-brand-bg")
            }
          />
        </>
      )}

      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Mascota side={alterna ? "left" : "right"} />
        <motion.div
          className="text-center max-w-lg mx-auto mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red-text">
            <CategoryIcon id={id} className="w-6 h-6" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl mb-3">{nombre}</h2>
          <p className="text-brand-cream-dim">{descripcion}</p>
          <p className="text-xs text-brand-gray mt-2">{productos.length} productos</p>
        </motion.div>

        {/* barra de filtros y orden */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {usosDisponibles.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filtrar por preparación">
              <button className={chip(!uso)} onClick={() => setUso("")} aria-pressed={!uso}>
                Todos
              </button>
              {usosDisponibles.map((u) => (
                <button key={u} className={chip(uso === u)} onClick={() => setUso(u)} aria-pressed={uso === u}>
                  {USOS[u]}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}
          <label className="flex items-center gap-2 text-xs text-brand-gray ml-auto">
            Ordenar
            <select
              value={criterio}
              onChange={(e) => setCriterio(e.target.value)}
              className="bg-brand-bg border border-brand-line focus:border-brand-red outline-none rounded-sm px-2.5 py-1.5 text-xs text-brand-cream"
            >
              {Object.entries(ORDENES).map(([v, t]) => (
                <option key={v} value={v}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {lista.map((producto, i) => (
            <ProductCard key={producto.id} producto={producto} categoriaId={id} alterna={alterna} index={i} conMarco={conMarco} />
          ))}
        </div>

        {ocultos > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => {
                if (verTodos) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                setVerTodos((v) => !v);
              }}
              className="border border-brand-cream-dim hover:border-brand-red hover:text-brand-red-text text-sm font-semibold px-8 py-3.5 rounded-sm transition"
            >
              {verTodos ? "Mostrar menos" : `Ver los ${ordenados.length} productos${uso ? " para " + USOS[uso].toLowerCase() : ""}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
