import Mascota from "./Mascota";
import { NEGOCIO, waLink } from "../data/negocio";

export default function Location() {
  const horarios = NEGOCIO.horarios;
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${NEGOCIO.nombre} ${NEGOCIO.direccion} ${NEGOCIO.comuna}`);

  return (
    <section id="ubicacion" className="bg-brand-panel px-4 sm:px-6 py-16 sm:py-24 scroll-mt-32">
      <div className="relative max-w-6xl mx-auto">
        <Mascota side="right" />
        <div className="text-center max-w-lg mx-auto mb-14">
          <span className="text-xs tracking-[4px] uppercase text-brand-red-text font-semibold mb-3 inline-block">
            Visítanos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl">Ubicación y horarios</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-brand-panel-2 border border-brand-line rounded-lg p-6 sm:p-9">
            <h3 className="font-semibold text-xl mb-5">Horario de atención</h3>
            {horarios.map((h) => (
              <div key={h.dia} className="flex justify-between py-2.5 border-b border-brand-line text-sm last:border-none">
                <span className="text-brand-cream-dim">{h.dia}</span>
                <span className="font-semibold">{h.horas}</span>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t border-brand-line">
              <strong className="block mb-1.5 text-[15px]">Dirección</strong>
              <p className="text-brand-cream-dim text-sm">{NEGOCIO.direccion}</p>
              <p className="text-brand-cream-dim text-sm">
                {NEGOCIO.codigoPostal}, {NEGOCIO.comuna}, {NEGOCIO.region}
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-semibold border border-brand-cream-dim hover:border-brand-red hover:text-brand-red-text px-4 py-2.5 rounded-sm transition"
                >
                  Cómo llegar
                </a>
                <a
                  href={waLink("Hola, tengo una consulta")}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-semibold bg-brand-red hover:bg-[#d81f1a] text-brand-cream px-4 py-2.5 rounded-sm transition"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-brand-line min-h-[280px]">
            <iframe
              title="Ubicación Mercado de las Carnes"
              src="https://www.google.com/maps?q=Avenida+Conc%C3%B3n+Re%C3%B1aca+355+Conc%C3%B3n+Valparaiso&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "280px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
