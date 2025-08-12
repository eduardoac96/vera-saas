import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout'; 
import { Landing } from './app/features/landing/landing';
import { Dashboard } from './app/features/admin/reservations-panel';
import { CreatePropertyComponent } from './app/features/admin/components/create-property.component';
 
export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'create', component: CreatePropertyComponent}
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'auth', loadChildren: () => import('./app/core/auth/auth.routes') }, 
    { path: '**', redirectTo: '/notfound' }
];
