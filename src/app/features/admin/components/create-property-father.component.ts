// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { ComponentB } from '../reservations-preview';
import { animate, style, transition, trigger } from '@angular/animations';
import { CreatePropertyComponent } from "./create-property.component";
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ComponentB, CreatePropertyComponent],
  template: `
    <main class="page">
      <h2 class="title">Demo: Component A ↔ Component B (bindings + anim)</h2>

      <div class="card-wrap">
        <!-- Componente A: edit -->
        <section *ngIf="showA" @fade class="card">
          <create-property-component (submitValues)="handleSubmit($event)"></create-property-component>
        </section>

        <!-- Componente B: preview -->
        <section *ngIf="!showA" @fade class="card">
          <app-b [data]="currentData" (back)="handleBack()"></app-b>
        </section>
      </div>
    </main>
  `
  ,
  styles: [`
    :host { display:block; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 2rem; background:#f5f7fb; min-height:100vh; color:#222; }
    .title { margin:0 0 1rem 0; font-weight:600; color:#1f2937; }
    .card-wrap { max-width:720px; margin: 1rem auto; }
    .card { background: #ffffff; border-radius: 12px; box-shadow: 0 6px 22px rgba(16,24,40,0.08); padding: 1.25rem; }
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
export class ComponentFather {
  showA = true;
  currentData: { fullName?: string; email?: string; phone?: string } = {};

  handleSubmit(payload: { fullName: string; email: string; phone: string }) {
    // recibimos los valores del componente A y cambiamos a B
    this.currentData = { ...payload };
    this.showA = false;
  }

  handleBack() {
    // volvemos a A (podrías mantener currentData si quieres)
    this.showA = true;
  }
}
