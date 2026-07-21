import { WHATSAPP_NUMBER } from "../data/cortes";
import { useShop } from "../context/useShop";
import logo from "../assets/logo-header.png";

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.5 14.4c-.3-.15-1.75-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.52.07-.8.37-.27.3-1.04 1-1.04 2.47s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.5.71.3 1.27.48 1.7.62.72.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.4.24-.7.24-1.3.17-1.42-.07-.13-.27-.2-.56-.35z" fill="currentColor" />
      <path d="M12 2C6.48 2 2 6.36 2 11.75c0 2.02.62 3.9 1.68 5.46L2 22l5-1.6a10.1 10.1 0 0 0 5 1.35c5.52 0 10-4.36 10-9.75S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CartIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="21" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="21" r="1.4" fill="currentColor" />
    </svg>
  );
}

function StockIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3.8 7.7 12 12l8.2-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12v9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Header() {
  const { totalItems, toggleCart, toggleStock } = useShop();

  return (
    <header className="bg-brand-bg/95 backdrop-blur-sm border-b border-brand-line">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img src={logo} alt="Mercado de las Carnes" className="w-11 h-11 rounded-full shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-display text-lg tracking-wide leading-tight truncate">Mercado de las Carnes</span>
            <span className="hidden sm:block text-[11px] tracking-wide text-brand-cream-dim">
              Carnes frescas · Delivery · Concón
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleStock}
            aria-label="Ver stock disponible"
            title="Ver stock disponible"
            className="flex items-center gap-1.5 text-brand-cream-dim hover:text-brand-red border border-brand-line hover:border-brand-red rounded-sm px-3 py-2.5 transition-colors"
          >
            <StockIcon />
            <span className="hidden md:inline text-xs font-semibold uppercase tracking-wide">Stock</span>
          </button>

          <button
            onClick={toggleCart}
            aria-label="Ver carrito"
            title="Ver carrito"
            className="relative flex items-center gap-1.5 text-brand-cream-dim hover:text-brand-red border border-brand-line hover:border-brand-red rounded-sm px-3 py-2.5 transition-colors"
          >
            <CartIcon />
            <span className="hidden md:inline text-xs font-semibold uppercase tracking-wide">Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-brand-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <a
            href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=Hola%2C%20quiero%20hacer%20un%20pedido"}
            target="_blank"
            rel="noopener"
            className="hidden sm:flex items-center gap-2 bg-brand-red hover:bg-red-600 text-brand-cream font-bold text-sm px-5 py-2.5 rounded-sm shadow-md shadow-brand-red/30 hover:shadow-brand-red/50 transition-all"
          >
            <WhatsAppIcon className="shrink-0" />
            Pedir por WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
