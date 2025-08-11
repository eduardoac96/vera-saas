import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common'; 
import { Product, ProductService } from '@/pages/service/product.service';
import { Menu } from "primeng/menu";

@Component({
    standalone: true,
    selector: 'app-reservations-component',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, Menu],
    templateUrl: './reservations-table-component.html',
    providers: [ProductService]
})
export class ReservationsTableComponent {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data));
    }

      items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus', command: () => this.addNewNotification() },
        { label: 'Remove', icon: 'pi pi-fw pi-trash',  command: () => this.removeNotifications() }
    ];

    addNewNotification(){
        console.log("TODO");
    }

    removeNotifications(){
        console.log("TODO REMOVE")
    }
}
