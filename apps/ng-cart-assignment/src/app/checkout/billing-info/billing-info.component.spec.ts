import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { mockBooks } from '../../../../src/test/mocks';
import { AppFacade } from '../../store/app.facade';

import { BillingInfoComponent } from './billing-info.component';

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let store: MockStore;
  let router: Router;
  let snackbar: SnackbarService;
  let appFacade: AppFacade;
  const initialState = {
    user: {
      collections: [],
      addresses: [],
    },
    cart: {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingInfoComponent],
      providers: [provideMockStore({ initialState }), SnackbarService, AppFacade],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    snackbar = TestBed.inject(SnackbarService);
    appFacade = TestBed.inject(AppFacade);
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the state', () => {
    const state = {
      cart: {
        items: [{ quantity: 1, product: mockBooks[0] }],
      },
    };
    store.setState(state);
    expect(component.items[0].quantity).toEqual(1);
  });

  it('should not purchase the cart items', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.purchase();
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('should purchase the cart items', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.userForm.controls.firstName.setValue('Vikas');
    component.userForm.controls.lastName.setValue('Pulluri');
    component.userForm.controls.email.setValue('Vikas@gmail.com');
    component.userForm.controls.phone.setValue(1234567890);
    component.userForm.controls.address.setValue('Vikas address');
    component.purchase();
    expect(component.userForm.valid).toBeTrue();
    expect(storeDispatchSpy).toHaveBeenCalled();
  });
});
