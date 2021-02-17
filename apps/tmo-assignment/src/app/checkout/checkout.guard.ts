import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';

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
    return this.store
      .select((state) => state.cart)
      .pipe(
        take(1),
        switchMap(async (cart) => {
          return cart && cart.items && cart.items.length
            ? true
            : this.router.navigate(['/cart']);
        })
      );
  }

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
}
