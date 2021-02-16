import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../../../src/app/cart/cart.model';
import { trackByFn } from '../../../../src/app/core/core.utility';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input('item') item: { quantity: number; product: CartItem };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewItem(id: string | undefined) {
    this.router.navigate(['/books', id]);
  }
}
