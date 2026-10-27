// Cálculos de horario en hora de Chile (America/Santiago), sin importar
// en qué zona horaria esté el teléfono del cliente.
import { NEGOCIO } from "../data/negocio";

const ZONA = "America/Santiago";
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

function aMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// { dia: 0-6, minutos: desde medianoche, fechaISO: "2026-10-26" } en hora chilena
export function ahoraChile(fecha = new Date()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: ZONA,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      hour12: false,
    })
      .formatToParts(fecha)
      .map((p) => [p.type, p.value])
  );
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    dia: dias[partes.weekday],
    minutos: (Number(partes.hour) % 24) * 60 + Number(partes.minute),
    fechaISO: `${partes.year}-${partes.month}-${partes.day}`,
  };
}

// Estado del local: { abierto, texto }
export function estadoLocal(fecha = new Date()) {
  const { dia, minutos } = ahoraChile(fecha);
  const hoy = NEGOCIO.horarioSemana[dia];
  if (hoy) {
    const [abre, cierra] = hoy.map(aMinutos);
    if (minutos >= abre && minutos < cierra) return { abierto: true, texto: `Abierto ahora · cierra a las ${hoy[1]}` };
    if (minutos < abre) return { abierto: false, texto: `Cerrado · abre hoy a las ${hoy[0]}` };
  }
  // Buscar el próximo día con horario
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const h = NEGOCIO.horarioSemana[d];
    if (h) return { abierto: false, texto: `Cerrado · abre ${i === 1 ? "mañana" : "el " + DIAS[d]} a las ${h[0]}` };
  }
  return { abierto: false, texto: "Cerrado" };
}

// ¿Todavía se alcanza a entregar hoy? (al menos 1 hora antes del cierre)
export function alcanzaHoy(fecha = new Date()) {
  const { dia, minutos } = ahoraChile(fecha);
  const hoy = NEGOCIO.horarioSemana[dia];
  return Boolean(hoy) && minutos < aMinutos(hoy[1]) - 60;
}

// Próximos días para elegir entrega: [{ valor: "2026-10-26", etiqueta: "Hoy" }, …]
export function proximosDias(cantidad = 6, fecha = new Date()) {
  const { fechaISO } = ahoraChile(fecha);
  const base = new Date(fechaISO + "T12:00:00");
  const lista = [];
  for (let i = 0; i < cantidad + 1; i++) {
    if (i === 0 && !alcanzaHoy(fecha)) continue;
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    if (!NEGOCIO.horarioSemana[d.getDay()]) continue;
    const valor = d.toISOString().slice(0, 10);
    const etiqueta =
      i === 0
        ? "Hoy"
        : i === 1
          ? "Mañana"
          : d
              .toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short" })
              .replace(/^./, (c) => c.toUpperCase());
    lista.push({ valor, etiqueta });
    if (lista.length >= cantidad) break;
  }
  return lista;
}

// "2026-10-27" -> "martes 27 de octubre"
export function fechaLarga(valor) {
  if (!valor) return "";
  return new Date(valor + "T12:00:00").toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
