// Angular core imports
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ ADDED

// Interface for inventory item structure
interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule // ✅ FIX FOR *ngIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Inventory Management System - Part 2';

  items: InventoryItem[] = [];

  newItem: InventoryItem = {
    id: 0,
    name: '',
    category: '',
    price: 0,
    inStock: true
  };

  filteredItems: InventoryItem[] = [];

  constructor(public router: Router) {}

  addItem(): void {
    if (this.newItem.id <= 0 || !this.newItem.name || !this.newItem.category || this.newItem.price < 0) {
      alert('Error: Please fill all fields correctly!');
      return;
    }

    const duplicate = this.items.some(item => item.id === this.newItem.id);
    if (duplicate) {
      alert('Error: Item ID already exists!');
      return;
    }

    this.items.push({ ...this.newItem });
    this.newItem = { id: 0, name: '', category: '', price: 0, inStock: true };
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  toggleStock(id: number): void {
    const item = this.items.find(item => item.id === id);
    if (item) item.inStock = !item.inStock;
  }

  searchItems(keyword: string): void {
    const lowerKeyword = keyword.toLowerCase().trim();
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(lowerKeyword)
    );
  }
}