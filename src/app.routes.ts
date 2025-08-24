import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout'; 
import { Landing } from './app/features/landing/landing';
 import { CreatePropertyComponent } from './app/features/admin/components/create-property.component';
import { ReservationsPanelComponent } from '@/features/admin/reservations-panel';
import { PreviewPropertyComponent } from '@/features/admin/preview-property-component';
 
export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: ReservationsPanelComponent },
            { path: 'create', component: CreatePropertyComponent},
            { path: 'preview-property', component: PreviewPropertyComponent },

        ]
    },
    { path: 'landing', component: Landing },
    { path: 'auth', loadChildren: () => import('./app/core/auth/auth.routes') }, 
    { path: '**', redirectTo: '/notfound' }
];
