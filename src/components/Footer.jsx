import { NEGOCIO, REDES, FORMAS_PAGO, waLink } from "../data/negocio";
import { useCatalogo } from "../context/useCatalogo";
import { formatCLP } from "../utils/format";
import logo from "../assets/logo-inicio.webp";

function Columna({ titulo, children }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[2px] text-brand-cream mb-4">{titulo}</h3>
      <ul className="space-y-2.5 text-sm text-brand-cream-dim">{children}</ul>
    </div>
  );
}

const linkCls = "hover:text-brand-red-text transition-colors";

function IconoInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function IconoWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M12 2C6.48 2 2 6.36 2 11.75c0 2.02.62 3.9 1.68 5.46L2 22l5-1.6a10.1 10.1 0 0 0 5 1.35c5.52 0 10-4.36 10-9.75S17.52 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function IconoGoogle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.7l5.9-.9L12 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  const { categorias, ofertas } = useCatalogo();
  const redes = [
    REDES.instagram && { href: REDES.instagram, label: "Instagram", icono: <IconoInstagram /> },
    REDES.grupoWhatsapp && { href: REDES.grupoWhatsapp, label: "Grupo de WhatsApp", icono: <IconoWhatsapp /> },
    REDES.googleResenas && { href: REDES.googleResenas, label: "Reseñas en Google", icono: <IconoGoogle /> },
  ].filter(Boolean);

  return (
    <footer className="border-t border-brand-line bg-black/40">
      {/* comunidad: solo aparece cuando hay enlace al grupo de WhatsApp */}
      {REDES.grupoWhatsapp && (
        <div className="border-b border-brand-line">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-display text-xl">Ofertas antes que nadie</p>
              <p className="text-sm text-brand-cream-dim">Únete a nuestro grupo de WhatsApp y recibe las ofertas de la semana.</p>
            </div>
            <a
              href={REDES.grupoWhatsapp}
              target="_blank"
              rel="noopener"
              className="shrink-0 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-bold text-sm px-6 py-3 rounded-sm transition"
            >
              Unirme al grupo
            </a>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-x-8 gap-y-10 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <img src={logo} width="1000" height="611" alt={NEGOCIO.nombre} className="h-14 w-auto mb-4" loading="lazy" />
            <p className="text-sm text-brand-cream-dim max-w-xs">
              Carnicería de barrio en {NEGOCIO.comuna}. Vacuno, cerdo, pollo, fiambrería, abarrotes y empanadas, con
              despacho {NEGOCIO.despachoTodosLosDias ? "todos los días " : ""}en {NEGOCIO.zonaDespacho}.
            </p>
            {redes.length > 0 && (
              <div className="flex gap-2.5 mt-5">
                {redes.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={r.label}
                    title={r.label}
                    className="w-10 h-10 rounded-full border border-brand-line flex items-center justify-center text-brand-cream-dim hover:border-brand-red hover:text-brand-red-text transition-colors"
                  >
                    {r.icono}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Columna titulo="Tienda">
            {ofertas.length > 0 && (
              <li>
                <a href="#ofertas" className={linkCls}>Ofertas de la semana</a>
              </li>
            )}
            <li>
              <a href="#calculadora" className={linkCls}>Calcula tu asado</a>
            </li>
            {categorias.map((c) => (
              <li key={c.id}>
                <a href={"#" + c.id} className={linkCls}>{c.nombre}</a>
              </li>
            ))}
          </Columna>

          <Columna titulo="Ayuda">
            <li>
              <a href="#preguntas" className={linkCls}>Preguntas frecuentes</a>
            </li>
            <li>
              <a href="#nosotros" className={linkCls}>Nosotros</a>
            </li>
            <li>
              <a href="#ubicacion" className={linkCls}>Cómo llegar</a>
            </li>
            <li>
              <a href={waLink("Hola, tengo una consulta")} target="_blank" rel="noopener" className={linkCls}>
                Contacto por WhatsApp
              </a>
            </li>
          </Columna>

          <Columna titulo="Atención">
            {NEGOCIO.horarios.map((h) => (
              <li key={h.dia} className="flex justify-between gap-3">
                <span>{h.dia}</span>
                <span className="text-brand-cream">{h.horas}</span>
              </li>
            ))}
            <li className="pt-2">
              {NEGOCIO.direccion}, {NEGOCIO.comuna}
            </li>
            {NEGOCIO.despachoGratisDesde > 0 && (
              <li className="text-brand-cream">Despacho gratis sobre {formatCLP(NEGOCIO.despachoGratisDesde)}</li>
            )}
          </Columna>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-brand-gray mr-1">Medios de pago:</span>
          {FORMAS_PAGO.map((f) => (
            <span key={f} className="text-[11px] border border-brand-line rounded-sm px-2.5 py-1 text-brand-cream-dim">
              {f}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-brand-line pt-5 text-xs text-brand-gray">
          <span>
            © {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos reservados.
          </span>
          <span>
            Sitio desarrollado por{" "}
            <a href="https://chacinpc.vercel.app" target="_blank" rel="noopener" className="hover:text-brand-red-text">
              ChacinPC
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
