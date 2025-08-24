// property-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyDataService {
  private propertyData: any;

  setPropertyData(data: any) {
    this.propertyData = data;
  }

  getPropertyData() {
    return this.propertyData;
  }

  clearPropertyData() {
    this.propertyData = null;
  }
}