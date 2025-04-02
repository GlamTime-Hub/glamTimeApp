import { groupBy } from "lodash-es";

// Servicios
export const services = [
  {
    id: "service_001",
    name: "Corte de pelo",
    price: 20,
    duration: 0.5, // Duración en minutos
    professionalId: "prof_001", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Corte de pelo", // Subcategoría
  },
  {
    id: "service_002",
    name: "Tinte",
    price: 50,
    duration: 1.5, // Duración en minutos
    professionalId: "prof_001", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Tinte", // Subcategoría
  },
  {
    id: "service_003",
    name: "Manicura",
    price: 25,
    duration: 0.75, // Duración en minutos
    professionalId: "prof_002", // Referencia al profesional
    status: true,
    category: "Manicura y Pedicura", // Categoría principal
    subcategory: "Manicura", // Subcategoría
  },
  {
    id: "service_004",
    name: "Pedicura",
    price: 30,
    duration: 1, // Duración en minutos
    professionalId: "prof_002", // Referencia al profesional
    status: true,
    category: "Manicura y Pedicura", // Categoría principal
    subcategory: "Pedicura", // Subcategoría
  },
  {
    id: "service_005",
    name: "Masajes relajantes",
    price: 60,
    duration: 1, // Duración en minutos
    professionalId: "prof_003", // Referencia al profesional
    status: true,
    category: "Masajes", // Categoría principal
    subcategory: "Masajes relajantes", // Subcategoría
  },
  {
    id: "service_006",
    name: "Extensiones de cabello",
    price: 150,
    duration: 2, // Duración en minutos
    professionalId: "prof_003", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Extensiones de cabello", // Subcategoría
  },
  {
    id: "service_007",
    name: "Corte de barba",
    price: 15,
    duration: 0.5, // Duración en minutos
    professionalId: "prof_004", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Corte de barba", // Subcategoría
  },
  {
    id: "service_008",
    name: "Afeitado clásico",
    price: 25,
    duration: 0.5, // Duración en minutos
    professionalId: "prof_004", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Afeitado clásico", // Subcategoría
  },
  {
    id: "service_009",
    name: "Corte de pelo y barba",
    price: 35,
    duration: 1, // Duración en minutos
    professionalId: "prof_005", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Corte de pelo y barba", // Subcategoría
  },
  {
    id: "service_010",
    name: "Corte de pelo y tinte",
    price: 70,
    duration: 1.5, // Duración en minutos
    professionalId: "prof_005", // Referencia al profesional
    status: true,
    category: "Cortes", // Categoría principal
    subcategory: "Corte de pelo y tinte", // Subcategoría
  },
];

// Agrupar los servicios por categoría
export const groupedByCategory = groupBy(services, "category");

// Mostrar los servicios agrupados por categoría
//console.log(groupedByCategory);
