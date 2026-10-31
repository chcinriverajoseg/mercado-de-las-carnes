import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Mascota from "./Mascota";
import { useShop } from "../context/useShop";
import { useCatalogo } from "../context/useCatalogo";
import { formatCLP, formatCantidad, parsePrecio, esPorKilo } from "../utils/format";

// Gramos de carne cruda por adulto según apetito. Un niño cuenta como medio adulto.
const APETITOS = {
  normal: { nombre: "Normal", gramos: 350 },
  bueno: { nombre: "Buen diente", gramos: 450 },
  parrillero: { nombre: "Parrillero", gramos: 550 },
};

// Cómo se reparte la carne en cada estilo de asado (suma 1).
const ESTILOS = {
  clasico: { nombre: "Clásico", detalle: "Vacuno, cerdo y longaniza", reparto: { vacuno: 0.55, cerdo: 0.25, embutido: 0.2 } },
  vacuno: { nombre: "Solo vacuno", detalle: "Para los más carnívoros", reparto: { vacuno: 0.85, embutido: 0.15 } },
  mixto: { nombre: "Familiar", detalle: "Vacuno, cerdo, pollo y longaniza", reparto: { vacuno: 0.45, cerdo: 0.2, pollo: 0.2, embutido: 0.15 } },
};

const GRUPOS = {
  vacuno: { nombre: "Vacuno", categoria: "vacuno", porDefecto: "v3" },
  cerdo: { nombre: "Cerdo", categoria: "cerdo", porDefecto: "c5" },
  pollo: { nombre: "Pollo", categoria: "pollo", porDefecto: "p9" },
  embutido: { nombre: "Embutido", ids: ["c8", "c14", "v7"], porDefecto: "c8" },
};

const ID_CARBON = "a3"; // bolsa de 4 kg
const ID_EMPANADA = "e1";

// Opciones de cada grupo: productos para parrilla, por kilo y con stock.
function opcionesDe(grupo, { categorias, buscar }) {
  const g = GRUPOS[grupo];
  const lista = g.ids
    ? g.ids.map(buscar).filter(Boolean)
    : categorias.find((c) => c.id === g.categoria).productos.filter((p) => p.usos?.includes("parrilla"));
  return lista.filter((p) => p.stock > 0 && esPorKilo(p.unidad) && parsePrecio(p.precio) > 0);
}

const redondearMedio = (kg) => Math.max(0.5, Math.round(kg * 2) / 2);

function Contador({ etiqueta, valor, setValor, min = 0 }) {
  return (
    <div className="flex items-center justify-between bg-brand-bg/60 border border-brand-line rounded-lg px-4 py-3">
      <span className="text-sm font-semibold">{etiqueta}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setValor(Math.max(min, valor - 1))}
          aria-label={"Menos " + etiqueta}
          className="w-8 h-8 rounded-full border border-brand-line hover:border-brand-red hover:text-brand-red-text"
        >
          −
        </button>
        <span className="w-6 text-center font-display text-lg">{valor}</span>
        <button
          onClick={() => setValor(Math.min(80, valor + 1))}
          aria-label={"Más " + etiqueta}
          className="w-8 h-8 rounded-full border border-brand-line hover:border-brand-red hover:text-brand-red-text"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function CalculadoraAsado() {
  const { addItem } = useShop();
  const catalogo = useCatalogo();
  const [adultos, setAdultos] = useState(6);
  const [ninos, setNinos] = useState(0);
  const [apetito, setApetito] = useState("bueno");
  const [estilo, setEstilo] = useState("clasico");
  const [elegidos, setElegidos] = useState(() =>
    Object.fromEntries(Object.entries(GRUPOS).map(([k, g]) => [k, g.porDefecto]))
  );
  const [conCarbon, setConCarbon] = useState(true);
  const [conEmpanadas, setConEmpanadas] = useState(false);

  const plan = useMemo(() => {
    const personas = adultos + ninos * 0.5;
    const totalKg = (personas * APETITOS[apetito].gramos) / 1000;
    const filas = Object.entries(ESTILOS[estilo].reparto).map(([grupo, parte]) => {
      const opciones = opcionesDe(grupo, catalogo);
      const producto = opciones.find((p) => p.id === elegidos[grupo]) || opciones[0];
      const kg = redondearMedio(totalKg * parte);
      return { grupo, opciones, producto, cantidad: kg, subtotal: producto ? parsePrecio(producto.precio) * kg : 0 };
    });
    // Al redondear a medio kilo puede faltar carne: se suma al grupo principal hasta cubrir el total.
    let kgCarne = filas.reduce((s, f) => s + f.cantidad, 0);
    const principal = filas.find((f) => f.producto);
    while (principal && kgCarne < totalKg - 0.25) {
      principal.cantidad += 0.5;
      kgCarne += 0.5;
    }
    filas.forEach((f) => (f.subtotal = f.producto ? parsePrecio(f.producto.precio) * f.cantidad : 0));

    const extras = [];
    const carbon = catalogo.buscar(ID_CARBON);
    if (conCarbon && carbon?.stock > 0) {
      const bolsas = Math.max(1, Math.ceil(kgCarne / 4));
      extras.push({ producto: carbon, cantidad: bolsas, subtotal: parsePrecio(carbon.precio) * bolsas });
    }
    const empanada = catalogo.buscar(ID_EMPANADA);
    if (conEmpanadas && empanada?.stock > 0) {
      const n = adultos + ninos;
      extras.push({ producto: empanada, cantidad: n, subtotal: parsePrecio(empanada.precio) * n });
    }

    const total = [...filas, ...extras].reduce((s, f) => s + f.subtotal, 0);
    const comensales = adultos + ninos;
    return { filas: filas.filter((f) => f.producto), extras, kgCarne, total, porPersona: comensales ? total / comensales : 0 };
  }, [adultos, ninos, apetito, estilo, elegidos, conCarbon, conEmpanadas, catalogo]);

  const agregarTodo = () => {
    [...plan.filas, ...plan.extras].forEach((f) => addItem(f.producto, f.cantidad));
  };

  const opcionCls = (activo) =>
    "text-left rounded-lg border px-3.5 py-2.5 transition-colors " +
    (activo ? "border-brand-red bg-brand-red/10" : "border-brand-line hover:border-brand-red/60");

  return (
    <section id="calculadora" className="relative px-4 sm:px-6 py-16 sm:py-24 bg-brand-panel border-y border-brand-line scroll-mt-32 overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <Mascota side="left" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-xs tracking-[4px] uppercase text-brand-red-text font-semibold mb-3 inline-block">
            Calculadora de asado
          </span>
          <h2 className="font-display text-3xl sm:text-4xl mb-3">¿Cuánta carne compro?</h2>
          <p className="text-brand-cream-dim">
            Dinos cuántos son y te armamos el asado completo, listo para agregar al carrito.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10">
          {/* configuración */}
          <div className="space-y-6">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-brand-cream-dim uppercase tracking-wide">Invitados</p>
              <Contador etiqueta="Adultos" valor={adultos} setValor={setAdultos} min={1} />
              <Contador etiqueta="Niños" valor={ninos} setValor={setNinos} />
            </div>

            <div>
              <p className="text-xs font-semibold text-brand-cream-dim uppercase tracking-wide mb-2.5">Apetito</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(APETITOS).map(([k, a]) => (
                  <button key={k} onClick={() => setApetito(k)} aria-pressed={apetito === k} className={opcionCls(apetito === k)}>
                    <span className="block text-sm font-semibold">{a.nombre}</span>
                    <span className="block text-[11px] text-brand-gray">{a.gramos} g / adulto</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-brand-cream-dim uppercase tracking-wide mb-2.5">Estilo de asado</p>
              <div className="grid sm:grid-cols-3 gap-2">
                {Object.entries(ESTILOS).map(([k, e]) => (
                  <button key={k} onClick={() => setEstilo(k)} aria-pressed={estilo === k} className={opcionCls(estilo === k)}>
                    <span className="block text-sm font-semibold">{e.nombre}</span>
                    <span className="block text-[11px] text-brand-gray">{e.detalle}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={conCarbon} onChange={(e) => setConCarbon(e.target.checked)} className="accent-[#d81f1a] w-4 h-4" />
                Incluir carbón
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={conEmpanadas} onChange={(e) => setConEmpanadas(e.target.checked)} className="accent-[#d81f1a] w-4 h-4" />
                Empanadas de entrada
              </label>
            </div>
          </div>

          {/* resultado */}
          <div className="bg-brand-bg border border-brand-line rounded-xl p-5 sm:p-7 shadow-xl shadow-black/40">
            <div className="flex items-baseline justify-between gap-3 mb-5 pb-5 border-b border-brand-line">
              <div>
                <p className="text-xs uppercase tracking-wide text-brand-gray">Tu asado</p>
                <p className="font-display text-2xl">{formatCantidad(plan.kgCarne, "/ kilo")} de carne</p>
              </div>
              <p className="text-xs text-brand-gray text-right">
                {adultos + ninos} {adultos + ninos === 1 ? "persona" : "personas"}
              </p>
            </div>

            <ul className="space-y-3.5">
              {plan.filas.map((f) => (
                <li key={f.grupo} className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-brand-gray">{GRUPOS[f.grupo].nombre}</p>
                    <select
                      value={f.producto.id}
                      onChange={(e) => setElegidos((x) => ({ ...x, [f.grupo]: e.target.value }))}
                      aria-label={"Corte de " + GRUPOS[f.grupo].nombre}
                      className="w-full bg-transparent border-b border-brand-line focus:border-brand-red outline-none py-1 text-sm font-semibold text-brand-cream"
                    >
                      {f.opciones.map((p) => (
                        <option key={p.id} value={p.id} className="bg-brand-panel">
                          {p.nombre} — {p.precio}/kg
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">{formatCantidad(f.cantidad, "/ kilo")}</p>
                    <p className="text-xs text-brand-red-text">{formatCLP(f.subtotal)}</p>
                  </div>
                </li>
              ))}
              {plan.extras.map((f) => (
                <li key={f.producto.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-brand-cream-dim">{f.producto.nombre}</span>
                  <span className="text-right">
                    <span className="font-semibold">{formatCantidad(f.cantidad, f.producto.unidad)}</span>
                    <span className="block text-xs text-brand-red-text">{formatCLP(f.subtotal)}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-brand-line">
              <div className="flex items-baseline justify-between">
                <span className="text-brand-cream-dim">Total estimado</span>
                <span className="font-display text-3xl text-brand-red-text">{formatCLP(plan.total)}</span>
              </div>
              <p className="text-xs text-brand-gray text-right mt-1">≈ {formatCLP(plan.porPersona)} por persona</p>

              <button
                onClick={agregarTodo}
                className="mt-5 w-full bg-brand-red hover:bg-[#d81f1a] text-brand-cream font-bold text-sm uppercase tracking-wide py-3.5 rounded-sm shadow-lg shadow-brand-red/30 transition"
              >
                Agregar todo al carrito
              </button>
              <p className="text-[11px] text-brand-gray text-center mt-2.5">
                Cálculo referencial en carne cruda. Puedes ajustar cada corte en el carrito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
