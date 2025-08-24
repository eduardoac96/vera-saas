import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider'; 
import { AmenityDto } from '@/core/models/amenity.dto';
import { MediaItem } from './components/mediaitem';
import { SafeUrlPipe } from './components/safeurl.pipe';


@Component({
  selector: 'app-preview-property',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    GalleriaModule,
    ChipModule,
    DividerModule,
    SafeUrlPipe
  ],
  templateUrl: './preview-property-component.html'
})


export class PreviewPropertyComponent {
  @Input() propertyName: string = '';
  @Input() shortDescription: string = '';
  @Input() fullDescription: string = '';
  @Input() mediaItems: MediaItem[] = [];
  @Input() amenities: AmenityDto[] = [];
  @Input() maxGuests: number = 0;
  @Input() bedrooms: number = 0;
  @Input() bathrooms: number = 0;
  @Input() pricingLevels: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  get selectedAmenities(): AmenityDto[] {
    return this.amenities.filter(a => a.name);
  }

  get minPrice(): number {
    if (!this.pricingLevels.length) return 0;
    return Math.min(...this.pricingLevels.map(level => level.price));
  }

  get maxPrice(): number {
    if (!this.pricingLevels.length) return 0;
    return Math.max(...this.pricingLevels.map(level => level.price));
  }

  getPriceRange(): string {
    if (this.minPrice === this.maxPrice) {
      return `$${this.minPrice} MXN/noche`;
    }
    return `$${this.minPrice} - $${this.maxPrice} MXN/noche`;
  }

  getYoutubeEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }
}