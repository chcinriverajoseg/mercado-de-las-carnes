//// Utilidades compartidas: formato de precios y estado de stock.

// "$6.990" -> 6990 (formato chileno, "." como separador de miles)
export function parsePrecio(precioStr) {
  const digits = String(precioStr).replace(/[^\d]/g, "");
  return parseInt(digits, 10) || 0;
}

// 6990 -> "$6.990"
export function formatCLP(numero) {
  return "$" + Math.round(numero).toLocaleString("es-CL");
}

// Umbrales de stock para mostrar la etiqueta correcta en cards y panel.
const UMBRAL_POCAS = 6;

export function stockInfo(stock) {
  if (stock === 0) {
    return { label: "Agotado", nivel: "agotado", className: "bg-brand-gray/15 text-brand-gray border-brand-gray/30" };
  }
  if (stock <= UMBRAL_POCAS) {
    return { label: `Quedan ${stock}`, nivel: "pocas", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
  }
  return { label: "Disponible", nivel: "disponible", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" };
}
