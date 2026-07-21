import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/useShop";
import { formatCLP } from "../utils/format";

export default function CartDrawer() {
  const { items, updateQty, removeItem, totalPrice, cartOpen, closeCart, buildWhatsAppUrl } =
    useShop();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-brand-panel border-l border-brand-line z-[80] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-line">
              <h2 className="font-display text-lg">Tu carrito</h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="text-brand-gray hover:text-brand-red text-xl leading-none px-1"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="text-brand-gray text-sm text-center mt-10">
                  Aún no has agregado productos.
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 border-b border-brand-line pb-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight truncate">{item.nombre}</p>
                        <p className="text-xs text-brand-gray mt-0.5">
                          {formatCLP(item.precioNum)} {item.unidad}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.cantidad - 1)}
                            className="w-6 h-6 rounded-full border border-brand-line flex items-center justify-center text-sm hover:border-brand-red hover:text-brand-red"
                          >
                            −
                          </button>
                          <span className="text-sm w-5 text-center">{item.cantidad}</span>
                          <button
                            onClick={() => updateQty(item.id, item.cantidad + 1)}
                            className="w-6 h-6 rounded-full border border-brand-line flex items-center justify-center text-sm hover:border-brand-red hover:text-brand-red"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-brand-red">
                          {formatCLP(item.precioNum * item.cantidad)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-brand-gray hover:text-brand-red mt-1.5"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-brand-line">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-brand-cream-dim">Total estimado</span>
                <span className="font-display text-brand-red text-lg">{formatCLP(totalPrice)}</span>
              </div>
              {items.length > 0 ? (
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener"
                  className="block text-center bg-brand-red hover:bg-red-600 text-brand-cream font-bold text-sm px-5 py-3 rounded-sm shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all"
                >
                  Enviar pedido por WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="block w-full text-center bg-brand-panel-2 text-brand-gray font-bold text-sm px-5 py-3 rounded-sm cursor-not-allowed"
                >
                  Enviar pedido por WhatsApp
                </button>
              )}
              <p className="text-[11px] text-brand-gray mt-2 text-center">
                Los precios son referenciales, se confirman por WhatsApp.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
