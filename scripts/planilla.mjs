// Genera planilla-productos.csv con todo el catálogo actual, para importarla
// a Google Sheets la primera vez.
//
// Uso:  npm run planilla
import { writeFile } from "node:fs/promises";
import { categorias } from "../src/data/productos.js";

const COLUMNAS = ["id", "categoria", "nombre", "precio", "unidad", "stock", "oferta", "precio_antes", "destacado", "mostrar", "descripcion", "usos"];

const numero = (precio) => String(precio).replace(/[^\d]/g, "") || "consultar";
const siNo = (v) => (v ? "SI" : "NO");
const celda = (v) => {
  const t = String(v ?? "");
  return /[",\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
};

const filas = [COLUMNAS];
for (const c of categorias) {
  for (const p of c.productos) {
    filas.push([
      p.id,
      c.id,
      p.nombre,
      numero(p.precio),
      String(p.unidad).replace(/^\/\s*/, ""),
      p.stock ?? 10,
      siNo(p.oferta),
      p.precioAntes ? numero(p.precioAntes) : "",
      siNo(p.destacado),
      "SI",
      p.desc,
      (p.usos || []).join(", "),
    ]);
  }
}

// BOM al inicio para que Excel/Sheets respeten tildes y ñ.
await writeFile("planilla-productos.csv", "﻿" + filas.map((f) => f.map(celda).join(",")).join("\n") + "\n");
console.log(`✔ planilla-productos.csv creada con ${filas.length - 1} productos.`);
