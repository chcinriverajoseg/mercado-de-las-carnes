// Catálogo completo de Mercado de las Carnes, organizado por categoría.
// Precios referenciales — ajusta los valores según tu lista real.
// "destacado: true" muestra un badge "Más pedido" en la card.
// "stock" es de ejemplo (mock) mientras no haya un inventario real conectado —
// ajústalo a mano o reemplázalo por datos reales cuando exista un backend.

export const categorias = [
  {
    id: "vacuno",
    nombre: "Cortes de Vacuno",
    descripcion: "Los clásicos de la carnicería chilena, seleccionados a diario.",
    productos: [
      { id: "v1", nombre: "Asado de tira", desc: "Ideal para la parrilla, con hueso.", precio: "$6.990", unidad: "/ kilo", destacado: true, stock: 18 },
      { id: "v2", nombre: "Lomo vetado", desc: "Jugoso, con la veta justa de grasa.", precio: "$9.490", unidad: "/ kilo", stock: 24 },
      { id: "v3", nombre: "Lomo liso", desc: "Magro y tierno, perfecto a la plancha.", precio: "$8.290", unidad: "/ kilo", stock: 15 },
      { id: "v4", nombre: "Filete", desc: "El corte más suave, para ocasiones especiales.", precio: "$12.990", unidad: "/ kilo", stock: 6 },
      { id: "v5", nombre: "Punta paleta", desc: "Rendidor, ideal para al jugo o guisos.", precio: "$6.290", unidad: "/ kilo", stock: 30 },
      { id: "v6", nombre: "Posta rosada", desc: "Sin grasa, para bistec o al horno.", precio: "$7.490", unidad: "/ kilo", stock: 20 },
      { id: "v7", nombre: "Plateada", desc: "Perfecta para cocción lenta y guisos.", precio: "$6.890", unidad: "/ kilo", stock: 12 },
      { id: "v8", nombre: "Malaya", desc: "Especialidad de la casa, al jugo o a la plancha.", precio: "$7.990", unidad: "/ kilo", destacado: true, stock: 4 },
    ],
  },
  {
    id: "cerdo",
    nombre: "Cerdo",
    descripcion: "Cortes frescos de cerdo, listos para hornear, freír o a la parrilla.",
    productos: [
      { id: "c1", nombre: "Costillar de cerdo", desc: "Perfecto para ahumar o dorar al horno.", precio: "$5.490", unidad: "/ kilo", destacado: true, stock: 10 },
      { id: "c2", nombre: "Chuleta de cerdo", desc: "Clásica, rápida para el día a día.", precio: "$5.990", unidad: "/ kilo", stock: 25 },
      { id: "c3", nombre: "Pulpa de cerdo", desc: "Magra y versátil, para saltados o asados.", precio: "$6.490", unidad: "/ kilo", stock: 16 },
      { id: "c4", nombre: "Panceta", desc: "Con la grasa justa, ideal para freír.", precio: "$4.990", unidad: "/ kilo", stock: 0 },
      { id: "c5", nombre: "Pernil", desc: "Para hornear entero o en trozos.", precio: "$4.790", unidad: "/ kilo", stock: 8 },
      { id: "c6", nombre: "Longaniza de cerdo", desc: "Receta de la casa, lista para la parrilla.", precio: "$4.990", unidad: "/ kilo", stock: 22 },
    ],
  },
  {
    id: "pollo",
    nombre: "Pollo",
    descripcion: "Pollo fresco del día, sin congelar.",
    productos: [
      { id: "p1", nombre: "Pollo entero", desc: "Fresco, listo para hornear.", precio: "$3.790", unidad: "/ kilo", destacado: true, stock: 35 },
      { id: "p2", nombre: "Pechuga de pollo", desc: "Sin hueso, ideal para saltados.", precio: "$4.990", unidad: "/ kilo", stock: 28 },
      { id: "p3", nombre: "Trutro entero", desc: "Jugoso, para el horno o la olla.", precio: "$3.590", unidad: "/ kilo", stock: 20 },
      { id: "p4", nombre: "Alitas de pollo", desc: "Perfectas para picoteo o parrilla.", precio: "$3.290", unidad: "/ kilo", stock: 3 },
      { id: "p5", nombre: "Higados de pollo", desc: "Frescos, para paté o salteados.", precio: "$2.490", unidad: "/ kilo", stock: 14 },
    ],
  },
  {
    id: "fiambreria",
    nombre: "Fiambrería",
    descripcion: "Cecinas y quesos seleccionados para el día a día.",
    productos: [
      { id: "f1", nombre: "Jamón de pierna", desc: "Corte fino, para sándwiches y picoteo.", precio: "$7.990", unidad: "/ kilo", stock: 12 },
      { id: "f2", nombre: "Jamón serrano", desc: "Curado, sabor intenso.", precio: "$14.990", unidad: "/ kilo", destacado: true, stock: 5 },
      { id: "f3", nombre: "Mortadela", desc: "Clásica, ideal para el colegio o el trabajo.", precio: "$4.490", unidad: "/ kilo", stock: 20 },
      { id: "f4", nombre: "Salame", desc: "Curado, perfecto para tablas.", precio: "$8.990", unidad: "/ kilo", stock: 9 },
      { id: "f5", nombre: "Queso mantecoso", desc: "Suave y cremoso.", precio: "$7.490", unidad: "/ kilo", stock: 0 },
      { id: "f6", nombre: "Vienesas", desc: "Para el completo de siempre.", precio: "$3.990", unidad: "/ paquete", stock: 40 },
    ],
  },
  {
    id: "abarrotes",
    nombre: "Abarrotes",
    descripcion: "Lo básico para completar tu compra, sin salir del barrio.",
    productos: [
      { id: "a1", nombre: "Arroz grado 1", desc: "Bolsa de 1 kilo.", precio: "$1.290", unidad: "/ unidad", stock: 50 },
      { id: "a2", nombre: "Aceite vegetal", desc: "Botella de 1 litro.", precio: "$2.990", unidad: "/ unidad", stock: 33 },
      { id: "a3", nombre: "Carbón para asado", desc: "Bolsa de 4 kilos.", precio: "$4.990", unidad: "/ bolsa", destacado: true, stock: 27 },
      { id: "a4", nombre: "Condimentos para carne", desc: "Sazonador especial parrillero.", precio: "$1.990", unidad: "/ unidad", stock: 45 },
      { id: "a5", nombre: "Bebida gaseosa 1.5L", desc: "Varios sabores disponibles.", precio: "$1.790", unidad: "/ unidad", stock: 60 },
    ],
  },
  {
    id: "empanadas",
    nombre: "Empanadas",
    descripcion: "Hechas en el local, para llevar o encargar por docena.",
    productos: [
      { id: "e1", nombre: "Empanada de pino", desc: "La clásica chilena.", precio: "$1.590", unidad: "/ unidad", destacado: true, stock: 24 },
      { id: "e2", nombre: "Empanada de queso", desc: "Frita o al horno.", precio: "$1.390", unidad: "/ unidad", stock: 18 },
      { id: "e3", nombre: "Empanada camarón queso", desc: "Nuestra especialidad.", precio: "$2.490", unidad: "/ unidad", stock: 2 },
      { id: "e4", nombre: "Empanada napolitana", desc: "Jamón, queso y tomate.", precio: "$1.890", unidad: "/ unidad", stock: 16 },
    ],
  },
];
