// Convierte las fotos de src/assets/productos/ a .webp livianas.
//
// Uso:  npm run fotos
//
// - Copia la foto tal como sale del celular (jpg, jpeg, png, webp) a src/assets/productos/
//   con el nombre del producto: "Posta rosada" -> posta-rosada.jpg
// - Este comando la achica a máximo 1000 px, la guarda como .webp y borra el original pesado.
// - Las fotos que ya están optimizadas no se tocan.
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const CARPETA = path.resolve("src/assets/productos");
const MAX = 1000; // px del lado más largo
const CALIDAD = 78;
const LIMITE_KB = 250; // un .webp bajo este peso y tamaño se considera listo

const kb = (bytes) => Math.round(bytes / 1024);

const archivos = (await readdir(CARPETA)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
if (archivos.length === 0) {
  console.log("No hay fotos en src/assets/productos/");
  process.exit(0);
}

let convertidas = 0;
for (const archivo of archivos) {
  const origen = path.join(CARPETA, archivo);
  const base = archivo.replace(/\.[^.]+$/, "").toLowerCase();
  const destino = path.join(CARPETA, base + ".webp");
  const antes = (await stat(origen)).size;
  const meta = await sharp(origen).metadata();

  const yaLista = /\.webp$/i.test(archivo) && kb(antes) <= LIMITE_KB && Math.max(meta.width, meta.height) <= MAX;
  if (yaLista) {
    console.log(`✔ ${archivo} ya está optimizada (${kb(antes)} KB)`);
    continue;
  }

  const buffer = await sharp(origen)
    .rotate() // respeta la orientación de la foto del celular
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: CALIDAD })
    .toBuffer();
  await sharp(buffer).toFile(destino);
  if (path.resolve(origen) !== path.resolve(destino)) await unlink(origen);

  convertidas++;
  console.log(`✔ ${archivo} → ${base}.webp  (${kb(antes)} KB → ${kb(buffer.length)} KB)`);
}
console.log(`\nListo: ${convertidas} foto(s) convertida(s).`);
