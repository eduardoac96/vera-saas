import { UserDto } from './user.dto';
import { PropertyDto } from './property.dto';

export interface ReviewDto {
  id: string;
  property: PropertyDto;
  reviewer: UserDto;
  rating: number; // 1 - 5
  comment: string;
  createdAt: string;
}export const mockReviews: ReviewDto[] = [
  {
    id: 'rev-001',
    property: {
      id: 'prop-101',
      title: 'Casa en la Playa',
      description: 'Hermosa casa frente al mar con alberca privada.',
      location: { city: 'Cancún', country: 'México', state: '', addressLine1: '', postalCode: '', latitude: 0, longitude: 0 },
      photos: [{ id: 'photo-101', url: 'assets/img/playa1.jpg' }],
      host: {
        id: 'host-001',
        fullName: 'Host Playa',
        email: 'hostplaya@example.com',
        isHost: true,
        phoneNumber: '',
        avatarUrl: '',
        createdAt: ''
      },
      amenities: [],
      pricePerDay: 0,
      maxGuests: 0,
      updatedAt: '',
      createdAt: ''
    },
    reviewer: {
      id: 'usr-102',
      fullName: 'Carlos Ramírez',
      email: 'carlos@example.com',
      avatarUrl: 'assets/img/user2.jpg'
    } as UserDto,
    rating: 4,
    comment: 'Excelente ubicación y muy cómodo, aunque un poco ruidoso por la noche.',
    createdAt: '2025-08-05T10:20:00Z'
  }

];