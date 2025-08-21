import { ReservationDto } from "../models/reservation.dto";
import { mockGuests } from "./mockGuests";
import { mockProperties } from "./mockProperties";

export const mockReservations: ReservationDto[] = [
  {
    id: 'res-001',
    property: mockProperties[0],
    guest: mockGuests[0],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 8888, // 5 noches * $250
    status: 'Confirmada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  },
  {
    id: 'res-001',
    property: mockProperties[0],
    guest: mockGuests[0],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 3999, // 5 noches * $250
    status: 'Confirmada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  },
  {
    id: 'res-001',
    property: mockProperties[1],
    guest: mockGuests[1],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 3000, // 5 noches * $250
    status: 'Cancelada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  },
  {
    id: 'res-001',
    property: mockProperties[2],
    guest: mockGuests[2],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 2000, // 5 noches * $250
    status: 'Confirmada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  }

];