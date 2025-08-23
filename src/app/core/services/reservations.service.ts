import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDto } from '../models/reservation.dto';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { NotificationDto } from '../models/notification.dto';
import { mockReservations } from '../mocks/mockReservations'; 
import { mockNotifications } from '../mocks/mockNotifications';

@Injectable()
export class ReservationsService {
  constructor(private http: HttpClient) {}

  private _reservations = new BehaviorSubject<ReservationDto[]>(
    mockReservations,
  );
  private _notifications = new BehaviorSubject<NotificationDto[]>(
    mockNotifications,
  );

  countReservations(propertyId: string) {
    return this._reservations.pipe(
      map(
        (reservations) =>
          reservations.filter((r) => r.property.id === propertyId).length,
      ),
    );
  }
  countReservationsPerMonth(propertyId: string) {
    return this._reservations.pipe(
      map(
        (reservations) =>
          reservations.filter((r) => r.property.id === propertyId).length,
      ),
    );
  }

  private getReservationsData(
    propertyId: string,
  ): Observable<ReservationDto[]> {
    return this._reservations
      .asObservable()
      .pipe(
        map((reservations) =>
          reservations.filter((r) => r.property.id === propertyId),
        ),
      );
  }

  private getNotificationsData(
    propertyId: string,
  ): Observable<NotificationDto[]> {
    return this._notifications
      .asObservable()
      .pipe(
        map((notifications) =>
          notifications.filter((n) => n.property.id === propertyId),
        ),
      );
  }

  getReservations(propertyId: string) {
    return Promise.resolve(this.getReservationsData(propertyId));
  }

  getNotifications(propertyId: string) {
    return Promise.resolve(this.getNotificationsData(propertyId));
  }

  getReservationById(id: string): Observable<ReservationDto | undefined> {
    const reservation = this._reservations.value;
    return of(reservation.find((r) => r.id === id));
  }
  updateReservation(updated: ReservationDto): Observable<ReservationDto> {
    const arr = [...this._reservations.value];
    const idx = arr.findIndex((r) => r.id === updated.id);
    if (idx >= 0) {
      arr[idx] = { ...updated, updatedAt: new Date().toISOString() };
      this._reservations.next(arr);
    }
    return of(updated);
  }

    countClients(propertyId: string) {
    return this._reservations.pipe(
      map(properties => {
          properties
        
        // const uniqueClients = new Set(reservations.map(r => r.property?.host.id));
        // return uniqueClients.size;
        return 100;
      })
    )
  }
}
