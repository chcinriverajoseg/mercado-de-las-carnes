import { categorias } from "../data/productos";

export default function CategoryNav() {
  return (
    <div className="bg-brand-panel border-b border-brand-line">
      <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2.5 overflow-x-auto no-scrollbar">
        {categorias.map((cat) => (
          <a
            key={cat.id}
            href={"#" + cat.id}
            className="whitespace-nowrap text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full border border-brand-line bg-brand-panel-2 text-brand-cream-dim hover:border-brand-red hover:text-brand-red hover:shadow-md hover:shadow-brand-red/20 transition-all"
          >
            {cat.nombre}
          </a>
        ))}
      </div>
    </div>
  );
}
