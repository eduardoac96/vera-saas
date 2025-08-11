import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  
import { Menu } from "primeng/menu"; 
import { TagModule } from 'primeng/tag';
import { ReservationsService } from '../../../core/services/reservations.service';
import { ReservationDto } from '../../../core/models/reservation.dto';

@Component({
    standalone: true,
    selector: 'app-reservations-component',
    imports: [CommonModule,TagModule, TableModule, ButtonModule, RippleModule, Menu],
    templateUrl: './table-component.html',
    providers: [ReservationsService]
})
export class ReservationsTableComponent {
    reservations!: ReservationDto[];

    constructor(private reservationsService: ReservationsService) {}

    ngOnInit() {
        this.reservationsService.getReservations().then((data) => (this.reservations = data));
    }

      items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus', command: () => this.addNewNotification() },
        { label: 'Remove', icon: 'pi pi-fw pi-trash',  command: () => this.removeNotifications() }
    ];

    addNewNotification(){
        alert("TODO");
    }

    removeNotifications(){
        console.log("TODO REMOVE")
    }
}
