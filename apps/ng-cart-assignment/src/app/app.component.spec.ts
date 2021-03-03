import { fakeAsync, TestBed } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreComponent } from './core/core/core.component';

describe('AppComponent', () => {
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        CoreModule,
      ],
      declarations: [AppComponent, CoreComponent],
      providers: [{provide: Router, useValue: router}]
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-cart-assignment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-cart-assignment');
  });

  it('should load the lazy modules: cart', () => {
    router.navigate(['/cart']);
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should load the lazy modules: orders', () => {
    router.navigate(['/orders']);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should load the lazy modules: books', () => {
    router.navigate(['/books']);
    expect(router.navigate).toHaveBeenCalled();
  });
});
