import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout'; 
import { Landing } from './app/features/landing/landing';
import { Dashboard } from '@/features/admin/reservations-panel';
 
export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'auth', loadChildren: () => import('./app/core/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
