import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {
  mockNotifications,
  NotificationDto, 
} from '../../../core/models/notification.dto';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'reservation-notification-component',
  imports: [ButtonModule, MenuModule, DatePipe, CommonModule],
  templateUrl: './notification-component.html',
})
export class ReservationsNotificationComponent {
  private _propertyId = '';
  private _notifications: NotificationDto[] = [];

  constructor() {}
  @Input() mode: 'full' | 'compact' = 'full';
  @Input()
  set propertyId(value: string) {
    if (!value) return;
    this._propertyId = value;
    this.loadNotifications();
  }
  items = [
    {
      label: 'Marcar todas como leídas',
      icon: 'pi pi-check',
      command: () => this.clearAll(),
    },
  ];

  private async loadNotifications() {
  this._notifications = mockNotifications;

  }
  clearAll() {
    this._notifications = [];
  }
  get visibleNotifications() {
    return this.mode === 'compact'
      ? this._notifications.slice(0, 5)
      : this._notifications;
  }
}
