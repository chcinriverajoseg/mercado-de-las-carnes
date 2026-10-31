// Catálogo editable desde una planilla de Google.
//
// El dueño cambia precios, stock y ofertas en la planilla y el sitio los toma
// solo (Google tarda ~5 minutos en publicar los cambios). Si la planilla no
// está configurada o falla, se usa el catálogo de productos.js tal cual.
//
// Columnas de la planilla (la primera fila son los títulos, en cualquier orden):
//   id | categoria | nombre | precio | unidad | stock | oferta | precio_antes | destacado | mostrar | descripcion | usos
//
// - id:           no cambiarlo. Para un producto nuevo, inventa uno que no exista (ej: v50).
// - categoria:    vacuno, cerdo, pollo, fiambreria, abarrotes o empanadas (solo para productos nuevos).
// - precio:       13998, $13.998 o "consultar".
// - stock:        número. 0 = agotado.
// - oferta, destacado, mostrar: SI / NO. (mostrar = NO oculta el producto del sitio)
// - usos:         parrilla, horno, olla, sarten (separados por coma).
// Las celdas vacías mantienen el valor de productos.js.

import { categorias as BASE } from "./productos";
import { parsePrecio, formatCLP, normalizar } from "../utils/format";

// Convierte texto CSV en una lista de filas (soporta comillas y comas dentro de celdas).
export function parseCSV(texto) {
  texto = String(texto).replace(/^\uFEFF/, "");
  const filas = [];
  let fila = [];
  let celda = "";
  let enComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (enComillas) {
      if (c === '"' && texto[i + 1] === '"') {
        celda += '"';
        i++;
      } else if (c === '"') enComillas = false;
      else celda += c;
    } else if (c === '"') enComillas = true;
    else if (c === ",") {
      fila.push(celda);
      celda = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(celda);
      filas.push(fila);
      fila = [];
      celda = "";
    } else celda += c;
  }
  if (celda !== "" || fila.length) {
    fila.push(celda);
    filas.push(fila);
  }
  return filas.filter((f) => f.some((c) => c.trim() !== ""));
}

const clave = (t) => normalizar(t).trim().replace(/\s+/g, "_");
const siNo = (v) => {
  const t = normalizar(v).trim();
  if (["si", "s", "x", "1", "true", "verdadero"].includes(t)) return true;
  if (["no", "n", "0", "false", "falso"].includes(t)) return false;
  return undefined;
};

function precioTexto(v) {
  const t = String(v).trim();
  if (!t) return undefined;
  if (normalizar(t).startsWith("consult")) return "Consultar";
  const n = parsePrecio(t);
  return n > 0 ? formatCLP(n) : "Consultar";
}

function unidadTexto(v) {
  const t = normalizar(v).trim();
  if (!t) return undefined;
  if (t.includes("kilo") || t === "kg") return "/ kilo";
  return t.startsWith("/") ? t : "/ " + t;
}

// Aplica las filas de la planilla sobre el catálogo base y devuelve un catálogo nuevo.
export function aplicarPlanilla(filas, base = BASE) {
  if (!filas || filas.length < 2) return base;
  const titulos = filas[0].map(clave);
  const col = (fila, nombre) => {
    const i = titulos.indexOf(nombre);
    return i >= 0 ? (fila[i] ?? "").trim() : "";
  };
  if (!titulos.includes("id")) return base;

  const cats = base.map((c) => ({ ...c, productos: c.productos.map((p) => ({ ...p })) }));
  const porId = new Map();
  cats.forEach((c) => c.productos.forEach((p) => porId.set(p.id, { p, c })));

  for (const fila of filas.slice(1)) {
    const id = col(fila, "id");
    if (!id) continue;
    let actual = porId.get(id);

    // Producto nuevo: necesita al menos nombre y una categoría válida.
    if (!actual) {
      const cat = cats.find((c) => c.id === normalizar(col(fila, "categoria")).trim());
      const nombre = col(fila, "nombre");
      if (!cat || !nombre) continue;
      const nuevo = { id, nombre, desc: "", precio: "Consultar", unidad: "/ kilo", stock: 10 };
      cat.productos.push(nuevo);
      actual = { p: nuevo, c: cat };
      porId.set(id, actual);
    }

    const p = actual.p;
    const nombre = col(fila, "nombre");
    if (nombre) p.nombre = nombre;
    const desc = col(fila, "descripcion");
    if (desc) p.desc = desc;
    const precio = precioTexto(col(fila, "precio"));
    if (precio) p.precio = precio;
    const unidad = unidadTexto(col(fila, "unidad"));
    if (unidad) p.unidad = unidad;
    const stock = col(fila, "stock");
    if (stock !== "") p.stock = Math.max(0, parseInt(stock.replace(/[^\d-]/g, ""), 10) || 0);
    const oferta = siNo(col(fila, "oferta"));
    if (oferta !== undefined) p.oferta = oferta;
    const antes = col(fila, "precio_antes");
    if (antes) p.precioAntes = parsePrecio(antes) ? formatCLP(parsePrecio(antes)) : "";
    const destacado = siNo(col(fila, "destacado"));
    if (destacado !== undefined) p.destacado = destacado;
    const mostrar = siNo(col(fila, "mostrar"));
    if (mostrar !== undefined) p.oculto = !mostrar;
    const usos = col(fila, "usos");
    if (usos) p.usos = normalizar(usos).split(/[,;\s]+/).filter((u) => ["parrilla", "horno", "olla", "sarten"].includes(u));
  }

  return cats.map((c) => ({ ...c, productos: c.productos.filter((p) => !p.oculto) }));
}

// Funciones derivadas del catálogo (sirven tanto para el base como para el de la planilla).
export function derivar(categorias) {
  const todos = categorias.flatMap((c) => c.productos.map((p) => ({ ...p, categoria: c.nombre, categoriaId: c.id })));
  const porId = new Map(todos.map((p) => [p.id, p]));
  return {
    categorias,
    todos,
    ofertas: todos.filter((p) => p.oferta),
    total: todos.length,
    buscar: (id) => porId.get(id) || null,
  };
}
