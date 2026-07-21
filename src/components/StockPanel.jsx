import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/useShop";
import { stockInfo } from "../utils/format";

export default function StockPanel() {
  const { stockOpen, closeStock, todosLosProductos } = useShop();

  return (
    <AnimatePresence>
      {stockOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStock}
          />
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-brand-panel border border-brand-line rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl shadow-black/50">
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-line">
                <div>
                  <h2 className="font-display text-lg">Mercancía disponible</h2>
                  <p className="text-xs text-brand-gray mt-0.5">
                    Stock referencial — se confirma disponibilidad exacta por WhatsApp.
                  </p>
                </div>
                <button
                  onClick={closeStock}
                  aria-label="Cerrar"
                  className="text-brand-gray hover:text-brand-red text-xl leading-none px-1"
                >
                  ×
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-4 space-y-1.5">
                {todosLosProductos.map((p) => {
                  const info = stockInfo(p.stock);
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-3 py-2 border-b border-brand-line last:border-none"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{p.nombre}</p>
                        <p className="text-xs text-brand-gray">{p.categoria}</p>
                      </div>
                      <span
                        className={
                          "shrink-0 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border " +
                          info.className
                        }
                      >
                        {info.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
