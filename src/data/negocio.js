// Datos del negocio en UN solo lugar. Si algo cambia (teléfono, horario,
// dirección, despacho), se edita aquí y se actualiza en todo el sitio.

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

  // Despacho
  zonaDespacho: "Concón y Reñaca",
  pedidoMinimo: 1000,
  despachoGratisDesde: 40000, // 0 = sin despacho gratis
  despachoTodosLosDias: true,

  // Horario para mostrar (texto)
  horarios: [
    { dia: "Lunes a sábado", horas: "09:30 – 19:30" },
    { dia: "Domingo", horas: "10:00 – 15:00" },
  ],
  // Horario para calcular "Abierto ahora" (0 = domingo … 6 = sábado)
  horarioSemana: {
    0: ["10:00", "15:00"],
    1: ["09:30", "19:30"],
    2: ["09:30", "19:30"],
    3: ["09:30", "19:30"],
    4: ["09:30", "19:30"],
    5: ["09:30", "19:30"],
    6: ["09:30", "19:30"],
  },

  // Franjas para programar despacho o retiro
  franjas: ["Mañana (10:00 – 13:00)", "Tarde (15:00 – 19:00)"],
};

// Planilla de Google con precios, stock y ofertas (ver README → "Planilla de precios").
// Pega aquí el enlace "Publicar en la web" en formato CSV. Vacío = se usan los precios de productos.js.
export const PLANILLA_URL = "";

// Enlace de EDICIÓN de esa planilla. Lo abre el botón "Panel del local" del pie de página.
// Google pide iniciar sesión: solo quienes tengan permiso pueden editar. Vacío = no se muestra el botón.
export const PANEL_URL =
  "https://docs.google.com/spreadsheets/d/1pxTWfGF6RREVQ6sCm8rvxGjWRq6G5NiYYMS6-5LREIg/edit";

// Redes y comunidad. Pega aquí los enlaces reales: lo que quede vacío no se muestra.
export const REDES = {
  instagram: "", // ej: "https://instagram.com/mercadodelascarnes"
  grupoWhatsapp: "", // enlace de invitación al grupo, ej: "https://chat.whatsapp.com/XXXX"
  googleResenas: "", // enlace a la ficha de Google (reseñas)
};

export const FORMAS_PAGO = ["Efectivo", "Transferencia", "Tarjeta (débito/crédito)"];

// Arma un enlace de WhatsApp con un mensaje ya escrito.
export function waLink(texto = "Hola, quiero hacer un pedido") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

// ¿El número sigue siendo el de ejemplo? Se usa para avisar en desarrollo.
export const WHATSAPP_ES_EJEMPLO = WHATSAPP_NUMBER === "56912345678";
