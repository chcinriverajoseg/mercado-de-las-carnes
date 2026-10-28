import { cortes } from "../data/cortes";

export default function Cortes() {
  return (
    <section id="cortes" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-14">
          <span className="text-xs tracking-[4px] uppercase text-brand-red font-semibold mb-3 inline-block">
            Catálogo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">Nuestros cortes</h2>
          <p className="text-brand-cream-dim">
            Precios referenciales por kilo. Escríbenos por WhatsApp para
            disponibilidad del día y despacho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cortes.map((corte) => (
            <div
              key={corte.id}
              className="bg-brand-panel border border-brand-line rounded-md p-7 hover:border-brand-red hover:-translate-y-1 transition"
            >
              <h3 className="font-semibold text-lg mb-2">{corte.nombre}</h3>
              <p className="text-brand-gray text-sm mb-5 min-h-[42px]">{corte.desc}</p>
              <div className="flex items-baseline justify-between border-t border-dashed border-brand-line pt-3">
                <span className="font-display text-brand-red text-xl">{corte.precio}</span>
                <span className="text-xs text-brand-gray">/ kilo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
