import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Menu } from "primeng/menu";
import { TagModule } from 'primeng/tag';
import { ReservationsService } from '../../../core/services/reservations.service';
import { ReservationDto } from '../../../core/models/reservation.dto';
import { Dialog } from "primeng/dialog";
import { ReservationViewComponent } from "./reservation-view-component";

@Component({
  standalone: true,
  selector: 'app-reservations-component',
  imports: [CommonModule, TagModule, TableModule, ButtonModule, RippleModule, Menu, Dialog, ReservationViewComponent],
  templateUrl: './table-component.html',
  providers: [ReservationsService]
})
export class ReservationsTableComponent {
  reservations!: ReservationDto[];

  constructor(private reservationsService: ReservationsService) { }

  async ngOnInit() {
    (await this.reservationsService.getReservations()).subscribe((data) => (this.reservations = data));
  }

  items = [
    { label: 'Add New', icon: 'pi pi-fw pi-plus', command: () => this.addNewNotification() },
    { label: 'Remove', icon: 'pi pi-fw pi-trash', command: () => this.removeNotifications() }
  ];
  @Output() view = new EventEmitter<ReservationDto>();
  @Output() edit = new EventEmitter<ReservationDto>();
  @Output() delete = new EventEmitter<string>();
  // referencia al componente hijo (el viewer)
  @ViewChild('viewer') viewer!: ReservationViewComponent;

  onView(res: ReservationDto) {   if (!this.viewer) {
      console.warn('Viewer no inicializado aún');
      return;
    } 
    this.viewer.openView(res); // <-- abre el dialog en ReservationViewComponent
  }
 onEdit(res: ReservationDto) {
    if (!this.viewer) {
      console.warn('Viewer no inicializado aún');
      return;
    }
    this.viewer.openEdit(res); // <-- abre el diálogo de edición
  }


  addNewNotification() {
    alert("TODO");
  }

  removeNotifications() {
    console.log("TODO REMOVE")
  }
}
