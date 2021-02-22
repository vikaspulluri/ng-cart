import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockBooks } from '../../../../../src/test/mocks';
import { MaterialModule } from '../../material.module';

import { SidenavBarComponent } from './sidenav-bar.component';

describe('SidenavBarComponent', () => {
  let component: SidenavBarComponent;
  let fixture: ComponentFixture<SidenavBarComponent>;
  let store: MockStore;
  const initialState = {
    cart: {
      items: [],
    },
    user: {
      collections: [],
      addresses: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavBarComponent],
      imports: [BrowserAnimationsModule, MaterialModule, RouterTestingModule],
      providers: [provideMockStore({})],
    });
    store = TestBed.inject(MockStore);
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the cart state', () => {
    const state = {
      cart: {
        items: [{ quantity: 1, product: mockBooks[0] }],
      },
    };

    store.setState(state);

    expect(component.navItems).toBeTruthy();
  });

  it('should update the collections state', () => {
    const state = {
      user: {
        collections: [
          {
            collection: [{ quantity: 1, product: mockBooks[0] }],
          },
        ],
      },
    };
    store.setState(state);
    expect(component.navItems).toBeTruthy();
  });
});
