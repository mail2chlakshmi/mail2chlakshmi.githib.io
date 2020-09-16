import { Component, Input } from '@angular/core';
import { AppProduct } from '../../models/app-products';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
   @Input('product') product: AppProduct;
   @Input('show-actions') showActions = true;
   @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart()  {
    this.cartService.addToCart(this.product);
  }
}
