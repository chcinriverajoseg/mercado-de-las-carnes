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
| Número de WhatsApp, dirección, horarios, zona, pedido mínimo, despacho gratis, franjas de entrega | `NEGOCIO` en `src/data/negocio.js` |
| Instagram, grupo de WhatsApp, reseñas de Google (vacío = no se muestra) | `REDES` en `src/data/negocio.js` |
| Ofertas (`oferta: true`, `precioAntes`) y usos de cada corte | `src/data/productos.js` |
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

**Después de copiar fotos nuevas, corre:**

```bash
npm run fotos
```

Convierte todas las fotos de `src/assets/productos/` a `.webp` de máximo 1000 px (una foto de celular de 4 MB queda en ~80 KB) y borra el original pesado. Puedes copiar la foto tal como sale del celular (`.jpg`, `.jpeg`, `.png`).

> `src/assets/productoss/` (con doble s) guarda fotos de prueba que **no** se publican.
> Solo se usan las de `src/assets/productos/`. Mientras un producto no tenga foto, su tarjeta muestra el ícono de la categoría.

### Stock

`stock: 0` = Agotado (no se puede agregar) · `1–6` = "Últimas unidades" · más = Disponible.

## Funcionalidades

- **Ofertas de la semana**: sección propia + etiqueta en la tarjeta. Con `precioAntes` muestra precio tachado y "Ahorras X%".
- **Filtros por preparación** (Parrilla, Horno, Olla, Sartén) y **orden** (más pedidos, precio, A–Z) en cada categoría
- **Ficha de producto** al tocar foto o nombre: usos, consejo de preparación, cantidad libre por ½ kg
- **Calculadora de asado**: adultos/niños, apetito y estilo → kilos y cortes sugeridos, carbón y empanadas opcionales, "Agregar todo al carrito"
- **Despacho gratis** sobre el monto configurado, con barra de avance en el carrito
- **Entrega programada**: lo antes posible o día específico + franja (despacho o retiro)
- **Barra superior** con despacho gratis y "Abierto ahora / Cerrado" en hora de Chile
- **Preguntas frecuentes** y footer con tienda, ayuda, horario, medios de pago y redes
- Buscador, selector ½/1/2 kg, carrito guardado, checkout en 2 pasos, mensaje de WhatsApp completo
- Orden automático: más pedidos y ofertas primero, agotados al final
- SEO local: Open Graph, datos estructurados `ButcherShop`, sitemap

---
Desarrollado por [ChacinPC](https://chacinpc.vercel.app)
