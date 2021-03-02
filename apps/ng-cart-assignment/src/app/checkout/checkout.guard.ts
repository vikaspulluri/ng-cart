import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { AppFacade } from '../store/app.facade';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
      return this.appFacade
        .getCartItems()
        .pipe(
          take(1),
          switchMap(async (cartItems) => {
            return cartItems && cartItems.length ? true : this.router.navigate(['/cart']);
          })
        );
  }

  constructor(private router: Router, private appFacade: AppFacade) {}
}
