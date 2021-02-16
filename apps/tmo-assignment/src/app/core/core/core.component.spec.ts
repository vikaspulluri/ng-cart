import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SidenavBarComponent } from '../../../../src/app/shared/components/sidenav-bar/sidenav-bar.component';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { SharedModule } from '../../../../src/app/shared/shared.module';
import { mockBooks } from '../../../../src/test/mocks';
import { mapQuantityWithObject } from '../core.utility';

import { CoreComponent } from './core.component';

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreComponent, SidenavBarComponent ],
      providers: [
        provideMockStore({})
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the shared state', fakeAsync(() => {
    let state = {
      shared: {
        progressBar: false
      }
    }
    store.setState(state);
    tick();
    expect(component.progressbar).toBeUndefined();
  }))

  it('should not map quantity with object', () => {
    const items = [
      {
        quantity: 1,
        product: mockBooks[0]
      }
    ];
    const quantityMap = mapQuantityWithObject(items);
    expect(quantityMap).toBeTruthy();
  })
});
