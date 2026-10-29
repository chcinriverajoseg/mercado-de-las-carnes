// Catálogo completo de Mercado de las Carnes, organizado por categoría.
// Precios referenciales — ajusta los valores según tu lista real.
// "destacado: true" muestra un badge "Más pedido" en la card.
// "oferta: true" lo muestra en "Ofertas de la semana". Si pones "precioAntes"
//   (ej: "$20.998"), se ve el precio anterior tachado y el % de ahorro.
// "usos": para qué sirve el corte → "parrilla", "horno", "olla", "sarten".
//   Se usan para los filtros de cada categoría y la calculadora de asado.
// "stock" es referencial: 0 = agotado, 1 a 6 = "Últimas unidades", más = disponible.
// Ajústalo a mano o reemplázalo por datos reales cuando exista un backend.
// Fotos: ver src/utils/fotos.js (se asignan solas por nombre de archivo).

export const categorias = [
  {
    id: "vacuno",
    nombre: "Cortes de Vacuno",
    descripcion: "Los clásicos de la carnicería chilena, seleccionados a diario.",
    productos: [
      { id: "v1", nombre: "Abastero", desc: "Corte con nervio y mucho sabor que se ablanda con cocción lenta. Ideal para guisos, cazuelas y carne mechada.", precio: "Consultar", unidad: "/ kilo", stock: 0, usos: ["olla", "horno"] },
      { id: "v2", nombre: "Asado carnicero", desc: "Corte jugoso y rendidor del cuarto delantero. Muy bueno al horno o a la olla.", precio: "Consultar", unidad: "/ kilo", stock: 0, usos: ["olla", "horno"] },
      { id: "v3", nombre: "Asado de tira", desc: "Costillas en tiras, con hueso y grasa que le dan todo el sabor. El clásico de la parrilla.", precio: "$11.998", unidad: "/ kilo", destacado: true, stock: 10, usos: ["parrilla", "horno"] },
      { id: "v4", nombre: "Asiento", desc: "Corte magro y tierno de la pierna. Perfecto para bistec, escalopas o al horno.", precio: "$15.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "horno"] },
      { id: "v5", nombre: "Cazuela de vacuno", desc: "Trozos con hueso para cazuela, caldos y sopas con harto sabor.", precio: "$7.998", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "v6", nombre: "Choclillo", desc: "Corte magro y alargado. Muy usado para carne mechada, al horno o en guisos.", precio: "$11.998", unidad: "/ kilo", stock: 10, usos: ["horno", "olla"] },
      { id: "v7", nombre: "Chunchul", desc: "Crujiente y dorado a la parrilla. Infaltable en el asado chileno.", precio: "$5.998", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "v8", nombre: "Churrasco de vacuno", desc: "Láminas delgadas para el sándwich o la plancha. Se cocinan en minutos.", precio: "$9.998", unidad: "/ kilo", stock: 10, usos: ["sarten"] },
      { id: "v9", nombre: "Cola de vacuno / coluda", desc: "Muy sabrosa y gelatinosa, ideal para guisos y caldos de cocción larga.", precio: "Consultar", unidad: "/ kilo", stock: 0, usos: ["olla"] },
      { id: "v10", nombre: "Entraña", desc: "Corte fino, jugoso y de sabor intenso. Va directo a la parrilla, a fuego fuerte.", precio: "$23.998", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "v11", nombre: "Entrecot", desc: "Corte del lomo con su veta de grasa: tierno y sabroso para parrilla o sartén.", precio: "Consultar", unidad: "/ kilo", stock: 0, usos: ["parrilla", "sarten"] },
      { id: "v12", nombre: "Filete", desc: "El corte más tierno del vacuno. Entero al horno, en medallones o a la plancha.", precio: "$23.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "parrilla", "horno"] },
      { id: "v13", nombre: "Filete medallón", desc: "Filete cortado en medallones gruesos, listos para sellar en sartén o parrilla.", precio: "$17.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "parrilla"] },
      { id: "v14", nombre: "Filete porcionado", desc: "Filete en porciones listas para cocinar a la plancha.", precio: "$16.998", unidad: "/ kilo", stock: 10, usos: ["sarten"] },
      { id: "v15", nombre: "Flat iron", desc: "Corte tierno y muy sabroso de la paleta. Excelente a la parrilla o a la plancha, término medio.", precio: "$15.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "sarten"], oferta: true, precioAntes: "" },
      { id: "v16", nombre: "Grasa de vacuno", desc: "Grasa de vacuno para cocinar y dar sabor a tus preparaciones.", precio: "$1.200", unidad: "/ kilo", stock: 10  },
      { id: "v17", nombre: "Guata callo", desc: "Guata limpia, lista para preparar guatitas a la jardinera o a la española.", precio: "$5.998", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "v18", nombre: "Hamburguesa 100 g", desc: "Hamburguesa de vacuno de 100 g, lista para la parrilla o el sartén.", precio: "$1.998", unidad: "/ unidad", stock: 10, usos: ["parrilla", "sarten"] },
      { id: "v19", nombre: "Hamburguesa 150 g", desc: "Hamburguesa de vacuno de 150 g, lista para la parrilla o el sartén.", precio: "$1.498", unidad: "/ unidad", stock: 10, usos: ["parrilla", "sarten"] },
      { id: "v20", nombre: "Hamburguesa 200 g", desc: "Hamburguesa de vacuno de 200 g, lista para la parrilla o el sartén.", precio: "$1.998", unidad: "/ unidad", stock: 10, usos: ["parrilla", "sarten"] },
      { id: "v21", nombre: "Hígado", desc: "Hígado fresco, encebollado o a la plancha a fuego rápido.", precio: "$5.998", unidad: "/ kilo", stock: 10, usos: ["sarten"] },
      { id: "v22", nombre: "Huachalomo", desc: "Corte con veta de grasa y mucho sabor. En cortes delgados a la parrilla o a la olla.", precio: "$12.498", unidad: "/ kilo", stock: 10, usos: ["olla", "parrilla"] },
      { id: "v23", nombre: "Hueso carnudo", desc: "Hueso con carne para caldos, cazuelas y consomés con cuerpo.", precio: "$5.598", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "v24", nombre: "Lengua", desc: "Se cocina lento y queda muy suave. Ideal para lengua nogada o en salsa.", precio: "$9.998", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "v25", nombre: "Lomo liso", desc: "Corte magro y tierno, con su capa de grasa en el borde. Clásico para parrilla y bistec.", precio: "$15.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "sarten"], oferta: true, precioAntes: "" },
      { id: "v26", nombre: "Lomo vetado", desc: "Tierno y con vetas de grasa que lo hacen muy jugoso. Uno de los favoritos para la parrilla.", precio: "$18.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "sarten"], oferta: true, precioAntes: "" },
      { id: "v27", nombre: "Molida corriente", desc: "Carne molida para pino, salsas, lasañas y pastel de choclo.", precio: "$7.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "olla"] },
      { id: "v28", nombre: "Molida especial", desc: "Molida más magra, ideal para hamburguesas caseras, albóndigas y pino.", precio: "$11.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "olla"] },
      { id: "v29", nombre: "Molleja", desc: "Crujiente por fuera y suave por dentro: un manjar de la parrilla.", precio: "$11.998", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "v30", nombre: "Osobuco", desc: "Corte con hueso y médula, perfecto para guisos y cocciones largas.", precio: "$12.498", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "v31", nombre: "Palanca", desc: "Corte fino y sabroso, muy apreciado para la parrilla.", precio: "$12.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "sarten"] },
      { id: "v32", nombre: "Patas de vacuno", desc: "Para caldos y preparaciones tradicionales de cocción larga.", precio: "$6.498", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "v33", nombre: "Plateada", desc: "Corte con capa de grasa que lo mantiene jugoso. El clásico para plateada al horno o a la olla.", precio: "$11.998", unidad: "/ kilo", stock: 10, usos: ["olla", "horno"] },
      { id: "v34", nombre: "Pollo barriga", desc: "Corte jugoso y sabroso, ideal para la parrilla o al horno.", precio: "$19.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "horno"] },
      { id: "v35", nombre: "Pollo ganso", desc: "Corte magro y alargado, perfecto para mechar o al horno.", precio: "$12.498", unidad: "/ kilo", stock: 10, usos: ["horno", "olla"] },
      { id: "v36", nombre: "Posta negra", desc: "Corte magro y rendidor de la pierna. Para bistec, milanesas o al horno.", precio: "$13.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "horno"] },
      { id: "v44", nombre: "Posta rosada", desc: "Corte magro y tierno de la pierna. Ideal para bistec, escalopas y milanesas.", precio: "$13.998", unidad: "/ kilo", stock: 10, usos: ["sarten", "horno"] },
      { id: "v37", nombre: "Punta ganso", desc: "Corte jugoso con su capa de grasa. Excelente a la parrilla o al horno.", precio: "$21.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "horno"] },
      { id: "v38", nombre: "Punta picana", desc: "Corte triangular con su grasa, muy sabroso. Ideal entero a la parrilla o al horno.", precio: "$13.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "horno"] },
      { id: "v39", nombre: "Sobrecostilla", desc: "Corte con veta y mucho sabor: a la parrilla o en cocciones lentas.", precio: "$12.498", unidad: "/ kilo", stock: 10, usos: ["parrilla", "olla"] },
      { id: "v40", nombre: "Tapabarriga", desc: "Corte delgado y sabroso, de fibra marcada. Va directo a la parrilla.", precio: "$17.998", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "v41", nombre: "Tapapecho", desc: "Corte con grasa que se ablanda con cocción lenta. Ideal para la olla y al horno.", precio: "$10.998", unidad: "/ kilo", stock: 10, usos: ["olla", "horno"] },
      { id: "v42", nombre: "Tomahawk", desc: "Costilla con hueso largo y lomo vetado: un corte de lujo para la parrilla.", precio: "Consultar", unidad: "/ kilo", stock: 0, usos: ["parrilla"] },
      { id: "v43", nombre: "Caja de churrasco de vacuno", desc: "Caja de 5 kg, ideal para congelar.", precio: "$44.998", unidad: "/ caja 5 kg", stock: 10, usos: ["sarten"] },
    ],
  },
  {
    id: "cerdo",
    nombre: "Cerdo",
    descripcion: "Cortes frescos de cerdo, listos para hornear, freír o a la parrilla.",
    productos: [
      { id: "c1", nombre: "Arrollado huaso", desc: "Arrollado tradicional, listo para servir en sándwich o como plato frío.", precio: "$11.998", unidad: "/ kilo", stock: 10  },
      { id: "c2", nombre: "Chicharrón", desc: "Para freír hasta que quede bien crujiente.", precio: "$9.998", unidad: "/ kilo", stock: 10, usos: ["sarten"] },
      { id: "c3", nombre: "Chuleta de centro", desc: "Chuleta con hueso, jugosa a la plancha o a la parrilla.", precio: "$5.298", unidad: "/ kilo", stock: 10, usos: ["sarten", "parrilla"] },
      { id: "c4", nombre: "Chuleta parrillera", desc: "Chuleta gruesa pensada para la parrilla.", precio: "$5.298", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "c5", nombre: "Costillar", desc: "Costillar de cerdo para la parrilla o al horno, el favorito del asado.", precio: "$7.498", unidad: "/ kilo", destacado: true, stock: 10, usos: ["parrilla", "horno"] },
      { id: "c6", nombre: "Costillas baby ribs", desc: "Costillitas tiernas, ideales al horno con salsa barbecue o a la parrilla.", precio: "$6.498", unidad: "/ kilo", stock: 10, usos: ["horno", "parrilla"] },
      { id: "c7", nombre: "Grasa de cerdo", desc: "Grasa de cerdo para cocinar y freír.", precio: "$3.598", unidad: "/ kilo", stock: 10  },
      { id: "c8", nombre: "Longaniza", desc: "Longaniza para la parrilla, infaltable en el asado chileno.", precio: "$7.998", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "c9", nombre: "Lomo centro", desc: "Corte magro y tierno, para asar entero al horno o en chuletitas al sartén.", precio: "$6.998", unidad: "/ kilo", stock: 10, usos: ["horno", "sarten"] },
      { id: "c10", nombre: "Malaya", desc: "Corte delgado con grasa, ideal arrollado al horno o a la parrilla.", precio: "$9.998", unidad: "/ kilo", stock: 10, usos: ["parrilla", "horno"] },
      { id: "c11", nombre: "Patita de cerdo", desc: "Para cocinar a la olla, en caldos o preparaciones tradicionales.", precio: "$3.798", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "c12", nombre: "Pernil", desc: "Pernil con hueso, muy rendidor al horno o a la olla.", precio: "$3.798", unidad: "/ kilo", stock: 10, usos: ["horno", "olla"] },
      { id: "c13", nombre: "Pernil cocido", desc: "Pernil listo para servir, ideal en sándwich.", precio: "$8.998", unidad: "/ kilo", stock: 10  },
      { id: "c14", nombre: "Prieta", desc: "Prieta para la parrilla, clásica del asado.", precio: "$7.498", unidad: "/ kilo", stock: 10, usos: ["parrilla"] },
      { id: "c15", nombre: "Pulpa", desc: "Corte magro sin hueso, para el horno o en trozos al sartén.", precio: "$5.998", unidad: "/ kilo", stock: 10, usos: ["horno", "sarten"] },
      { id: "c16", nombre: "Queso cabeza", desc: "Fiambre tradicional de cerdo, para sándwich o tabla.", precio: "$7.998", unidad: "/ kilo", stock: 10  },
      { id: "c17", nombre: "Tocino ahumado", desc: "Tocino ahumado para dorar en sartén y dar sabor.", precio: "$13.498", unidad: "/ kilo", stock: 10, usos: ["sarten"] },
    ],
  },
  {
    id: "pollo",
    nombre: "Pollo",
    descripcion: "Pollo fresco del día, sin congelar.",
    productos: [
      { id: "p1", nombre: "Panita", desc: "Hígado de pollo para saltear o preparar paté casero.", precio: "$2.298", unidad: "/ kilo", stock: 10, usos: ["sarten"] },
      { id: "p2", nombre: "Patita de pollo", desc: "Para caldos y sopas.", precio: "$1.698", unidad: "/ kilo", stock: 10, usos: ["olla"] },
      { id: "p3", nombre: "Pechuga deshuesada", desc: "Pechuga sin hueso ni piel, para la plancha, milanesa o el horno.", precio: "$5.498", unidad: "/ kilo", destacado: true, stock: 10, usos: ["sarten", "horno", "parrilla"] },
      { id: "p4", nombre: "Pechuga deshuesada (oferta +10 kg)", desc: "Precio especial al comprar 10 kg o más.", precio: "$4.798", unidad: "/ kilo", stock: 10, usos: ["sarten", "horno", "parrilla"] },
      { id: "p5", nombre: "Pechuga entera", desc: "Pechuga con hueso, para hornear o cocer.", precio: "$4.998", unidad: "/ kilo", stock: 10, usos: ["horno", "sarten"] },
      { id: "p6", nombre: "Pollo entero", desc: "Pollo entero, listo para hornear.", precio: "Consultar", unidad: "/ kilo", stock: 0, usos: ["horno"] },
      { id: "p7", nombre: "Trutro alas", desc: "Alitas para el horno o la parrilla.", precio: "$4.480", unidad: "/ kilo", stock: 10, usos: ["horno", "parrilla"] },
      { id: "p8", nombre: "Trutro cuarto", desc: "Trutro con muslo y contra, rendidor al horno o en cazuela.", precio: "$2.998", unidad: "/ kilo", stock: 10, usos: ["horno", "parrilla", "olla"] },
      { id: "p9", nombre: "Trutro entero", desc: "Trutro completo, ideal al horno, a la parrilla o en cazuela.", precio: "$2.898", unidad: "/ kilo", stock: 10, usos: ["horno", "parrilla", "olla"] },
    ],
  },
  {
    id: "fiambreria",
    nombre: "Fiambrería",
    descripcion: "Cecinas y quesos seleccionados para el día a día.",
    productos: [
      { id: "f1", nombre: "Jamón de pierna", desc: "Corte fino, para sándwiches y picoteo.", precio: "$7.990", unidad: "/ kilo", stock: 12  },
      { id: "f2", nombre: "Jamón serrano", desc: "Curado, sabor intenso.", precio: "$14.990", unidad: "/ kilo", destacado: true, stock: 5  },
      { id: "f3", nombre: "Mortadela", desc: "Clásica, ideal para el colegio o el trabajo.", precio: "$4.490", unidad: "/ kilo", stock: 20  },
      { id: "f4", nombre: "Salame", desc: "Curado, perfecto para tablas.", precio: "$8.990", unidad: "/ kilo", stock: 9  },
      { id: "f5", nombre: "Queso mantecoso", desc: "Suave y cremoso.", precio: "$7.490", unidad: "/ kilo", stock: 0  },
      { id: "f6", nombre: "Vienesas", desc: "Para el completo de siempre.", precio: "$3.990", unidad: "/ paquete", stock: 40  },
    ],
  },
  {
    id: "abarrotes",
    nombre: "Abarrotes",
    descripcion: "Lo básico para completar tu compra, sin salir del barrio.",
    productos: [
      { id: "a1", nombre: "Arroz grado 1", desc: "Bolsa de 1 kilo.", precio: "$1.290", unidad: "/ unidad", stock: 50  },
      { id: "a2", nombre: "Aceite vegetal", desc: "Botella de 1 litro.", precio: "$2.990", unidad: "/ unidad", stock: 33  },
      { id: "a3", nombre: "Carbón para asado", desc: "Bolsa de 4 kilos.", precio: "$4.990", unidad: "/ bolsa", destacado: true, stock: 27  },
      { id: "a4", nombre: "Condimentos para carne", desc: "Sazonador especial parrillero.", precio: "$1.990", unidad: "/ unidad", stock: 45  },
      { id: "a5", nombre: "Bebida gaseosa 1.5L", desc: "Varios sabores disponibles.", precio: "$1.790", unidad: "/ unidad", stock: 60  },
    ],
  },
  {
    id: "empanadas",
    nombre: "Empanadas",
    descripcion: "Hechas en el local, para llevar o encargar por docena.",
    productos: [
      { id: "e1", nombre: "Empanada de pino", desc: "La clásica chilena.", precio: "$1.590", unidad: "/ unidad", destacado: true, stock: 24  },
      { id: "e2", nombre: "Empanada de queso", desc: "Frita o al horno.", precio: "$1.390", unidad: "/ unidad", stock: 18  },
      { id: "e3", nombre: "Empanada camarón queso", desc: "Nuestra especialidad.", precio: "$2.490", unidad: "/ unidad", stock: 2  },
      { id: "e4", nombre: "Empanada napolitana", desc: "Jamón, queso y tomate.", precio: "$1.890", unidad: "/ unidad", stock: 16  },
    ],
  },
];

// Producto destacado en la sección "Corte de la semana" (usa el id del catálogo).
export const CORTE_SEMANA = {
  id: "c10",
  titulo: "Malaya al jugo",
  texto:
    "Nuestra especialidad de la semana: corte sabroso y rendidor, ideal para " +
    "preparar al jugo o a la plancha. Cantidad limitada.",
};

export function buscarProducto(id) {
  for (const cat of categorias) {
    const p = cat.productos.find((x) => x.id === id);
    if (p) return { ...p, categoriaId: cat.id, categoria: cat.nombre };
  }
  return null;
}

export const TOTAL_PRODUCTOS = categorias.reduce((s, c) => s + c.productos.length, 0);

export const OFERTAS = categorias.flatMap((cat) =>
  cat.productos.filter((p) => p.oferta).map((p) => ({ ...p, categoriaId: cat.id, categoria: cat.nombre }))
);

// Nombres e íconos de los usos de cocina.
export const USOS = {
  parrilla: "Parrilla",
  horno: "Horno",
  olla: "Olla",
  sarten: "Sartén",
};

// Consejos generales por tipo de preparación (se muestran en la ficha del producto).
export const CONSEJOS = {
  parrilla:
    "Sácalo del refri 20–30 minutos antes, sala justo al poner a la parrilla y deja reposar 5 minutos antes de cortar.",
  horno:
    "Sella por fuera en sartén bien caliente y termina en horno precalentado; cocción lenta para cortes con más fibra.",
  olla:
    "Ideal para cocción larga a fuego bajo: cazuelas, guisos y al jugo. Mientras más lento, más blando queda.",
  sarten:
    "Sartén muy caliente y poco aceite. Cocina pocas piezas a la vez para que se doren en vez de hervirse.",
};
