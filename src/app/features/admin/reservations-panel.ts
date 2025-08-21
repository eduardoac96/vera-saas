import { Component, EventEmitter, NgModule, Output } from '@angular/core';

import { ReservationsTableComponent } from './components/reservations-table-component';
import { ReservationsNotificationComponent } from './components/notification-component';
import { ReservationsStatsComponent } from './components/property-stats-component';
import { PropertiesService } from '../../core/services/properties.service';

@Component({
  selector: 'reservations-panel',
  imports: [
    ReservationsTableComponent,
    ReservationsNotificationComponent,
    ReservationsStatsComponent,
  ],
  providers: [PropertiesService],
  templateUrl: './reservations-panel.html',
})
export class ReservationsPanelComponent {
  selectedPropertyId!: string;
  constructor(private propertiesService: PropertiesService) {}

  onPropertySelected(propertyId: string) {
    this.selectedPropertyId = propertyId;
  }
  dropdownItems: { name: string; code: string }[] = [];
  dropdownItem!: { name: string; code: string };

  ngOnInit() {
    this.propertiesService
      .getProperties('tenant-001')
      .subscribe((props) => {
        this.dropdownItems = props.map((p) => ({ name: p.title, code: p.id }));
        if (this.dropdownItems.length) {
          this.selectedPropertyId = this.dropdownItems[0].code; // default
        }
      }); 
 
  }
}
