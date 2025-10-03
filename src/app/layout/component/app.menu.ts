import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { ɵBrowserAnimationBuilder } from '@angular/animations';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, ToastModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
      
           
            {
                label: '',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    // {
                    //     label: 'Vera Web',
                    //     icon: 'pi pi-fw pi-globe',
                    //     routerLink: ['/landing']
                    // },
                    {
                        label: 'Administrador',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Administrar Propiedad',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/manage-property']
                            },
                            {
                                label: 'Panel de Reservas',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/']
                            },

                          
                        ]
                    }
                ]
            } 
     
             
        ];
    }
}
