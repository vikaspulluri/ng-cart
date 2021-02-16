import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { navItems } from '../../shared/sidenav.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  navItems = [...navItems];
  constructor() { }

  ngOnInit(): void {
    this.navItems.shift();
  }

}
