import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ReservationsService } from '../../../core/services/reservations.service';
import { ReservationDto } from '../../../core/models/reservation.dto';
import { ReservationDialogComponent } from "./reservation-dialog-component";
import { mockProperties } from '../../../core/mocks/mockProperties';
import { Toast } from "primeng/toast";

@Component({
  standalone: true,
  selector: 'reservations-table-component',
  imports: [CommonModule, TagModule, TableModule, ButtonModule, RippleModule, ReservationDialogComponent, Toast],
  templateUrl: './reservations-table-component.html',
  providers: [ReservationsService]
})
export class ReservationsTableComponent {
  reservations!: ReservationDto[];
  @Input() propertyId!: string;


  constructor(private reservationsService: ReservationsService) { }

  private async loadReservations() {
    (await this.reservationsService.getReservations(this.propertyId)).subscribe((data) => (this.reservations = data));

  }

  async ngOnInit() {
    await this.loadReservations();


  }

  async ngOnChanges() {
    await this.loadReservations();
  }



  items = [
    { label: 'Add New', icon: 'pi pi-fw pi-plus', command: () => this.addNewNotification() }
  ];
  @Output() view = new EventEmitter<ReservationDto>();
  @Output() edit = new EventEmitter<ReservationDto>();
  @Output() delete = new EventEmitter<string>();
  // referencia al componente hijo (el viewer)
  // @ViewChild('viewer') viewer!: ReservationDialogComponent;
  showManualDialog = false;
  selectedProperty = mockProperties[0]; // o la property actual en contexto

  onManualReservationSaved(res: any) {
    // Aquí puedes refrescar la tabla o hacer cualquier otra acción
    console.log('reservacion creada', res);
    // por ejemplo: this.loadReservations(currentPropertyId);
  }

  addNewNotification() {
    alert("TODO");
  }

  removeNotifications() {
    console.log("TODO REMOVE")
  }
}
