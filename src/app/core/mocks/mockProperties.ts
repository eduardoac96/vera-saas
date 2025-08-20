import { PropertyDto } from "../models/property.dto";

export const mockProperties: PropertyDto[] = [
  {
    id: "prop-101",
    title: "Quinta Los Naranjos",
    description: "Espaciosa quinta campestre con alberca y asador, ideal para eventos familiares.",
    pricePerDay: 4500,
    maxGuests: 60,
    createdAt: "2025-08-20T10:00:00Z",
    updatedAt: "2025-08-20T10:00:00Z",
    tenantId: "tenant-001",
    location: {
      addressLine1: "Camino a Santiago km 3",
      city: "Santiago",
      state: "Nuevo León",
      country: "México",
      postalCode: "67300",
      latitude: 25.4221,
      longitude: -100.1532
    }
  },
  {
    id: "prop-102",
    title: "Jardín La Esperanza",
    description: "Jardín con áreas verdes amplias y terraza techada para bodas y XV años.",
    pricePerDay: 6000,
    maxGuests: 120,
    createdAt: "2025-08-20T10:05:00Z",
    updatedAt: "2025-08-20T10:05:00Z",
    tenantId: "tenant-001",
    location: {
      addressLine1: "Carretera Nacional km 25",
      city: "Monterrey",
      state: "Nuevo León",
      country: "México",
      postalCode: "64989",
      latitude: 25.5104,
      longitude: -100.2103
    }
  },
  {
    id: "prop-103",
    title: "Quinta El Nogal",
    description: "Quinta privada con alberca climatizada y cancha deportiva.",
    pricePerDay: 5500,
    maxGuests: 80,
    createdAt: "2025-08-20T10:10:00Z",
    updatedAt: "2025-08-20T10:10:00Z",
    tenantId: "tenant-001",
    location: {
      addressLine1: "Av. Los Naranjos 145",
      city: "Guadalupe",
      state: "Nuevo León",
      country: "México",
      postalCode: "67110",
      latitude: 25.6767,
      longitude: -100.2565
    }
  },
  {
    id: "prop-104",
    title: "Jardín Los Pinos",
    description: "Lugar rodeado de naturaleza con kiosko central y zona de juegos infantiles.",
    pricePerDay: 4000,
    maxGuests: 50,
    createdAt: "2025-08-20T10:15:00Z",
    updatedAt: "2025-08-20T10:15:00Z",
    tenantId: "tenant-002",
    location: {
      addressLine1: "Prolongación Hidalgo s/n",
      city: "Allende",
      state: "Nuevo León",
      country: "México",
      postalCode: "67350",
      latitude: 25.3005,
      longitude: -100.0211
    }
  },
  {
    id: "prop-105",
    title: "Quinta San Gabriel",
    description: "Elegante quinta con salón cerrado, terraza y amplio estacionamiento.",
    pricePerDay: 7000,
    maxGuests: 150,
    createdAt: "2025-08-20T10:20:00Z",
    updatedAt: "2025-08-20T10:20:00Z",
    tenantId: "tenant-002",
    location: {
      addressLine1: "Carretera Cadereyta km 10",
      city: "Cadereyta",
      state: "Nuevo León",
      country: "México",
      postalCode: "67480",
      latitude: 25.5892,
      longitude: -99.9843
    }
  },
  {
    id: "prop-106",
    title: "Jardín La Hacienda",
    description: "Estilo rústico mexicano con muros de piedra, ideal para celebraciones grandes.",
    pricePerDay: 8000,
    maxGuests: 200,
    createdAt: "2025-08-20T10:25:00Z",
    updatedAt: "2025-08-20T10:25:00Z",
    tenantId: "tenant-002",
    location: {
      addressLine1: "Camino a Pesquería 230",
      city: "Pesquería",
      state: "Nuevo León",
      country: "México",
      postalCode: "66650",
      latitude: 25.7834,
      longitude: -100.0555
    }
  }
];
