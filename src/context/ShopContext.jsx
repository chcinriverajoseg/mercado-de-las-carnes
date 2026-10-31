import { useEffect, useMemo, useState } from "react";
import { ShopContext } from "./shopContext.js";
import { useCatalogo } from "./useCatalogo";
import { NEGOCIO, waLink } from "../data/negocio";
import { parsePrecio, formatCLP, formatCantidad, esPorKilo, PASO_KILO } from "../utils/format";
import { fechaLarga, proximosDias } from "../utils/horario";

// Lectura/escritura segura en localStorage (puede fallar en modo incógnito).
function leer(clave, porDefecto) {
  try {
    const v = localStorage.getItem(clave);
    return v ? JSON.parse(v) : porDefecto;
  } catch {
    return porDefecto;
  }
}
function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* sin almacenamiento: el carrito funciona igual, solo no se recuerda */
  }
}

const DATOS_VACIOS = {
  nombre: "",
  entrega: "despacho", // "despacho" | "retiro"
  direccion: "",
  pago: "Efectivo",
  comentario: "",
  fecha: "", // "AAAA-MM-DD" (vacío = lo antes posible)
  franja: "",
};

export function ShopProvider({ children }) {
  // item: { id, nombre, precioNum, unidad, cantidad }  (cantidad en kg o unidades)
  const [items, setItems] = useState(() => leer("mdc-carrito", []));
  const { todos: todosLosProductos } = useCatalogo();

  // El carrito guardado siempre muestra el precio actual del catálogo
  // (si el dueño cambia un precio en la planilla, se refleja al tiro).
  const itemsActuales = useMemo(
    () =>
      items.map((i) => {
        const p = todosLosProductos.find((x) => x.id === i.id);
        return p ? { ...i, nombre: p.nombre, precioNum: parsePrecio(p.precio) } : i;
      }),
    [items, todosLosProductos]
  );
  const [datos, setDatos] = useState(() => ({ ...DATOS_VACIOS, ...leer("mdc-datos", {}) }));
  const [cartOpen, setCartOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [ficha, setFicha] = useState(null); // producto abierto en la ficha

  useEffect(() => guardar("mdc-carrito", items), [items]);
  useEffect(() => guardar("mdc-datos", datos), [datos]);

  // cantidad: kg (múltiplo de 0,5) para productos por kilo, unidades para el resto.
  const addItem = (producto, cantidad) => {
    if (producto.stock === 0) return; // no se agrega algo agotado
    const porKilo = esPorKilo(producto.unidad);
    const cant = cantidad ?? 1;
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id);
      if (existe) {
        return prev.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + cant } : i));
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precioNum: parsePrecio(producto.precio),
          unidad: producto.unidad,
          porKilo,
          cantidad: cant,
        },
      ];
    });
    setCartOpen(true);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  // Sube o baja un "paso": medio kilo o una unidad.
  const stepItem = (id, direccion) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;
          const paso = i.porKilo ? PASO_KILO : 1;
          return { ...i, cantidad: Math.round((i.cantidad + direccion * paso) * 10) / 10 };
        })
        .filter((i) => i.cantidad > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = itemsActuales.length;
  const totalPrice = itemsActuales.reduce((s, i) => s + i.precioNum * i.cantidad, 0);
  const hayPreciosPorConfirmar = itemsActuales.some((i) => i.precioNum === 0);

  // Despacho gratis: cuánto falta para llegar al monto.
  const gratisDesde = NEGOCIO.despachoGratisDesde || 0;
  const despachoGratis = gratisDesde > 0 && totalPrice >= gratisDesde;
  const faltaParaGratis = gratisDesde > 0 ? Math.max(0, gratisDesde - totalPrice) : 0;

  const buildWhatsAppUrl = () => {
    const lineas = itemsActuales.map((i) => {
      const sub = i.precioNum ? formatCLP(i.precioNum * i.cantidad) : "precio a confirmar";
      return `• ${formatCantidad(i.cantidad, i.unidad)} ${i.nombre} — ${sub}`;
    });

    const entrega =
      datos.entrega === "retiro"
        ? `Retiro en el local (${NEGOCIO.direccion})`
        : `Despacho a: ${datos.direccion.trim() || "(dirección por confirmar)"}`;
    const fechaOk = proximosDias(5).some((d) => d.valor === datos.fecha);
    const cuando = fechaOk ? fechaLarga(datos.fecha) + (datos.franja ? `, ${datos.franja}` : "") : "Lo antes posible";
    const costoDespacho = despachoGratis ? " · despacho GRATIS" : " + despacho";

    const partes = [
      `Hola, soy ${datos.nombre.trim() || "cliente"} y quiero hacer este pedido:`,
      "",
      ...lineas,
      "",
      `Total estimado: ${formatCLP(totalPrice)}${datos.entrega === "despacho" ? costoDespacho : ""}`,
      "",
      `📦 ${entrega}`,
      `🕒 ${datos.entrega === "retiro" ? "Retiro" : "Entrega"}: ${cuando}`,
      `💳 Pago: ${datos.pago}`,
    ];
    if (datos.comentario.trim()) partes.push(`📝 Nota: ${datos.comentario.trim()}`);

    return waLink(partes.join("\n"));
  };

  // Lista plana de todos los productos, para el panel de stock y el buscador.


  const value = {
    items: itemsActuales,
    addItem,
    removeItem,
    stepItem,
    clearCart,
    totalItems,
    totalPrice,
    hayPreciosPorConfirmar,
    despachoGratis,
    faltaParaGratis,
    buildWhatsAppUrl,
    datos,
    setDatos,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    toggleCart: () => setCartOpen((v) => !v),
    stockOpen,
    openStock: () => setStockOpen(true),
    closeStock: () => setStockOpen(false),
    toggleStock: () => setStockOpen((v) => !v),
    busqueda,
    setBusqueda,
    todosLosProductos,
    ficha,
    // Completa categoría y usos desde el catálogo, venga de donde venga el producto.
    openFicha: (producto) => setFicha(todosLosProductos.find((p) => p.id === producto.id) || producto),
    closeFicha: () => setFicha(null),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
