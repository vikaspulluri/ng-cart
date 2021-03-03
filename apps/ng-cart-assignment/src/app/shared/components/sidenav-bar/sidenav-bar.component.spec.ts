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
import { AppFacade } from '../../../store/app.facade';
import { MaterialModule } from '../../material.module';

import { SidenavBarComponent } from './sidenav-bar.component';

describe('SidenavBarComponent', () => {
  let component: SidenavBarComponent;
  let fixture: ComponentFixture<SidenavBarComponent>;
  let store: MockStore;
  let appFacade: AppFacade;
  const initialState = {
    cart: {
      items: [],
    },
    order: {
      collections: [],
      addresses: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavBarComponent],
      imports: [BrowserAnimationsModule, MaterialModule, RouterTestingModule],
      providers: [provideMockStore({initialState}), AppFacade],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    appFacade = TestBed.inject(AppFacade);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SidenavBarComponent);
    component = fixture.componentInstance;
    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the cart state', (done) => {
    const state = {
      cart: {
        items: [{ quantity: 1, product: mockBooks[0] }],
      },
    };
    store.setState(state);
    fixture.detectChanges();
    expect(component.navItems).toBeTruthy();
    done();
  });

  it('should update the collections state', (done) => {
    const state = {
      order: {
        collections: [
          {
            items: [{ quantity: 1, product: mockBooks[0] }],
          },
        ],
      },
    };
    store.setState(state);
    fixture.detectChanges();
    expect(component.navItems).toBeTruthy();
    done();
  });

});
