import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG modules
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PropertyDto } from '../../../core/models/property.dto';
import { mockGuests } from '../../../core/mocks/mockGuests';
import { SelectModule} from 'primeng/select';
import { ReservationDto } from '../../../core/models/reservation.dto';
import { mockReservations } from '../../../core/mocks/mockReservations';
import { UserDto } from '../../../core/models/user.dto';
import {DatePickerModule} from 'primeng/datepicker';
// Mocks & models (ajusta rutas según tu proyecto) 

@Component({
  selector: 'reservation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    
    AutoCompleteModule,
    // CalendarModule,
    // DropdownModule,
    DatePickerModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './reservation-dialog-component.html'
})
export class ReservationDialogComponent {
  // Control del dialog desde el padre (two-way)
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  // Propiedad asociada (opcional)
  @Input() property?: PropertyDto;

  // Emite la reserva creada al padre (opcional)
  @Output() saved = new EventEmitter<ReservationDto>();

  // Guests autocomplete data (dummy)
   allGuests: UserDto[] = mockGuests;
   filteredGuests: UserDto[] = [];
   selectedGuest?: UserDto | null = null;

  // existing user toggle
  isExistingUser = false;

  // dates
  checkInDate?: Date | null = null;
  checkOutDate?: Date | null = null;

  // packages
  packages = [
    { label: 'Hasta 100 personas - $10,000 MXN', value: { size: 100, price: 10000 } },
    { label: 'Hasta 150 personas - $15,000 MXN', value: { size: 150, price: 15000 } },
    { label: 'Hasta 250 personas - $20,000 MXN', value: { size: 250, price: 20000 } },
    { label: 'Hasta 400 personas - $30,000 MXN', value: { size: 400, price: 30000 } }
  ];
  selectedPackage?: { size: number; price: number } | null = null;

  totalPrice = 0;
  items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
  constructor(private messageService: MessageService) {}

  // Autocomplete: filtra por nombre (simple)
  filterGuests(event: AutoCompleteCompleteEvent) {
    const eventQuery = (event.query || '').toLowerCase();
     this.filteredGuests = this.allGuests.filter(g => (g.fullName || '').toLowerCase().includes(eventQuery));
  
  }

  // Cuando seleccionan un guest o cambian checkbox, se recalcula UI
  onGuestSelect() {
    // Si marcó "existing" pero seleccionó un guest sin email, se deja como está.
    // No hacemos más acciones (no enviamos correo).
  }

 
  // Abre el dialog (método útil si el componente se controla internamente)
  open(property?: PropertyDto) {
    if (property) this.property = property;
    this.visible = true;
    this.visibleChange.emit(true);
  }

  // Cerrar dialog
  close() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  // Guardar reserva en memoria y emitir evento
  saveReservation() {
    // Nombre obligatorio (simple validation)
    if (!this.selectedGuest || !this.selectedGuest.fullName) {
      this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Ingrese el nombre del huésped' });
      return;
    }

    const newRes: ReservationDto = {
      id: 'res-' + Math.floor(Math.random() * 90000 + 10000).toString(),
      property: this.property ?? { id: 'unknown', title: 'Sin propiedad', description: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), tenantId: '' },
      guest: this.selectedGuest,
      checkInDate: this.checkInDate ? this.checkInDate.toISOString() : new Date().toISOString(),
      checkOutDate: this.checkOutDate ? this.checkOutDate.toISOString() : new Date().toISOString(),
      totalPrice: this.totalPrice,
      status: 'Confirmada',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Insertar en memoria (mock array)
    mockReservations.push(newRes);

    // Toast success
    this.messageService.add({ severity: 'success', summary: 'Reserva creada', detail: `Reserva ${newRes.id} guardada.` });

    // Emitir al padre
    this.saved.emit(newRes);

    // Cerrar y reset
    this.close();
  }

  resetForm() {
    this.selectedGuest = null;
    this.filteredGuests = [];
    this.isExistingUser = false;
    this.checkInDate = null;
    this.checkOutDate = null;
    this.selectedPackage = null;
    this.totalPrice = 0;
  }

  // si alguno de los inputs cambia en template, recalcular
  onPackageChange(event: any) {

    const selected = event.value;
    this.totalPrice = selected?.value?.price ?? 0; 
}
}