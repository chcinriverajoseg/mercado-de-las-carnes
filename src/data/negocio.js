// Datos del negocio en UN solo lugar. Si algo cambia (teléfono, horario,
// dirección), se edita aquí y se actualiza en todo el sitio.

// Número de WhatsApp del local: formato 569XXXXXXXX (sin +, sin espacios).
// ⚠️ IMPORTANTE: reemplazar por el número real antes de publicar.
export const WHATSAPP_NUMBER = "56912345678";

export const NEGOCIO = {
  nombre: "Mercado de las Carnes",
  url: "https://mercado-de-las-carnes.vercel.app",
  direccion: "Avenida Concón Reñaca 355",
  comuna: "Concón",
  region: "Región de Valparaíso",
  codigoPostal: "2510000",
  zonaDespacho: "Concón y Reñaca",
  pedidoMinimo: 1000,
  horarios: [
    { dia: "Lunes a sábado", horas: "09:30 – 19:30" },
    { dia: "Domingo", horas: "10:00 – 15:00" },
  ],
};

export const FORMAS_PAGO = ["Efectivo", "Transferencia", "Tarjeta (débito/crédito)"];

// Arma un enlace de WhatsApp con un mensaje ya escrito.
export function waLink(texto = "Hola, quiero hacer un pedido") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

// ¿El número sigue siendo el de ejemplo? Se usa para avisar en desarrollo.
export const WHATSAPP_ES_EJEMPLO = WHATSAPP_NUMBER === "56912345678";
