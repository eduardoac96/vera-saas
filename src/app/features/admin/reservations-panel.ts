import { Component, EventEmitter, NgModule, Output } from '@angular/core';

import { ReservationsTableComponent } from './components/reservations-table-component';
import { ReservationsNotificationComponent } from './components/notification-component';
import { ReservationsStatsComponent } from './components/stats-component';
import { PropertiesService } from '../../core/services/properties.service';

@Component({
    selector: 'reservations-panel',
    imports: [ReservationsTableComponent, ReservationsNotificationComponent, ReservationsStatsComponent],
    providers: [PropertiesService],  
    templateUrl: './reservations-panel.html'
})
export class ReservationsPanel {
    propertySelected: { };


    constructor(private propertiesService: PropertiesService) { }


 

    dropdownItems: { name: string; code: string }[] = [];
    dropdownItem!: { name: string; code: string };


    ngOnInit() {
        this.propertiesService.getProperties("tenant-001")
            .subscribe(props => {
                this.dropdownItems = props.map(p => ({
                    name: p.title,
                    code: p.id
                }));

                if (this.dropdownItems.length > 0) {
                    // ✅ Selecciona la primera como default
                    this.dropdownItem = this.dropdownItems[0];
                    // ✅ Emite el propertyId al panel
                    this.propertySelected =this.dropdownItem;
                }
            });

            alert(this.dropdownItem.code)
    }

    onPropertySelected(item: { name: string; code: string }) {
        this.dropdownItem = item;
        this.propertySelected = item.code;
    }
}
