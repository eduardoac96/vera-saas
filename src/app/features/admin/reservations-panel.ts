import { Component } from '@angular/core'; 
import { ReservationsTableComponent } from './components/reservations-table-component';
import { ReservationsNotificationComponent } from './components/reservations-notification-component';
 import { ReservationsStatsComponent } from './components/reservations-stats-component';

@Component({
    selector: 'app-dashboard',
    imports: [ReservationsTableComponent, ReservationsNotificationComponent, ReservationsStatsComponent],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <reservations-stats-component class="contents" />
            <div class="col-span-12 xl:col-span-12">
               <app-reservations-component />
            </div>
            <div class="col-span-12 xl:col-span-12"> 
               <reservation-notification-component/>
            </div>
        </div>
    `
})
export class Dashboard {}
