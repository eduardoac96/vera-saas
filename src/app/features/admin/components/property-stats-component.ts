import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../../../core/services/reservations.service';

import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { PropertiesService } from '../../../core/services/properties.service';

@Component({
  standalone: true,
  selector: 'reservations-stats-component',
  imports: [CommonModule, SelectModule, FormsModule],
  providers: [ReservationsService, PropertiesService],
  templateUrl: 'property-stats-component.html',
})
export class ReservationsStatsComponent {
  _countReservations = 0;
  _countReservationsMonth = 0;
  _countClients = 0;
  _countClientsMonth = 0;
  _countReviews = 0;
  _countPendingReviews = 0;
  _address = '';
  constructor(
    private reservationsService: ReservationsService,
    private propertiesService: PropertiesService,
  ) {}

  @Output() propertySelected = new EventEmitter<string>();

  dropdownItems: { name: string; code: string }[] = [];
  dropdownItem?: { name: string; code: string };

  async ngOnInit() {
    this.propertiesService.getProperties('tenant-001').subscribe((props) => {
      this.dropdownItems = props.map((p) => ({
        name: p.title,
        code: p.id,
      }));

      // Selecciona la primera como default si hay items
      if (this.dropdownItems.length > 0) {
        this.dropdownItem = this.dropdownItems[0];

        // Ahora sí ya hay valor, se ejecuta con la primer propiedad
        this.loadStats(this.dropdownItem.code);
      }
    });
  }

  async onPropertyChange(event: any) {
    const selectedCode = event.value.code;
    this.propertySelected.emit(selectedCode);
    await this.loadStats(selectedCode);
  }

  private async loadStats(propertyId: string) {
    await this.propertiesService
      .getPropertyAddress(propertyId)
      .subscribe((address) => (this._address = address));
    await this.reservationsService
      .countReservations(propertyId)
      .subscribe((count) => (this._countReservations = count));

    await this.reservationsService
      .countReservations(propertyId)
      .subscribe((count) => (this._countReservationsMonth = count));

    await this.propertiesService
      .countClients(propertyId)
      .subscribe((count) => (this._countClients = count));

    await this.propertiesService
      .countClients(propertyId)
      .subscribe((count) => (this._countClientsMonth = count));

    await this.propertiesService
      .countReviews(propertyId)
      .subscribe((count) => (this._countReviews = count));

    await this.propertiesService
      .countPendingReviews(propertyId)
      .subscribe((count) => (this._countReviews = count));
  }
}
