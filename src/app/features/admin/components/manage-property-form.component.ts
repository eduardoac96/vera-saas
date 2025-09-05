// create-property.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect'; 
import { InputNumberModule } from 'primeng/inputnumber'; 
import { PropertyDto } from '../../../core/models/property.dto';


interface Amenity {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  selected: boolean;
}
interface MediaItem {
  url: string;
  type: 'image' | 'youtube';
}

@Component({
  selector: 'manage-property-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FluidModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    SelectModule,
    SelectButtonModule,
    TextareaModule,
    DatePickerModule,
    FileUploadModule,
    ChipModule,
    DialogModule,
    MultiSelectModule
  ],
  templateUrl: './manage-property-form.component.html'
})
export class ManagePropertyFormComponent {

  @Input() data: PropertyDto = {} as PropertyDto; 
  @Output() submitValues = new EventEmitter<PropertyDto>();

  // Información básica
 

  constructor() {
    // Agregar un nivel inicial
    this.addPricingLevel();
    this.filteredAmenities = [...this.allAmenities]; 
  }
  
  
  onSubmit() {
      this.submitValues.emit(this.data); // model es un PropertyDto
  }

  // Métodos para precios escalonados
  addPricingLevel() {
    const lastLevel = this.data && this.data.pricingLevels && this.data.pricingLevels.length > 0
      ? this.data.pricingLevels[this.data.pricingLevels.length - 1]
      : null;
    const min = lastLevel ? lastLevel.maxGuests + 1 : 1;
    
    this.data?.pricingLevels?.push({
      minGuests: min,
      maxGuests: min,
      price: 1000
    });
  }

  removePricingLevel(index: number) {
    this.data?.pricingLevels?.splice(index, 1);
    
    // Si se elimina todo, agregar un nivel vacío
    if (this.data?.pricingLevels?.length === 0) {
      this.addPricingLevel();
    }
  }

  // ... (resto del código) ...

  // Envío del formulario
  
  // Fechas y disponibilidad
  blockedDates: Date[] = [];
  rangeDates: Date[] = [];
  calendarView: 'single' | 'range' = 'single';
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  // Multimedia
  uploadedFiles: any[] = [];
  mediaItems: MediaItem[] = [];
  youtubeUrl: string = '';
  showMediaDialog: boolean = false;

  // Amenidades
  amenities: Amenity[] = [
    { id: 'wifi', name: 'Wi-Fi', selected: false },
    { id: 'pool', name: 'Piscina', selected: false },
    { id: 'parking', name: 'Estacionamiento', selected: false },
    { id: 'ac', name: 'Aire Acondicionado', selected: false },
    { id: 'kitchen', name: 'Cocina', selected: false },
    { id: 'tv', name: 'Televisión', selected: false },
    { id: 'breakfast', name: 'Desayuno incluido', selected: false },
    { id: 'gym', name: 'Gimnasio', selected: false }
  ];

  // Configuración avanzada
  bedrooms: number = 1;
  bathrooms: number = 1;
  pricePerNight: number = 100;

  // Métodos para fechas
  blockDate() {
    if (this.calendarView === 'single' && this.rangeDates[0]) {
      this.blockedDates.push(new Date(this.rangeDates[0]));
      this.rangeDates = [];
    } else if (this.rangeDates.length === 2) {
      const start = new Date(this.rangeDates[0]);
      const end = new Date(this.rangeDates[1]);
      
      // Bloquear todas las fechas en el rango
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        this.blockedDates.push(new Date(d));
      }
      this.rangeDates = [];
    }
  }

  unblockDate(date: Date) {
    this.blockedDates = this.blockedDates.filter(d => d.getTime() !== date.getTime());
  }

  isDateBlocked(date: Date): boolean {
    return this.blockedDates.some(d => d.toDateString() === date.toDateString());
  }

  // Métodos para multimedia
  onUpload(event: any) {
    for (const file of event.files) {
      this.mediaItems.push({
        url: URL.createObjectURL(file),
        type: 'image'
      });
    }
  }

  addYoutubeVideo() {
    if (this.youtubeUrl) {
      // Extraer ID del video de YouTube
      const videoId = this.extractYoutubeId(this.youtubeUrl);
      if (videoId) {
        this.mediaItems.push({
          url: videoId,
          type: 'youtube'
        });
        this.youtubeUrl = '';
        this.showMediaDialog = false;
      }
    }
  }

  private extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  removeMedia(index: number) {
    this.mediaItems.splice(index, 1);
  }

  allAmenities: Amenity[] = [
    { id: 'wifi', name: 'Wi-Fi', icon: 'pi pi-wifi', category: 'conectividad', selected: false },
    { id: 'pool', name: 'Piscina', icon: 'pi pi-water', category: 'exteriores', selected: false },
    { id: 'parking', name: 'Estacionamiento', icon: 'pi pi-car', category: 'exteriores', selected: false },
    { id: 'ac', name: 'Aire Acondicionado', icon: 'pi pi-snowflake', category: 'climatización', selected: false },
    { id: 'heating', name: 'Calefacción', icon: 'pi pi-sun', category: 'climatización', selected: false },
    { id: 'kitchen', name: 'Cocina equipada', icon: 'pi pi-utensils', category: 'cocina', selected: false },
    { id: 'tv', name: 'Televisión', icon: 'pi pi-desktop', category: 'entretenimiento', selected: false },
    { id: 'breakfast', name: 'Desayuno incluido', icon: 'pi pi-coffee', category: 'servicios', selected: false },
    { id: 'gym', name: 'Gimnasio', icon: 'pi pi-heart', category: 'instalaciones', selected: false },
    { id: 'washer', name: 'Lavadora', icon: 'pi pi-replay', category: 'cocina', selected: false },
    { id: 'dryer', name: 'Secadora', icon: 'pi pi-sync', category: 'cocina', selected: false },
    { id: 'workspace', name: 'Espacio de trabajo', icon: 'pi pi-briefcase', category: 'instalaciones', selected: false },
    { id: 'hot-tub', name: 'Jacuzzi', icon: 'pi pi-heart', category: 'exteriores', selected: false },
    { id: 'bbq', name: 'Área de BBQ', icon: 'pi pi-fire', category: 'exteriores', selected: false },
    { id: 'fireplace', name: 'Chimenea', icon: 'pi pi-fire', category: 'climatización', selected: false },
    { id: 'security', name: 'Sistema de seguridad', icon: 'pi pi-shield', category: 'seguridad', selected: false },
    { id: 'pets', name: 'Permite mascotas', icon: 'pi pi-star', category: 'políticas', selected: false }
  ];
  
  filteredAmenities: Amenity[] = [];
  selectedAmenities: Amenity[] = [];
  amenityFilter: string = '';
  amenitiesReordered: boolean = false;
  
  amenityCategories = [
    { key: 'all', name: 'Todas' },
    { key: 'conectividad', name: 'Conectividad' },
    { key: 'exteriores', name: 'Exteriores' },
    { key: 'climatización', name: 'Climatización' },
    { key: 'cocina', name: 'Cocina' },
    { key: 'entretenimiento', name: 'Entretenimiento' },
    { key: 'servicios', name: 'Servicios' },
    { key: 'instalaciones', name: 'Instalaciones' },
    { key: 'seguridad', name: 'Seguridad' },
    { key: 'políticas', name: 'Políticas' }
  ];
  
  selectedCategory: string = 'all';
  
  // Variables para drag & drop
  draggedAmenity: Amenity | null = null;
  dragTargetIndex: number | null = null;
  
   
  // Filtrar comodidades
filterAmenities() {
    this.filteredAmenities = this.allAmenities.filter(amenity => {
      const matchesCategory = this.selectedCategory === 'all' || amenity.category === this.selectedCategory;
      const matchesText = amenity.name.toLowerCase().includes(this.amenityFilter.toLowerCase());
      return matchesCategory && matchesText;
    });
  }
  // Seleccionar categoría
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterAmenities();
  }
   // Alternar selección de comodidad
  toggleAmenitySelection(amenity: Amenity) {
    amenity.selected = !amenity.selected;
  }
  
  // Obtener número de comodidades seleccionadas
  getSelectedAmenitiesCount(): number {
    return this.allAmenities.filter(a => a.selected).length;
  }
  
  // Obtener severidad para etiquetas de categoría
  getCategorySeverity(category: string): string {
    const severityMap: Record<string, string> = {
      'conectividad': 'info',
      'exteriores': 'success',
      'climatización': 'warning',
      'cocina': 'help',
      'entretenimiento': 'danger',
      'servicios': 'info',
      'instalaciones': 'success',
      'seguridad': 'danger',
      'políticas': 'warning'
    };
    return severityMap[category] || 'info';
  }
  
  // Eventos de drag & drop
  onRowDragStart(event: any) {
    this.draggedAmenity = event.dragData;
  }
  
  onRowDragEnd() {
    this.draggedAmenity = null;
  }
 
  onRowDragEnter(event: any, index: number) {
    this.dragTargetIndex = index;
  }
  
  onRowDrop(event: any, index: number) {
    if (this.draggedAmenity) {
      const draggedIndex = this.filteredAmenities.findIndex(a => a.id === this.draggedAmenity!.id);
      
      // Reordenar elementos
      const newAmenities = [...this.filteredAmenities];
      newAmenities.splice(draggedIndex, 1);
      newAmenities.splice(index, 0, this.draggedAmenity!);
      
      this.filteredAmenities = newAmenities;
      this.amenitiesReordered = true;
    }
  }
  
  // Guardar nuevo orden
  saveAmenitiesOrder() {
    // Actualizar el arreglo principal con el nuevo orden
    const newOrderIds = this.filteredAmenities.map(a => a.id);
    this.allAmenities.sort((a, b) => {
      return newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id);
    });
    
    this.amenitiesReordered = false;
    this.selectedCategory = 'all';
    this.amenityFilter = '';
    this.filterAmenities();
    
   
  }
   
}

