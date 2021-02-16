import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.scss']
})
export class ActionBtnComponent implements OnInit {

  @Input('color') color?: string = 'primary';
  @Input('text') text?: string = 'Button';
  @Input('meta') meta?: {icon?: string, badge?: {count: number, size?: string, color?: string}} = {};
  @Output('clicked') clicked = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
