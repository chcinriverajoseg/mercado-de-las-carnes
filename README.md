# Mercado de las Carnes — sitio web

Catálogo online de la carnicería Mercado de las Carnes (Concón). El cliente arma su pedido
(con peso por kilo), completa sus datos de entrega y lo envía por WhatsApp.

**Producción:** https://mercado-de-las-carnes.vercel.app
**Stack:** React 19 · Vite · Tailwind CSS v4 · Framer Motion · deploy en Vercel

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run lint
```

## Qué editar y dónde

| Quiero cambiar…                         | Archivo                               |
| --------------------------------------- | ------------------------------------- |
| Número de WhatsApp, dirección, horarios, zona y pedido mínimo | `src/data/negocio.js` |
| Productos, precios, stock, "Más pedido" | `src/data/productos.js`               |
| Corte de la semana                      | `CORTE_SEMANA` en `src/data/productos.js` |
| Formas de pago del checkout             | `FORMAS_PAGO` en `src/data/negocio.js` |
| Colores y tipografías                   | `src/index.css`                        |

### Fotos de productos

Guardar la foto en `src/assets/productos/` con el nombre del producto en minúsculas,
sin tildes y con guiones. Se asigna sola:

- "Asado de tira" → `asado-de-tira.webp`
- "Lomo vetado" → `lomo-vetado.jpg`
- Foto especial para el corte de la semana → `corte-de-la-semana.webp`

Formato recomendado: `.webp`, ~800 px de ancho, fondo blanco.

> `src/assets/productoss/` (con doble s) guarda fotos de prueba que **no** se publican.
> Solo se usan las de `src/assets/productos/`. Mientras un producto no tenga foto, su tarjeta muestra el ícono de la categoría.

### Stock

`stock: 0` = Agotado (no se puede agregar) · `1–6` = "Últimas unidades" · más = Disponible.

## Funcionalidades

- Catálogo por categorías con "Ver todos", orden automático (más pedidos primero, agotados al final)
- Buscador de productos (sin tildes, varias palabras)
- Selector de peso ½ / 1 / 2 kg en productos por kilo; carrito en pasos de ½ kg
- Carrito que se guarda en el navegador
- Checkout en 2 pasos: carrito → datos (nombre, despacho/retiro, dirección, pago, indicaciones)
- Pedido mínimo para despacho
- Mensaje de WhatsApp con el pedido completo y formateado
- Barra "Ver carrito" fija en celular
- SEO local: Open Graph (vista previa al compartir), datos estructurados `ButcherShop`, sitemap

---
Desarrollado por [ChacinPC](https://chacinpc.vercel.app)
