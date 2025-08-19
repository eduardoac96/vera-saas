// reservation-view.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ReservationDto } from '../../../core/models/reservation.dto';
import { ReservationsService } from '../../../core/services/reservations.service';
import { Dialog } from "primeng/dialog"; 
import { DatePipe, CurrencyPipe } from '@angular/common';
import { DatePicker } from "primeng/datepicker"; 
import { AutoComplete} from "primeng/autocomplete";
import { InputGroup, } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import {Toolbar} from "primeng/toolbar";
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-reservation-view',
  standalone: true,
  templateUrl: './reservation-view-component.html',
  imports: [Dialog, DatePipe, CurrencyPipe, ReactiveFormsModule, DatePicker, InputNumberModule],
})
export class ReservationViewComponent {
  @Input() reservation?: ReservationDto | null;
  @Output() saved = new EventEmitter<ReservationDto>();
  @Output() closed = new EventEmitter<void>(); 

  viewDialog = false;
  editDialog = false;
  editForm!: FormGroup;

  statusOptions = [
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationsService) {
    this.editForm = this.formBuilder.group({
      checkInDate: [null, Validators.required],
      checkOutDate: [null, Validators.required],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
      status: [null, Validators.required]
    });
  }

  // Métodos que llamará el parent (o que puedes llamar internamente)
  openView(reservation: ReservationDto) {
    this.reservation = reservation; 
 
    this.viewDialog = true;
  }

  openEdit(reservation: ReservationDto) {
    this.reservation = reservation;
    this.editForm.patchValue({
      checkInDate: reservation.checkInDate ? new Date(reservation.checkInDate) : null,
      checkOutDate: reservation.checkOutDate ? new Date(reservation.checkOutDate) : null,
      totalPrice: reservation.totalPrice,
      status: reservation.status
    });
    this.editDialog = true;
  }

  saveEdit() {
    if (!this.reservation || this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    const f = this.editForm.value;
    const updated: ReservationDto = {
      ...this.reservation,
      checkInDate: this.toIsoStringUTC(f.checkInDate),
      checkOutDate: this.toIsoStringUTC(f.checkOutDate),
      totalPrice: Number(f.totalPrice),
      status: f.status,
      updatedAt: new Date().toISOString()
    };
    this.reservationService.updateReservation(updated).subscribe(r => {
      this.saved.emit(r);
      this.editDialog = false;
    });
  }
  // handlers opcionales para outputs del viewer
  onSaved(updated: ReservationDto) {
    // manejar evento guardado
  } 
  

  closeDialogs() {
    this.viewDialog = false;
    this.editDialog = false;
    this.closed.emit();
  }

  private toIsoStringUTC(d: Date): string {
    if (!d) return new Date().toISOString();
    const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()));
    return utc.toISOString();
  }
}
