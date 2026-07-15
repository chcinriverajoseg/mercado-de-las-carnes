import { WHATSAPP_NUMBER } from "../data/cortes";

export default function Footer() {
  return (
    <footer className="border-t border-brand-line px-6 pt-12 pb-7">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-8 mb-9">
          <div className="font-display text-xl">
            Mercado <span className="text-brand-red">de las carnes</span>
          </div>
          <div className="flex gap-7 text-sm text-brand-cream-dim">
            <a href="#vacuno" className="hover:text-brand-red">Productos</a>
            <a href="#nosotros" className="hover:text-brand-red">Nosotros</a>
            <a href="#ubicacion" className="hover:text-brand-red">Ubicación</a>
            <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener" className="hover:text-brand-red">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-brand-line pt-5 text-xs text-brand-gray">
          <span>© 2026 Mercado de las Carnes. Todos los derechos reservados.</span>
          <span>Concón, Chile</span>
        </div>
      </div>
    </footer>
  );
}
