import { ReviewDto } from "../models/review.dto";
import { UserDto } from "../models/user.dto";

export const mockReviews: ReviewDto[] = [
  {
    id: 'rev-001',
    property: {
      tenantId: 'tenant-001',
      id: 'prop-101',
      title: 'Quinta Odin',
      description: 'Quinta para todo tipo de eventos.',
      location: { city: 'Santiago', country: 'México', state: 'Nuevo Leon', addressLine1: '', postalCode: '', latitude: 0, longitude: 0 },
      photos: [{ id: 'photo-101', url: 'assets/img/playa1.jpg' }],
      // host: {
      //   id: 'host-001',
      //   fullName: 'Host Playa',
      //   email: 'hostplaya@example.com',
      //   isHost: true,
      //   phoneNumber: '',
      //   avatarUrl: '',
      //   createdAt: ''
      // },
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