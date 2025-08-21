import { NotificationDto } from "../models/notification.dto";
import { mockProperties } from "./mockProperties";

export const mockNotifications: NotificationDto[] = [
  {
    id: 'notif-001',
    type: 'reservation',
    title: 'Nueva reserva confirmada',
    message: 'Odin López reservó "Casa en la Playa" para el 15/09/2025.',
    createdAt: '2025-08-11T09:20:00Z',
    read: false,
    reservationId: 'res-001',
    property: mockProperties[0],
    data: {
      guestName: 'Odin López',
      propertyTitle: 'Quinta en la Playa',
      checkIn: '2025-09-15',
      checkOut: '2025-09-20',
      totalPrice: 2500
    }
  },
  {
    id: 'notif-002',
    type: 'reservation',
    title: 'Nueva reserva pendiente',
    message: 'Vera Ramírez solicitó reservar "Departamento Moderno".',
    createdAt: '2025-08-10T14:50:00Z',
    read: true,
    reservationId: 'res-002',
    property: mockProperties[1],
    data: {
      guestName: 'Vera Ramírez',
      propertyTitle: 'Departamento Moderno',
      checkIn: '2025-09-01',
      checkOut: '2025-09-05',
      totalPrice: 800
    }
  },
  {
    id: 'notif-003',
    type: 'reservation',
    title: 'Nueva reserva pendiente',
    message: 'Lola Ramírez solicitó reservar "Departamento Moderno".',
    createdAt: '2025-08-10T14:50:00Z',
    read: true,
    reservationId: 'res-002',
    property: mockProperties[2],
    data: {
      guestName: 'Lola Lalo',
      propertyTitle: 'Departamento Moderno',
      checkIn: '2025-09-01',
      checkOut: '2025-09-05',
      totalPrice: 800
    }
  }
];