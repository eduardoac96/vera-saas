import { AmenityDto } from "./amenity.dto";
import { LocationDto } from "./location.dto";
import { PhotoDto } from "./photo";
import { UserDto } from "./user.dto";

type MediaItem = { type: 'image' | 'youtube'; url: string; thumbnail?: string };
export interface PropertyDto {
    pricingLevels?: {minGuests: number, maxGuests: number, price: number, length?: number}[],
    id: string;
    title: string;
    description?: string;
    location?: LocationDto;
    amenities?: AmenityDto[];
    photos?: PhotoDto[];
    pricePerDay?: number;
    maxGuests?: number;
    createdAt: string;
    updatedAt: string;
    tenantId:string;

    slug?: string;
    mediaItems? : MediaItem[];
    metaKeywords?: string;
    rangeDates?: [Date, Date];
    blockedDates?: Date[];
}