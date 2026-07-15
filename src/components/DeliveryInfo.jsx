import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const items = [
  {
    titulo: "Zona de entrega",
    detalle: "Concón y Reñaca",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    titulo: "Costo del envío",
    detalle: "Varía según distancia y zona",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="9" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15 12h3.2l2.8 3v2h-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="7.5" cy="18.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.5" cy="18.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    titulo: "Pedido mínimo",
    detalle: "$1.000 para delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v10M9.5 9.3c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8c0 2.4-5 1.6-5 4 0 1 1 1.8 2.5 1.8s2.5-.8 2.5-1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function DeliveryInfo() {
  return (
    <section className="relative px-6 py-14 bg-brand-panel border-y border-brand-line overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.titulo}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex items-center gap-4 bg-brand-panel-2 border border-brand-line rounded-lg p-5 shadow-lg shadow-black/20"
          >
            <div className="w-11 h-11 shrink-0 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{item.titulo}</h3>
              <p className="text-brand-cream-dim text-sm">{item.detalle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
