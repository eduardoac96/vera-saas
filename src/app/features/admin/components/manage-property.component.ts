// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { ManagePropertyPreviewComponent } from '../manage-property-preview.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { ManagePropertyFormComponent } from "./manage-property-form.component";
import { PropertyDto } from '../../../core/models/property.dto';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ManagePropertyPreviewComponent, ManagePropertyFormComponent, ManagePropertyPreviewComponent],
  template: `
      <div class="card mb-8!">
      <!-- <div class="card mb-8!"> -->
        <!-- Componente A: edit -->
        <div *ngIf="showA" @fade class="card">
          <manage-property-form (submitValues)="handleSubmit($event)"></manage-property-form>
        </div>

        <!-- Componente B: preview -->
        <div *ngIf="!showA" @fade class="card"> 
          <manage-property-preview [data]="currentData" (back)="handleBack()"></manage-property-preview>
        </div>
      <!-- </div> -->
      </div>
  `
  ,
  styles: [`
    :host { display:block; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 2rem; background:#f5f7fb; min-height:100vh; color:#222; }
    .title { margin:0 0 1rem 0; font-weight:600; color:#1f2937; }  
  `]
  ,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('300ms cubic-bezier(.2,.9,.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('220ms cubic-bezier(.4,0,.2,1)', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ])
  ]
})
export class ManagePropertyComponent {
  showA = true;
  currentData: PropertyDto = {} as PropertyDto;

  handleSubmit(payload: PropertyDto) {
    // recibimos los valores del componente A y cambiamos a B
    this.currentData = { ...payload };
 
    this.showA = false;
  }

  handleBack() {
    // volvemos a A (podrías mantener currentData si quieres)
    this.showA = true;
  }
}
