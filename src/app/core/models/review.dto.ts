import { UserDto } from './user.dto';
import { PropertyDto } from './property.dto';

export interface ReviewDto {
  id: string;
  property: PropertyDto;
  reviewer: UserDto;
  rating: number; // 1 - 5
  comment: string;
  createdAt: string;
}

