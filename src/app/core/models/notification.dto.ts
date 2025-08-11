export interface NotificationDto {
  id: string;
  type: 'reservation' | 'review' | 'message' | 'system'; // Tipo de notificación
  title: string;         // Título corto para la tarjeta/lista
  message: string;       // Descripción o detalle
  createdAt: string;     // ISO date string
  read: boolean;         // Si el usuario ya la leyó
  reservationId?: string; // Solo si está asociada a una reserva
  data?: any;            // Campo genérico para info extra (ej: DTO de reserva)
}
export const mockNotifications: NotificationDto[] = [
  {
    id: 'notif-001',
    type: 'reservation',
    title: 'Nueva reserva confirmada',
    message: 'María López reservó "Casa en la Playa" para el 15/09/2025.',
    createdAt: '2025-08-11T09:20:00Z',
    read: false,
    reservationId: 'res-001',
    data: {
      guestName: 'María López',
      propertyTitle: 'Casa en la Playa',
      checkIn: '2025-09-15',
      checkOut: '2025-09-20',
      totalPrice: 2500
    }
  },
  {
    id: 'notif-002',
    type: 'reservation',
    title: 'Nueva reserva pendiente',
    message: 'Carlos Ramírez solicitó reservar "Departamento Moderno".',
    createdAt: '2025-08-10T14:50:00Z',
    read: true,
    reservationId: 'res-002',
    data: {
      guestName: 'Carlos Ramírez',
      propertyTitle: 'Departamento Moderno',
      checkIn: '2025-09-01',
      checkOut: '2025-09-05',
      totalPrice: 800
    }
  }
];