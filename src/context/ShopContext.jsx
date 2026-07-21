import { useMemo, useState } from "react";
import { ShopContext } from "./shopContext.js";
import { categorias } from "../data/productos";
import { WHATSAPP_NUMBER } from "../data/cortes";
import { parsePrecio, formatCLP } from "../utils/format";


export function ShopProvider({ children }) {
  const [items, setItems] = useState([]); // { id, nombre, precioNum, unidad, cantidad }
  const [cartOpen, setCartOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  const addItem = (producto) => {
    if (producto.stock === 0) return; // no se agrega algo agotado
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precioNum: parsePrecio(producto.precio),
          unidad: producto.unidad,
          cantidad: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, cantidad) => {
    if (cantidad <= 0) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.cantidad, 0);
  const totalPrice = items.reduce((s, i) => s + i.precioNum * i.cantidad, 0);

  const buildWhatsAppUrl = () => {
    const lineas = items.map(
      (i) => `• ${i.cantidad}x ${i.nombre} — ${formatCLP(i.precioNum * i.cantidad)}`
    );
    const texto =
      "Hola, quiero hacer este pedido:\n\n" +
      lineas.join("\n") +
      `\n\nTotal estimado: ${formatCLP(totalPrice)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  };

  // Lista plana de todos los productos, para el panel de stock general.
  const todosLosProductos = useMemo(
    () =>
      categorias.flatMap((cat) =>
        cat.productos.map((p) => ({ ...p, categoria: cat.nombre }))
      ),
    []
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalItems,
    totalPrice,
    buildWhatsAppUrl,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    toggleCart: () => setCartOpen((v) => !v),
    stockOpen,
    openStock: () => setStockOpen(true),
    closeStock: () => setStockOpen(false),
    toggleStock: () => setStockOpen((v) => !v),
    todosLosProductos,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
