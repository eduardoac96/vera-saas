import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { NotificationDto } from '../../../core/models/notification.dto';
import { CommonModule, DatePipe } from '@angular/common'; 
import { PropertiesService } from '../../../core/services/properties.service';

@Component({
  standalone: true,
  selector: 'reservation-notification-component',
  imports: [ButtonModule, MenuModule, DatePipe, CommonModule],
  providers: [PropertiesService],
  templateUrl: './notification-component.html',
})
export class ReservationsNotificationComponent { 
  private _notifications: NotificationDto[] = [];

  constructor(private propertiesService: PropertiesService) {}
  @Input() mode: 'full' | 'compact' = 'full';
  @Input() propertyId!: string;

  items = [
    {
      label: 'Marcar todas como leídas',
      icon: 'pi pi-check',
      command: () => this.clearAll(),
    },
  ];
  async ngOnInit() {
    await this.loadNotifications();
  }
  async ngOnChanges() {
    await this.loadNotifications();
  }
  private async loadNotifications() {
    (
      await this.propertiesService.getNotificationsBy(this.propertyId)
    ).subscribe((data) => (this._notifications = data));
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
