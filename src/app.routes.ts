import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout'; 
import { Landing } from './app/features/landing/landing';
 import { ReservationsPanelComponent } from './app/features/admin/reservations-panel'; 
import { ManagePropertyComponent } from './app/features/admin/components/manage-property.component';
  
export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: ReservationsPanelComponent }, 
            {path: 'manage-property', component: ManagePropertyComponent},
        ]
    },
    { path: 'landing', component: Landing },

    { path: 'auth', loadChildren: () => import('./app/core/auth/auth.routes') }, 
    { path: '**', redirectTo: '/notfound' }
];
