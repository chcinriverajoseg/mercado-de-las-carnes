import { categorias, OFERTAS } from "../data/productos";
import { useShop } from "../context/useShop";

const estiloBase =
  "whitespace-nowrap text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full border transition-all";
const estiloLink =
  estiloBase +
  " border-brand-line bg-brand-panel-2 text-brand-cream-dim hover:border-brand-red hover:text-brand-red hover:shadow-md hover:shadow-brand-red/20";

function irA(id) {
  // pequeño retraso para que React pinte la sección antes de hacer scroll
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 30);
}

export default function CategoryNav() {
  const { busqueda, setBusqueda } = useShop();

  const onBuscar = (e) => {
    const valor = e.target.value;
    if (!busqueda && valor) irA("resultados");
    setBusqueda(valor);
  };

  const onCategoria = (e, id) => {
    if (busqueda) {
      e.preventDefault();
      setBusqueda("");
      irA(id);
    }
  };

  return (
    <div className="bg-brand-panel border-b border-brand-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex gap-2.5 items-center">
        <label className="relative shrink-0 w-40 sm:w-56">
          <span className="sr-only">Buscar producto</span>
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={busqueda}
            onChange={onBuscar}
            placeholder="Buscar corte o producto…"
            className="w-full bg-brand-bg border border-brand-line focus:border-brand-red outline-none rounded-full pl-9 pr-4 py-2 text-sm text-brand-cream placeholder:text-brand-gray"
          />
        </label>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
          {OFERTAS.length > 0 && (
            <a
              href="#ofertas"
              onClick={(e) => onCategoria(e, "ofertas")}
              className={estiloBase + " border-amber-400/70 bg-amber-400/10 text-amber-300 hover:bg-amber-400 hover:text-black"}
            >
              % Ofertas
            </a>
          )}

          <a
            href="#corte-semana"
            onClick={(e) => onCategoria(e, "corte-semana")}
            className={
              estiloBase +
              " border-brand-red bg-brand-red/15 text-brand-red hover:bg-brand-red hover:text-brand-cream hover:shadow-md hover:shadow-brand-red/30"
            }
          >
            ★ Corte de la semana
          </a>

          <a href="#calculadora" onClick={(e) => onCategoria(e, "calculadora")} className={estiloLink}>
            Calcula tu asado
          </a>

          {categorias.map((cat) => (
            <a key={cat.id} href={"#" + cat.id} onClick={(e) => onCategoria(e, cat.id)} className={estiloLink}>
              {cat.nombre}
            </a>
          ))}

          <span
            aria-disabled="true"
            className={
              estiloBase +
              " border-dashed border-brand-line bg-transparent text-brand-gray cursor-default flex items-center gap-2"
            }
          >
            Milanesa
            <span className="text-[10px] normal-case tracking-normal bg-brand-red/20 text-brand-red px-2 py-0.5 rounded-full">
              Próximamente
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
