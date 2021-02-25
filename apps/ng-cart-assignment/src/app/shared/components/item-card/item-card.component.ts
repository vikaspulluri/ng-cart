import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../../cart/cart.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input('item') item: CartItem;
  @Input('options') options: {classNames: string[]};
  @Input('quantity') quantity = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
