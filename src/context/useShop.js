import { useContext } from "react";
import { ShopContext } from "./shopContext.js";

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop debe usarse dentro de <ShopProvider>");
  return ctx;
}
