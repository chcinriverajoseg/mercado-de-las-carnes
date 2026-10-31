import { useContext } from "react";
import { CatalogoContext } from "./catalogoContext.js";

// { categorias, todos, ofertas, total, buscar(id), fuente: "codigo" | "planilla" | "guardado" }
export function useCatalogo() {
  const ctx = useContext(CatalogoContext);
  if (!ctx) throw new Error("useCatalogo debe usarse dentro de <CatalogoProvider>");
  return ctx;
}
