import { AnimatePresence, motion } from "framer-motion";
import { waLink } from "../data/negocio";
import { useShop } from "../context/useShop";
import { formatCLP } from "../utils/format";

// Botón flotante de WhatsApp. En celular, cuando hay productos en el carrito,
// se reemplaza por una barra inferior "Ver carrito" (como en las tiendas online).
export default function WhatsappFloat() {
  const { totalItems, totalPrice, openCart, cartOpen } = useShop();
  const conCarrito = totalItems > 0;

  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        aria-label="Escribir por WhatsApp"
        className={
          "fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] hover:scale-105 transition items-center justify-center shadow-lg shadow-black/50 " +
          (conCarrito ? "hidden sm:flex" : "flex")
        }
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.5 14.4c-.3-.15-1.75-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.52.07-.8.37-.27.3-1.04 1-1.04 2.47s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.5.71.3 1.27.48 1.7.62.72.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.4.24-.7.24-1.3.17-1.42-.07-.13-.27-.2-.56-.35z"
            fill="#fff"
          />
          <path
            d="M12 2C6.48 2 2 6.36 2 11.75c0 2.02.62 3.9 1.68 5.46L2 22l5-1.6a10.1 10.1 0 0 0 5 1.35c5.52 0 10-4.36 10-9.75S17.52 2 12 2z"
            stroke="#fff"
            strokeWidth="1.4"
          />
        </svg>
      </a>

      <AnimatePresence>
        {conCarrito && !cartOpen && (
          <motion.button
            onClick={openCart}
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="sm:hidden fixed bottom-0 inset-x-0 z-[60] m-3 flex items-center justify-between bg-brand-red text-brand-cream font-bold text-sm px-5 py-3.5 rounded-md shadow-xl shadow-black/60"
          >
            <span>
              Ver carrito · {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </span>
            <span className="font-display">{formatCLP(totalPrice)}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
