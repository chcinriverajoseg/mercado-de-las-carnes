import { NEGOCIO, waLink } from "../data/negocio";

export default function Footer() {
  return (
    <footer className="border-t border-brand-line px-6 pt-12 pb-7">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-8 mb-9">
          <div className="font-display text-xl">
            Mercado <span className="text-brand-red">de las carnes</span>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-brand-cream-dim">
            <a href="#vacuno" className="hover:text-brand-red">Productos</a>
            <a href="#nosotros" className="hover:text-brand-red">Nosotros</a>
            <a href="#ubicacion" className="hover:text-brand-red">Ubicación</a>
            <a href={waLink("Hola")} target="_blank" rel="noopener" className="hover:text-brand-red">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-brand-line pt-5 text-xs text-brand-gray">
          <span>© {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos reservados.</span>
          <span>
            {NEGOCIO.direccion}, {NEGOCIO.comuna} · Sitio por{" "}
            <a href="https://chacinpc.vercel.app" target="_blank" rel="noopener" className="hover:text-brand-red">
              ChacinPC
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
