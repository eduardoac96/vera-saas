import { HttpClient } from "@angular/common/http";
import { PropertyDto } from "../models/property.dto";
import { mockProperties } from "../mocks/mockProperties";
import { BehaviorSubject, map } from "rxjs";
import { Injectable } from "@angular/core";
import { ReviewDto } from "../models/review.dto";
import { mockReviews } from "../mocks/mockReviews";
import { NotificationDto } from "../models/notification.dto";
import { mockNotifications } from "../mocks/mockNotifications";

@Injectable()
export class PropertiesService {
  constructor(private http: HttpClient) { }
  private _properties = new BehaviorSubject<PropertyDto[]>(mockProperties);

  private _reviews = new BehaviorSubject<ReviewDto[]>(mockReviews);
  private _notifications = new BehaviorSubject<NotificationDto[]>(mockNotifications);

  getNotificationsBy(propertyId: string){
    return this._notifications.pipe(
      map(props => props.filter(p => p.property.id === propertyId))
    );
  }

  getProperties(tenantId: string) {
    return this._properties.pipe(
      map(props => props.filter(p => p.tenantId === tenantId))
    );
  }

  getPropertyAddress(propertyId: string) {
    return this._properties.pipe(
      map(properties => {
        const prop = properties.find(p => p.id === propertyId);
        if (!prop || !prop.location) return 'Dirección no disponible';
         // Puedes armar el string como quieras
        const { addressLine1, city, state, country } = prop.location;
        return `${addressLine1}, ${city}, ${state}, ${country}`;
      })
    );
  }



  countReviews(propertyId: string) {
    return this._reviews.pipe(
      map(reviews => reviews.length)
    );
  }

  countPendingReviews(propertyId: string) {
    return this._reviews.pipe(
      map(reviews => reviews.length)
    );
  }
}  
