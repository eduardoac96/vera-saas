import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'reservation-notification-component',
    imports: [ButtonModule, MenuModule],
    templateUrl: './notification-component.html' 
})
export class ReservationsNotificationComponent {
    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus', command: () => this.addNewNotification() },
        { label: 'Remove', icon: 'pi pi-fw pi-trash',  command: () => this.removeNotifications() }
    ];

    addNewNotification(){
        console.log("TODO");
    }

    removeNotifications(){
        console.log("TODO REMOVE")
    }
}
