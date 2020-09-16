import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { AppProduct } from '../../../shared/models/app-products';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[];
  subscription: Subscription;
  tableResource: DataTableResource<AppProduct>;
  items: AppProduct[]= [];
  itemCount: number;
  
  constructor(private productService: ProductService) { 
   this.subscription =  this.productService.getAll()
  .subscribe(products => { 
        this.products = products
      
        this.initializeTable(products);  // Initializing data-table here
      });
     
  }

  private initializeTable(products: AppProduct[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })  // Gets all the records for the current page based on the current parameter | offset: 0 means page 1
     .then(items => this.items = items);
    this.tableResource.count() // Total records in out table
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource)
      return;

    this.tableResource.query(params) // Gets all the records for the current page based on the current parameter | offset: 0 means page 1
       .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
