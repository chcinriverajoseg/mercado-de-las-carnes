import { useEffect, useMemo, useState } from "react";
import { ShopContext } from "./shopContext.js";
import { categorias } from "../data/productos";
import { NEGOCIO, waLink } from "../data/negocio";
import { parsePrecio, formatCLP, formatCantidad, esPorKilo, PASO_KILO } from "../utils/format";

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
};

export function ShopProvider({ children }) {
  // item: { id, nombre, precioNum, unidad, cantidad }  (cantidad en kg o unidades)
  const [items, setItems] = useState(() => leer("mdc-carrito", []));
  const [datos, setDatos] = useState(() => ({ ...DATOS_VACIOS, ...leer("mdc-datos", {}) }));
  const [cartOpen, setCartOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

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

  const totalItems = items.length;
  const totalPrice = items.reduce((s, i) => s + i.precioNum * i.cantidad, 0);
  const hayPreciosPorConfirmar = items.some((i) => i.precioNum === 0);

  const buildWhatsAppUrl = () => {
    const lineas = items.map((i) => {
      const sub = i.precioNum ? formatCLP(i.precioNum * i.cantidad) : "precio a confirmar";
      return `• ${formatCantidad(i.cantidad, i.unidad)} ${i.nombre} — ${sub}`;
    });

    const entrega =
      datos.entrega === "retiro"
        ? `Retiro en el local (${NEGOCIO.direccion})`
        : `Despacho a: ${datos.direccion.trim() || "(dirección por confirmar)"}`;

    const partes = [
      `Hola, soy ${datos.nombre.trim() || "cliente"} y quiero hacer este pedido:`,
      "",
      ...lineas,
      "",
      `Total estimado: ${formatCLP(totalPrice)}${datos.entrega === "despacho" ? " + despacho" : ""}`,
      "",
      `📦 ${entrega}`,
      `💳 Pago: ${datos.pago}`,
    ];
    if (datos.comentario.trim()) partes.push(`📝 Nota: ${datos.comentario.trim()}`);

    return waLink(partes.join("\n"));
  };

  // Lista plana de todos los productos, para el panel de stock y el buscador.
  const todosLosProductos = useMemo(
    () => categorias.flatMap((cat) => cat.productos.map((p) => ({ ...p, categoria: cat.nombre, categoriaId: cat.id }))),
    []
  );

  const value = {
    items,
    addItem,
    removeItem,
    stepItem,
    clearCart,
    totalItems,
    totalPrice,
    hayPreciosPorConfirmar,
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
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
