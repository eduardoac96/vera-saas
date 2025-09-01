// src/app/component-b.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type Amenity = { id?: string; name: string; icon?: string };
type MediaItem = { type: 'image' | 'youtube'; url: string; thumbnail?: string };
type PricingLevel = { minGuests: number; maxGuests: number; price: number };

@Component({
  selector: 'app-b',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preview-root">
      <header class="header">
        <div>
          <h2 class="property-title">{{ data?.propertyName || '—' }}</h2>
          <div class="meta">
            <span class="slug" *ngIf="data?.slug">/{{ data?.slug }}</span>
            <span class="meta-keywords" *ngIf="data?.metaKeywords">· {{ data?.metaKeywords }}</span>
          </div>
          <!-- <p class="muted small" *ngIf="data?.shortDescription">{{ data.shortDescription }}</p> -->
        </div>

        <div class="controls">
          <button class="btn btn-ghost" (click)="back.emit()">Back</button>
        </div>
      </header>

      <section class="gallery">
        <h3>Gallery</h3>
        <div *ngIf="(data?.mediaItems || []).length > 0; else noMedia" class="media-grid">
          <div *ngFor="let m of data!.mediaItems" class="media-item">
            <img *ngIf="m.type === 'image'" [src]="m.url" alt="image" />
            <div *ngIf="m.type === 'youtube'" class="youtube-card">
              <img [src]="youtubeThumbnail(m.url)" alt="youtube" />
              <div class="yt-badge">YouTube</div>
            </div>
          </div>
        </div>
        <ng-template #noMedia>
          <div class="empty">No media uploaded.</div>
        </ng-template>
      </section>

      <section class="two-col">
        <div>
          <h3>Full description</h3>
          <p class="full-desc">{{ data?.fullDescription || '—' }}</p>
        </div>

        <div>
          <h3>Amenities</h3>
          <div *ngIf="(data?.selectedAmenities || []).length > 0; else noAmenities" class="amenities">
            <span *ngFor="let a of data!.selectedAmenities" class="badge">{{ a.name }}</span>
          </div>
          <ng-template #noAmenities>
            <div class="empty">No amenities selected.</div>
          </ng-template>

          <h3 class="mt-6">SEO keywords</h3>
          <div class="muted small">{{ data?.metaKeywords || '—' }}</div>
        </div>
      </section>

      <section class="availability">
        <h3>Availability</h3>
        <div class="grid-two">
          <div>
            <div class="muted small">Calendar mode</div>
            <div>{{ data?.calendarView || 'single' }}</div>

            <div class="muted small mt-3">Selected range</div>
            <div *ngIf="data?.rangeDates?.length === 2">
              <!-- {{ data.rangeDates[0] | date:'mediumDate' }} — {{ data.rangeDates[1] | date:'mediumDate' }} -->
            </div>
            <!-- <div *ngIf="!data?.rangeDates || data.rangeDates.length !== 2">—</div> -->
          </div>

          <div>
            <div class="muted small">Blocked dates</div>
            <ul *ngIf="(data?.blockedDates || []).length > 0" class="blocked-list">
              <li *ngFor="let bd of data!.blockedDates">{{ bd | date:'mediumDate' }}</li>
            </ul>
            <div *ngIf="!(data?.blockedDates || []).length" class="empty">No blocked dates.</div>
          </div>
        </div>
      </section>

      <section class="pricing">
        <h3>Pricing levels</h3>
        <div *ngIf="(data?.pricingLevels || []).length > 0; else noPricing" class="pricing-grid">
          <div *ngFor="let p of data!.pricingLevels" class="pricing-card">
            <div class="range">{{ p.minGuests }} - {{ p.maxGuests }} guests</div>
            <div class="price">{{ formatCurrency(p.price) }}</div>
          </div>
        </div>
        <ng-template #noPricing>
          <div class="empty">No pricing configured.</div>
        </ng-template>

        <div class="muted small mt-3">
          Example price for 4 guests:
          <strong>{{ getPriceForExample(4) | currency:'MXN':'symbol':'1.0-0' }}</strong>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display:block; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#111827; }
    .header { display:flex; justify-content:space-between; gap:1rem; align-items:flex-start; margin-bottom:1rem; }
    .property-title { margin:0; font-size:1.25rem; }
    .meta { color:#6b7280; font-size:0.9rem; margin-top:6px; }
    .muted { color:#6b7280; }
    .small { font-size:0.9rem; }
    .controls { display:flex; gap:8px; }
    .btn { padding:8px 12px; border-radius:8px; font-weight:600; cursor:pointer; border:1px solid #e6edf3; background:white; }
    .btn-ghost { background: transparent; border:1px solid #e6edf3; }

    .gallery { margin: 1rem 0; }
    .media-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:12px; }
    .media-item img { width:100%; height:140px; object-fit:cover; border-radius:8px; display:block; }
    .youtube-card { position:relative; }
    .yt-badge { position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:white; padding:4px 8px; border-radius:4px; font-size:12px; }

    .two-col { display:grid; grid-template-columns:1fr 340px; gap:18px; margin:1rem 0; }
    .full-desc { white-space:pre-wrap; color:#111827; }

    .amenities { display:flex; flex-wrap:wrap; gap:8px; margin-top:6px; }
    .badge { background:#eef2ff; color:#3730a3; padding:6px 10px; border-radius:999px; font-weight:600; font-size:13px; }

    .availability { margin:1rem 0; }
    .grid-two { display:flex; gap:24px; }
    .blocked-list { list-style:none; padding:0; margin:8px 0 0 0; color:#374151; }
    .blocked-list li { padding:6px 0; border-bottom:1px solid #f3f4f6; }

    .pricing { margin:1rem 0; }
    .pricing-grid { display:flex; gap:12px; flex-wrap:wrap; }
    .pricing-card { background:white; border:1px solid #e6eef6; padding:12px; border-radius:8px; min-width:160px; text-align:center; }
    .range { color:#6b7280; font-weight:700; }
    .price { color:#0f172a; font-weight:800; font-size:1.05rem; margin-top:6px; }

    .empty { color:#9ca3af; padding:8px 0; }
    @media (max-width: 900px) {
      .two-col { grid-template-columns: 1fr; }
      .grid-two { flex-direction:column; }
    }
  `]
})
export class ComponentB {
  @Input() data?: {
    propertyName?: string;
    slug?: string;
    shortDescription?: string;
    fullDescription?: string;
    metaKeywords?: string;
    selectedAmenities?: Amenity[];
    mediaItems?: MediaItem[];
    calendarView?: 'single'|'range';
    rangeDates?: Date[];
    blockedDates?: Date[];
    pricingLevels?: PricingLevel[];
  };

  @Output() back = new EventEmitter<void>();

  youtubeThumbnail(url?: string) {
    if (!url) return '';
    try {
      // extrae video id simple (soporta urls típicas)
      const m = url.match(/(?:v=|\/embed\/|\.be\/)([A-Za-z0-9_-]{6,})/);
      const id = m ? m[1] : null;
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
    } catch {
      return '';
    }
  }

  formatCurrency(amount?: number) {
    if (amount == null) return '—';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  }

  getPriceForExample(guests: number) {
    const levels = this.data?.pricingLevels || [];
    const found = levels.find(l => guests >= l.minGuests && guests <= l.maxGuests);
    return found ? found.price : (levels.length ? levels[0].price : 0);
  }
}
