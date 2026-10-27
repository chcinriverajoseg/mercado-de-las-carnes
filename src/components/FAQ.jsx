import Mascota from "./Mascota";
import { NEGOCIO, FORMAS_PAGO, waLink } from "../data/negocio";
import { formatCLP } from "../utils/format";

const gratis = NEGOCIO.despachoGratisDesde;

const PREGUNTAS = [
  {
    p: "¿Cómo hago un pedido?",
    r: "Agrega tus productos al carrito eligiendo el peso, completa tus datos de entrega y toca “Enviar pedido por WhatsApp”. Te respondemos para confirmar el total y la hora de entrega.",
  },
  {
    p: "¿A qué sectores despachan?",
    r: `Despachamos en ${NEGOCIO.zonaDespacho}${NEGOCIO.despachoTodosLosDias ? ", todos los días" : ""}. Si estás fuera de esa zona, escríbenos y vemos si podemos llegar.`,
  },
  {
    p: "¿Cuánto cuesta el despacho?",
    r: gratis
      ? `Es gratis en compras sobre ${formatCLP(gratis)}. Bajo ese monto el costo depende de la distancia y te lo confirmamos por WhatsApp antes de despachar.`
      : "Depende de la distancia y te lo confirmamos por WhatsApp antes de despachar.",
  },
  {
    p: "¿Puedo programar el día y la hora?",
    r: "Sí. En el carrito puedes elegir “Lo antes posible” o un día específico, y luego la franja de la mañana o de la tarde. Funciona igual para despacho y para retiro.",
  },
  {
    p: "¿Puedo retirar en el local?",
    r: `Sí, sin costo, en ${NEGOCIO.direccion}, ${NEGOCIO.comuna}. Elige “Retiro en local” en el carrito y te avisamos cuando esté listo.`,
  },
  {
    p: "¿El peso que pido es exacto?",
    r: "Al cortar, el peso puede variar levemente hacia arriba o hacia abajo. Por eso el total del carrito es estimado: te confirmamos el monto final antes de entregar.",
  },
  {
    p: "¿Puedo pedir un corte especial?",
    r: "Claro. Escribe en “Indicaciones” cómo lo quieres: más delgado o grueso, sin grasa, porcionado, molido dos veces, etc.",
  },
  {
    p: "¿Qué formas de pago aceptan?",
    r: FORMAS_PAGO.join(", ") + ".",
  },
  {
    p: "¿Cómo conservo la carne?",
    r: "Guárdala en el refrigerador apenas la recibas. La carne molida conviene usarla dentro de 1–2 días y los cortes enteros dentro de 3 días; si no, congélala bien envuelta.",
  },
];

export default function FAQ() {
  return (
    <section id="preguntas" className="relative px-4 sm:px-6 py-24 scroll-mt-32">
      <div className="relative max-w-3xl mx-auto">
        <Mascota side="right" />
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-brand-red font-semibold mb-3 inline-block">Ayuda</span>
          <h2 className="font-display text-3xl sm:text-4xl">Preguntas frecuentes</h2>
        </div>

        <div className="divide-y divide-brand-line border-y border-brand-line">
          {PREGUNTAS.map((q) => (
            <details key={q.p} className="group py-1">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 font-semibold hover:text-brand-red transition-colors [&::-webkit-details-marker]:hidden">
                {q.p}
                <span className="shrink-0 w-7 h-7 rounded-full border border-brand-line flex items-center justify-center text-brand-red transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-brand-cream-dim leading-relaxed pb-5 pr-10">{q.r}</p>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-brand-cream-dim mt-10">
          ¿Otra duda?{" "}
          <a href={waLink("Hola, tengo una consulta")} target="_blank" rel="noopener" className="text-brand-red font-semibold hover:underline underline-offset-4">
            Escríbenos por WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
