import { PropertyDto } from "./property.dto";
import { UserDto } from "./user.dto";

export interface ReservationDto 
{

    id: string;
    property: PropertyDto;
    guest: UserDto;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: 'Pendiente' | 'Confirmada' | 'Cancelada';
    createdAt: string;
    updatedAt?: string; 
 }
