import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ReservationsNotificationComponent } from '../../features/admin/components/notification-component';
import { PopoverModule } from 'primeng/popover';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, ReservationsNotificationComponent, PopoverModule],
    templateUrl: './app.topbar.html'
})



export class AppTopbar {


    @Component({
        imports: [ReservationsNotificationComponent]
    })


    items!: MenuItem[];

    constructor(public layoutService: LayoutService) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
