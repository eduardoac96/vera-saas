import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu'; 
import { mockNotifications, NotificationDto } from '../../../core/models/notification.dto';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    standalone: true,
    selector: 'reservation-notification-component',
    imports: [ButtonModule, MenuModule, DatePipe, CommonModule], 
    templateUrl: './notification-component.html' 
})
export class ReservationsNotificationComponent {
    constructor(){}
    @Input() mode: 'full' | 'compact' = 'full';
    @Input() propertyId!: string;

  items = [
    { label: 'Marcar todas como leídas', icon: 'pi pi-check', command: () => this.clearAll() }
  ];
  notifications: NotificationDto[] = mockNotifications;
   
  clearAll() {
    this.notifications = [];
  }
   get visibleNotifications() {
    return this.mode === 'compact' ? this.notifications.slice(0, 5) : this.notifications;
  }
}
