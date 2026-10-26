// Fotos de productos: basta con guardar la imagen en src/assets/productos/
// con el nombre del producto en minúsculas, sin tildes y con guiones.
// Ej.: "Asado de tira" -> asado-de-tira.webp   (también .jpg, .jpeg o .png)
import { normalizar } from "./format";

const archivos = import.meta.glob("../assets/productos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export function slug(texto) {
  return normalizar(texto)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const porNombre = {};
for (const ruta in archivos) {
  const nombre = ruta.split("/").pop().replace(/\.[^.]+$/, "");
  porNombre[nombre] = archivos[ruta];
}

// Devuelve la URL de la foto del producto o null si aún no existe.
export function fotoProducto(nombre) {
  return porNombre[slug(nombre)] || null;
}
