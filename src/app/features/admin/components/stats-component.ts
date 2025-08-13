import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../../../core/services/reservations.service';
import { SelectModule } from "primeng/select";
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'reservations-stats-component',
    imports: [CommonModule, SelectModule, FormsModule],
    providers: [ReservationsService],
    templateUrl: 'stats-component.html'
})
export class ReservationsStatsComponent {
    _countReservations = 0;
    _countReservationsMonth = 0;
    _countClients = 0;
    _countClientsMonth = 0;
    _countReviews = 0;
    _countPendingReviews=0;
    
    constructor(private reservationsService: ReservationsService){    
    }
    
     dropdownItems = [
        { name: 'Quinta Odin', code: 'Odn1' },
        { name: 'Quinta Vera', code: 'Vera1' },
        { name: 'Cabaña Lola', code: 'Lola1' }
    ];

    dropdownItem = this.dropdownItems[0];
    
    async ngOnInit(){
       await this.reservationsService.countReservations
       .subscribe((count) => (this._countReservations = count));

       await this.reservationsService.countReservations
       .subscribe((count) => (this._countReservationsMonth = count));

       await this.reservationsService.countClients
       .subscribe((count) => (this._countClients = count));

        await this.reservationsService.countClients
       .subscribe((count) => (this._countClientsMonth = count));

       await this.reservationsService.countReviews 
       .subscribe((count) => (this._countReviews = count));

       await this.reservationsService.countPendingReviews 
       .subscribe((count) => (this._countReviews = count));

       
    }
}
