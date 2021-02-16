import { fakeAsync, TestBed } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreComponent } from './core/core/core.component';

describe('AppComponent', () => {
  let store: MockStore;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        CoreModule
      ],
      declarations: [
        AppComponent,
        CoreComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tmo-assignment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tmo-assignment');
  });

  it('should load the lazy modules: cart', () => {
    router.navigate(['/cart']);
  })
  it('should load the lazy modules: user', () => {
    router.navigate(['/user']);
  })
  it('should load the lazy modules: checkout', () => {
    router.navigate(['/checkout']);
  })

  it('should load the lazy modules: checkout', () => {
    router.navigate(['/book']);
  })
});
