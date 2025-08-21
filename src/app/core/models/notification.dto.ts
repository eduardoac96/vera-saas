import { PropertyDto } from "./property.dto";

export interface NotificationDto {
  id: string;
  type: 'reservation' | 'review' | 'message' | 'system'; // Tipo de notificación
  title: string;         // Título corto para la tarjeta/lista
  message: string;       // Descripción o detalle
  createdAt: string;     // ISO date string
  property: PropertyDto;
  read: boolean;         // Si el usuario ya la leyó
  reservationId?: string; // Solo si está asociada a una reserva
  data?: any;            // Campo genérico para info extra (ej: DTO de reserva)
}
