import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 
export interface Product {
    id?: string;
    name?: string;
    description?: string; 
    separo: boolean;
    contacted: boolean;
    signed: boolean;
    eventDate: string;
    
}

@Injectable()
export class ProductService {
    getProductsData() {
        return [
        
            {
                id: '1005', 
                name: 'Eduardo Alvarado',
                description: 'Product Description', 
                separo: true,
                contacted: false,
                signed: true,
                eventDate: '2025-01-02 3pm-11pm 100 personas 5000MXN.'  
            },
                  {
                id: '1005', 
                name: 'Eduardo Alvarado',
                description: 'Product Description', 
                separo: true,
                contacted: false,
                 signed: true,
                eventDate: '2025-01-02 3pm-11pm 100 personas 5000MXN.'  
            },
                   {
                id: '1005', 
                name: 'Eduardo Alvarado',
                description: 'Product Description', 
                separo: true,
                 signed: true,
                contacted: false,
                eventDate: '2025-01-02 3pm-11pm 100 personas 5000MXN.'  
            },
                   {
                id: '1005', 
                name: 'Eduardo Alvarado',
                description: 'Product Description', 
                separo: true,
                 signed: true,
                contacted: true,
                eventDate: '2025-01-03 3pm-11pm 100 personas 5000MXN.'  
            },
                   {
                id: '1005', 
                name: 'Eduardo Alvarado',
                description: 'Product Description', 
                separo: true,
                contacted: false,
                 signed: true,
                eventDate: '2025-01-05 3pm-11pm 100 personas 5000MXN.'  
            },
                   {
                id: '1005', 
                name: 'Eduardo Alvarado',
                description: 'Product Description', 
                separo: true,
                contacted: true,
                 signed: true,
                eventDate: '2025-01-07 3pm-11pm 100 personas 5000MXN.'  
            },
        ];
    }
 
 
 
    constructor(private http: HttpClient) {}

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }


    generateId() {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
 
 
}
