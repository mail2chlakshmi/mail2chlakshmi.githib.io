import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProduct } from '../../../shared/models/app-products';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 categories$: Observable<any[]>;

 product: AppProduct = {
  category: '',
  imageUrl: '',
  price: null,
  title: '' ,
  key:'',
 }
 id: any;

  constructor(
     private router: Router,
     route: ActivatedRoute,
     categoryService: CategoryService ,
     private productService: ProductService) { 
     this.categories$ = categoryService.getAll();

     this.id = route.snapshot.paramMap.get('id');
    if(this.id) productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product: any) {
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
     
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
