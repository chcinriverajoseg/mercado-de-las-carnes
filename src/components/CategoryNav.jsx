import { categorias } from "../data/productos";

const estiloBase =
  "whitespace-nowrap text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full border transition-all";
const estiloLink =
  estiloBase +
  " border-brand-line bg-brand-panel-2 text-brand-cream-dim hover:border-brand-red hover:text-brand-red hover:shadow-md hover:shadow-brand-red/20";

export default function CategoryNav() {
  return (
    <div className="bg-brand-panel border-b border-brand-line">
      <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2.5 overflow-x-auto no-scrollbar">
        <a
          href="#corte-semana"
          className={
            estiloBase +
            " border-brand-red bg-brand-red/15 text-brand-red hover:bg-brand-red hover:text-brand-cream hover:shadow-md hover:shadow-brand-red/30"
          }
        >
          ★ Corte de la semana
        </a>

        {categorias.map((cat) => (
          <a key={cat.id} href={"#" + cat.id} className={estiloLink}>
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
  );
}
