import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout'; 
import { Landing } from './app/features/landing/landing';
 import { CreatePropertyComponent } from './app/features/admin/components/create-property.component';
import { ReservationsPanelComponent } from './app/features/admin/reservations-panel'; 
import { ComponentFather } from './app/features/admin/components/create-property-father.component';
 
export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: ReservationsPanelComponent },
            { path: 'create', component: CreatePropertyComponent},
            {path: 'father', component: ComponentFather},
        ]
    },
    { path: 'landing', component: Landing },

    { path: 'auth', loadChildren: () => import('./app/core/auth/auth.routes') }, 
    { path: '**', redirectTo: '/notfound' }
];
