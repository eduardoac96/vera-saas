import { UserDto } from "../models/user.dto";

export const mockGuests: UserDto[] = [
  {
    id: 'user-200',
    fullName: 'Ana López',
    email: 'ana@example.com',
    phoneNumber: '+52 555 123 4567',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    isHost: false,
    createdAt: '2024-03-01T10:00:00Z'
  }
];
