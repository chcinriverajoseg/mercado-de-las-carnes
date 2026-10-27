// Utilidades compartidas: precios, cantidades y estado de stock.

// "$6.990" -> 6990 (formato chileno, "." como separador de miles).
// "Consultar" -> 0
export function parsePrecio(precioStr) {
  const digits = String(precioStr).replace(/[^\d]/g, "");
  return parseInt(digits, 10) || 0;
}

// 6990 -> "$6.990"
export function formatCLP(numero) {
  return "$" + Math.round(numero).toLocaleString("es-CL");
}

// Los productos "/ kilo" se venden por peso (de medio en medio kilo);
// el resto (unidad, caja, paquete, bolsa) se vende por unidades enteras.
export function esPorKilo(unidad) {
  return String(unidad).includes("kilo");
}

export const PASO_KILO = 0.5;

// 1.5 -> "1,5 kg" | 0.5 -> "½ kg" | 3 (unidad) -> "3 un."
export function formatCantidad(cantidad, unidad) {
  if (!esPorKilo(unidad)) return `${cantidad} un.`;
  if (cantidad === 0.5) return "½ kg";
  return `${cantidad.toLocaleString("es-CL")} kg`;
}

// Umbral para mostrar "Últimas unidades".
const UMBRAL_POCAS = 6;

export function stockInfo(stock) {
  if (stock === 0) {
    return { label: "Agotado", nivel: "agotado", className: "bg-brand-gray/15 text-brand-gray border-brand-gray/30" };
  }
  if (stock <= UMBRAL_POCAS) {
    return { label: "Últimas unidades", nivel: "pocas", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
  }
  return { label: "Disponible", nivel: "disponible", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" };
}

// Normaliza texto para búsquedas: sin tildes, minúsculas.
export function normalizar(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Info de oferta: { enOferta, antes, ahorroPct } (ahorroPct solo si hay precio anterior mayor)
export function ofertaInfo(producto) {
  const ahora = parsePrecio(producto.precio);
  const antes = parsePrecio(producto.precioAntes);
  const ahorroPct = antes > ahora && ahora > 0 ? Math.round((1 - ahora / antes) * 100) : 0;
  return { enOferta: Boolean(producto.oferta), antes: ahorroPct ? antes : 0, ahorroPct };
}
