import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePicker } from "primeng/datepicker";
import { FormsModule } from '@angular/forms';
import {DatePickerModule} from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-reservation-edit-dialog',
  templateUrl: './reservation-edit-dialog-component.html',
  imports: [ DatePickerModule, SelectModule, FormsModule, DialogModule, InputTextModule, ButtonModule]
})
export class ReservationEditDialogComponent implements OnInit {
  @Input() visible: boolean = false; // controla si el dialog se abre
  @Input() reservation: any;         // reservación actual a editar
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  packageOptions: any[] = [];
  editedReservation: any = {};
  checkInDate?: Date | null = null;
   totalPrice = 0;
    selectedPackage?: { size: number; price: number } | null = null;

  ngOnInit() {
    this.packageOptions = [
      { label: 'Hasta 100 personas - $10,000 MXN', value: { size: 100, price: 10000 } },
      { label: 'Hasta 150 personas - $15,000 MXN', value: { size: 150, price: 15000 } },
      { label: 'Hasta 250 personas - $20,000 MXN', value: { size: 250, price: 20000 } },
      { label: 'Hasta 400 personas - $30,000 MXN', value: { size: 400, price: 30000 } }
    ];

    if (this.reservation) {
      this.editedReservation = { ...this.reservation };
    }
  }
 onPackageChange(event: any) {

    const selected = event.value;
    this.totalPrice = selected?.value?.price ?? 0; 
}
  saveReservation() {
    this.onSave.emit(this.editedReservation);
    this.visible = false;
  }

  close() {
    this.onClose.emit();
    this.visible = false;
  }
}
