import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDto } from '../models/reservation.dto';
import { PropertyDto } from '../models/property.dto';
import { UserDto } from '../models/user.dto';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { mockReviews, ReviewDto } from '../models/review.dto';
import { mockNotifications, NotificationDto } from '../models/notification.dto';
   

const mockProperties: PropertyDto[] = [
  {
    id: 'prop-1',
    title: 'Casa en la Playa con Vista al Mar',
    description: 'Hermosa casa frente al mar con piscina privada y acceso directo a la playa.',
    host: {
      id: 'user-100',
      fullName: 'Carlos Martínez',
      email: 'carlos@example.com',
      isHost: true,
      phoneNumber: '',
      avatarUrl: '',
      createdAt: '2024-01-10T09:00:00Z'
    },
    location: {
      country: 'México',
      state: 'Quintana Roo',
      city: 'Cancún',
      addressLine1: 'Calle 5 #123',
      postalCode: '77500',
      latitude: 21.1619,
      longitude: -86.8515
    },
    amenities: [
      { id: 'a1', name: 'Wi-Fi', icon: 'pi pi-wifi' },
      { id: 'a2', name: 'Piscina', icon: 'pi pi-water' }
    ],
    photos: [
      { id: 'p1', url: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg' },
      { id: 'p2', url: 'https://images.pexels.com/photos/59924/pexels-photo-59924.jpeg' }
    ],
    pricePerDay: 250,
    maxGuests: 6,
    updatedAt: '2024-01-01T10:00:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  } 
];

const mockGuests: UserDto[] = [
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
 export const mockReservations: ReservationDto[] = [
  {
    id: 'res-001',
    property: mockProperties[0],
    guest: mockGuests[0],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 1250, // 5 noches * $250
    status: 'Confirmada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  },
    {
    id: 'res-001',
    property: mockProperties[0],
    guest: mockGuests[0],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 1250, // 5 noches * $250
    status: 'Confirmada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  },
    {
    id: 'res-001',
    property: mockProperties[0],
    guest: mockGuests[0],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 1250, // 5 noches * $250
    status: 'Cancelada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  },
    {
    id: 'res-001',
    property: mockProperties[0],
    guest: mockGuests[0],
    checkInDate: '2025-09-20T15:00:00Z',
    checkOutDate: '2025-09-25T11:00:00Z',
    totalPrice: 1250, // 5 noches * $250
    status: 'Confirmada',
    createdAt: '2025-08-01T12:00:00Z',
    updatedAt: '2025-08-05T08:00:00Z'
  }

];



@Injectable()
export class ReservationsService {
    constructor(private http: HttpClient) {}

    private _reservations = new BehaviorSubject<ReservationDto[]>(mockReservations); 
    private _reviews = new BehaviorSubject<ReviewDto[]>(mockReviews);
    private _notifications = new BehaviorSubject<NotificationDto[]>(mockNotifications);

    countReservations = this._reservations.pipe(
        map(reservations => reservations.length)
      );

    countReservationsPerMonth = this._reservations.pipe(
        map(reservations => reservations.length)
      );

    countClients = this._reservations.pipe(
       map(reservations => {
          const uniqueClients = new Set(reservations.map(r=> r.property?.host.id));
          return uniqueClients.size;
       })
    )

    countReviews =this._reviews.pipe(
       map(reviews => reviews.length)
    );

    countPendingReviews = this._reviews.pipe(
       map(reviews => reviews.length)
    );

    private getReservationsData(): Observable<ReservationDto[]> {
        return this._reservations.asObservable();
    } 
    private getNotificationsData(): Observable<NotificationDto[]>{
       return this._notifications.asObservable();
    }

    getReservations() {
        return Promise.resolve(this.getReservationsData());
    }
   

    getNotifications() { 
      return Promise.resolve(this.getNotificationsData());
    }
    
    



    getReservationById(id: string):Observable<ReservationDto | undefined>{
        const reservation = this._reservations.value;
        return of(reservation.find(r => r.id === id));
    }
    updateReservation(updated: ReservationDto): Observable<ReservationDto> {
        const arr = [...this._reservations.value];
        const idx = arr.findIndex(r => r.id === updated.id);
        if (idx >= 0) {
        arr[idx] = { ...updated, updatedAt: new Date().toISOString() };
        this._reservations.next(arr);
        }
        return of(updated);
    }
}
