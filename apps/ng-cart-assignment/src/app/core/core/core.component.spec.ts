import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SidenavBarComponent } from '../../../../src/app/shared/components/sidenav-bar/sidenav-bar.component';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { AppFacade } from '../../store/app.facade';

import { CoreComponent } from './core.component';

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  let store: MockStore;
  let appFacade: AppFacade;
  const initialState = {
    progressbar: {
      visible: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoreComponent],
      providers: [provideMockStore({initialState}), AppFacade],
      imports: [BrowserAnimationsModule, MaterialModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    appFacade = TestBed.inject(AppFacade);
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the shared state', fakeAsync(() => {
    const state = {
      progressbar: {
        visible: true,
      },
    };
    store.setState(state);
    tick();
    expect(component.progressbar).toBeTrue();
  }));

});
