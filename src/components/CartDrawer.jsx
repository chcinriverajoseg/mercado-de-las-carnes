import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/useShop";
import { formatCLP, formatCantidad } from "../utils/format";
import { NEGOCIO, FORMAS_PAGO } from "../data/negocio";
import { proximosDias } from "../utils/horario";

const inputCls =
  "w-full bg-brand-bg border border-brand-line focus:border-brand-red outline-none rounded-sm px-3 py-2.5 text-sm text-brand-cream placeholder:text-brand-gray";

export default function CartDrawer() {
  const {
    items,
    stepItem,
    removeItem,
    clearCart,
    totalPrice,
    hayPreciosPorConfirmar,
    cartOpen,
    closeCart,
    buildWhatsAppUrl,
    datos,
    setDatos,
    despachoGratis,
    faltaParaGratis,
  } = useShop();
  const [paso, setPaso] = useState("carrito"); // "carrito" | "datos"

  const set = (campo) => (e) => setDatos((d) => ({ ...d, [campo]: e.target.value }));
  const dias = proximosDias(5);
  // Si la fecha guardada ya pasó, vuelve a "lo antes posible".
  const fechaValida = dias.some((d) => d.valor === datos.fecha) ? datos.fecha : "";
  const gratisDesde = NEGOCIO.despachoGratisDesde;
  const avance = gratisDesde ? Math.min(100, (totalPrice / gratisDesde) * 100) : 0;

  const bajoMinimo = datos.entrega === "despacho" && totalPrice < NEGOCIO.pedidoMinimo;
  const faltaNombre = !datos.nombre.trim();
  const faltaDireccion = datos.entrega === "despacho" && !datos.direccion.trim();
  const puedeEnviar = items.length > 0 && !faltaNombre && !faltaDireccion && !bajoMinimo;

  const cerrar = () => {
    closeCart();
    setPaso("carrito");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrar}
          />
          <motion.aside
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-brand-panel border-l border-brand-line z-[80] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* cabecera con pasos */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-line">
              <div className="flex items-center gap-2">
                {paso === "datos" && (
                  <button
                    onClick={() => setPaso("carrito")}
                    aria-label="Volver al carrito"
                    className="text-brand-gray hover:text-brand-red text-lg leading-none pr-1"
                  >
                    ←
                  </button>
                )}
                <h2 className="font-display text-lg">{paso === "carrito" ? "Tu carrito" : "Datos de entrega"}</h2>
              </div>
              <button
                onClick={cerrar}
                aria-label="Cerrar carrito"
                className="text-brand-gray hover:text-brand-red text-2xl leading-none px-1"
              >
                ×
              </button>
            </div>

            <div className="flex gap-1 px-5 pt-3">
              <span className={"h-1 flex-1 rounded-full " + "bg-brand-red"} />
              <span className={"h-1 flex-1 rounded-full " + (paso === "datos" ? "bg-brand-red" : "bg-brand-line")} />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {paso === "carrito" ? (
                items.length === 0 ? (
                  <p className="text-brand-gray text-sm text-center mt-10">Aún no has agregado productos.</p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-3 border-b border-brand-line pb-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-tight">{item.nombre}</p>
                          <p className="text-xs text-brand-gray mt-0.5">
                            {item.precioNum ? `${formatCLP(item.precioNum)} ${item.unidad}` : "Precio a confirmar"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => stepItem(item.id, -1)}
                              aria-label="Quitar"
                              className="w-7 h-7 rounded-full border border-brand-line flex items-center justify-center text-sm hover:border-brand-red hover:text-brand-red"
                            >
                              −
                            </button>
                            <span className="text-sm min-w-[3.5rem] text-center font-semibold">
                              {formatCantidad(item.cantidad, item.unidad)}
                            </span>
                            <button
                              onClick={() => stepItem(item.id, 1)}
                              aria-label="Agregar"
                              className="w-7 h-7 rounded-full border border-brand-line flex items-center justify-center text-sm hover:border-brand-red hover:text-brand-red"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-brand-red">
                            {item.precioNum ? formatCLP(item.precioNum * item.cantidad) : "—"}
                          </p>
                          <button onClick={() => removeItem(item.id)} className="text-xs text-brand-gray hover:text-brand-red mt-1.5">
                            Quitar
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={clearCart} className="text-xs text-brand-gray hover:text-brand-red underline underline-offset-4">
                      Vaciar carrito
                    </button>
                  </div>
                )
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <label className="block">
                    <span className="block text-xs font-semibold text-brand-cream-dim mb-1.5">Tu nombre</span>
                    <input value={datos.nombre} onChange={set("nombre")} autoComplete="name" placeholder="Ej: Carolina" className={inputCls} />
                  </label>

                  <fieldset>
                    <legend className="block text-xs font-semibold text-brand-cream-dim mb-1.5">¿Cómo lo quieres recibir?</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { v: "despacho", t: "Despacho", s: NEGOCIO.zonaDespacho },
                        { v: "retiro", t: "Retiro en local", s: "Sin costo" },
                      ].map((o) => (
                        <label
                          key={o.v}
                          className={
                            "cursor-pointer rounded-sm border px-3 py-2.5 transition-colors " +
                            (datos.entrega === o.v ? "border-brand-red bg-brand-red/10" : "border-brand-line hover:border-brand-red/60")
                          }
                        >
                          <input type="radio" name="entrega" value={o.v} checked={datos.entrega === o.v} onChange={set("entrega")} className="sr-only" />
                          <span className="block text-sm font-semibold">{o.t}</span>
                          <span className="block text-[11px] text-brand-gray">{o.s}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="block text-xs font-semibold text-brand-cream-dim mb-1.5">
                      ¿Cuándo? {NEGOCIO.despachoTodosLosDias && <span className="font-normal text-brand-gray">· despachamos todos los días</span>}
                    </legend>
                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {[{ valor: "", etiqueta: "Lo antes posible" }, ...dias].map((d) => (
                        <button
                          key={d.valor || "asap"}
                          type="button"
                          onClick={() => setDatos((x) => ({ ...x, fecha: d.valor, franja: d.valor ? x.franja : "" }))}
                          aria-pressed={fechaValida === d.valor}
                          className={
                            "shrink-0 text-xs font-semibold px-3 py-2 rounded-sm border transition-colors " +
                            (fechaValida === d.valor
                              ? "border-brand-red bg-brand-red/10 text-brand-cream"
                              : "border-brand-line text-brand-cream-dim hover:border-brand-red/60")
                          }
                        >
                          {d.etiqueta}
                        </button>
                      ))}
                    </div>
                    {fechaValida && (
                      <select value={datos.franja} onChange={set("franja")} aria-label="Horario" className={inputCls + " mt-2"}>
                        <option value="">Cualquier horario</option>
                        {NEGOCIO.franjas.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    )}
                  </fieldset>

                  {datos.entrega === "despacho" ? (
                    <label className="block">
                      <span className="block text-xs font-semibold text-brand-cream-dim mb-1.5">Dirección de despacho</span>
                      <input
                        value={datos.direccion}
                        onChange={set("direccion")}
                        autoComplete="street-address"
                        placeholder="Calle, número, depto. y sector"
                        className={inputCls}
                      />
                      <span className="block text-[11px] text-brand-gray mt-1.5">
                        {despachoGratis
                          ? "Tu pedido tiene despacho gratis."
                          : "El costo del despacho depende de la zona y se confirma por WhatsApp."}
                      </span>
                    </label>
                  ) : (
                    <p className="text-xs text-brand-cream-dim bg-brand-panel-2 border border-brand-line rounded-sm p-3">
                      Retiras en {NEGOCIO.direccion}, {NEGOCIO.comuna}. Te avisamos por WhatsApp cuando esté listo.
                    </p>
                  )}

                  <label className="block">
                    <span className="block text-xs font-semibold text-brand-cream-dim mb-1.5">Forma de pago</span>
                    <select value={datos.pago} onChange={set("pago")} className={inputCls}>
                      {FORMAS_PAGO.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="block text-xs font-semibold text-brand-cream-dim mb-1.5">
                      Indicaciones <span className="font-normal text-brand-gray">(opcional)</span>
                    </span>
                    <textarea
                      value={datos.comentario}
                      onChange={set("comentario")}
                      rows={2}
                      placeholder="Ej: churrasco cortado delgado, molida sin grasa…"
                      className={inputCls + " resize-none"}
                    />
                  </label>
                </form>
              )}
            </div>

            {/* pie con total y acción */}
            <div className="px-5 py-4 border-t border-brand-line">
              {gratisDesde > 0 && items.length > 0 && (
                <div className="mb-3.5">
                  <p className="text-xs mb-1.5">
                    {despachoGratis ? (
                      <span className="text-emerald-400 font-semibold">¡Tienes despacho gratis!</span>
                    ) : (
                      <span className="text-brand-cream-dim">
                        Te faltan <strong className="text-brand-cream">{formatCLP(faltaParaGratis)}</strong> para despacho gratis
                      </span>
                    )}
                  </p>
                  <div className="h-1.5 rounded-full bg-brand-line overflow-hidden">
                    <div
                      className={"h-full rounded-full transition-all duration-500 " + (despachoGratis ? "bg-emerald-400" : "bg-brand-red")}
                      style={{ width: avance + "%" }}
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-between text-sm mb-1">
                <span className="text-brand-cream-dim">Total estimado</span>
                <span className="font-display text-brand-red text-lg">{formatCLP(totalPrice)}</span>
              </div>
              <p className="text-[11px] text-brand-gray mb-3">
                {hayPreciosPorConfirmar ? "Hay productos con precio a confirmar. " : ""}
                El peso final puede variar levemente al cortar; se confirma por WhatsApp.
              </p>

              {paso === "carrito" ? (
                <button
                  onClick={() => setPaso("datos")}
                  disabled={items.length === 0}
                  className="block w-full text-center bg-brand-red hover:bg-red-600 disabled:bg-brand-panel-2 disabled:text-brand-gray disabled:shadow-none disabled:cursor-not-allowed text-brand-cream font-bold text-sm px-5 py-3 rounded-sm shadow-lg shadow-brand-red/30 transition-all"
                >
                  Continuar
                </button>
              ) : (
                <>
                  {(faltaNombre || faltaDireccion || bajoMinimo) && (
                    <p className="text-[11px] text-amber-400 mb-2">
                      {faltaNombre
                        ? "Escribe tu nombre para continuar."
                        : faltaDireccion
                          ? "Escribe la dirección de despacho."
                          : `El pedido mínimo para despacho es ${formatCLP(NEGOCIO.pedidoMinimo)}.`}
                    </p>
                  )}
                  <a
                    href={puedeEnviar ? buildWhatsAppUrl() : undefined}
                    target="_blank"
                    rel="noopener"
                    aria-disabled={!puedeEnviar}
                    onClick={(e) => !puedeEnviar && e.preventDefault()}
                    className={
                      "block text-center font-bold text-sm px-5 py-3 rounded-sm transition-all " +
                      (puedeEnviar
                        ? "bg-[#25D366] hover:bg-[#1ebe5a] text-black shadow-lg shadow-black/30"
                        : "bg-brand-panel-2 text-brand-gray cursor-not-allowed")
                    }
                  >
                    Enviar pedido por WhatsApp
                  </a>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
