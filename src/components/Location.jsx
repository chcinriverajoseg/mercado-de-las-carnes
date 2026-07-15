export default function Location() {
  const horarios = [
    { dia: "Lunes a sábado", horas: "09:30 – 19:30" },
    { dia: "Domingo", horas: "10:00 – 15:00" },
  ];

  return (
    <section id="ubicacion" className="bg-brand-panel px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-14">
          <span className="text-xs tracking-[4px] uppercase text-brand-red font-semibold mb-3 inline-block">
            Visítanos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl">Ubicación y horarios</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-brand-panel-2 border border-brand-line rounded-lg p-9">
            <h3 className="font-semibold text-xl mb-5">Horario de atención</h3>
            {horarios.map((h) => (
              <div key={h.dia} className="flex justify-between py-2.5 border-b border-brand-line text-sm last:border-none">
                <span className="text-brand-cream-dim">{h.dia}</span>
                <span className="font-semibold">{h.horas}</span>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t border-brand-line">
              <strong className="block mb-1.5 text-[15px]">Dirección</strong>
              <p className="text-brand-cream-dim text-sm">Avenida Concón Reñaca 355</p>
              <p className="text-brand-cream-dim text-sm">2510000, Concón, Región de Valparaíso</p>
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
