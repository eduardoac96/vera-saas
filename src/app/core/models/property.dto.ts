import { AmenityDto } from "./amenity.dto";
import { LocationDto } from "./location.dto";
import { PhotoDto } from "./photo";
import { UserDto } from "./user.dto";


export interface PropertyDto {
    id: string;
    title: string;
    description: string;
    host: UserDto;
    location: LocationDto;
    amenities: AmenityDto[];
    photos: PhotoDto[];
    pricePerDay: number;
    maxGuests: number;
    createdAt: string;
    updatedAt: string;
}