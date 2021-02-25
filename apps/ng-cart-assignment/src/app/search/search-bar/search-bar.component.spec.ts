import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { SharedFacade } from '../../shared/store/shared.facade';
import { SearchFacade } from '../store/search.facade';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let store: MockStore;
  let searchFacade: SearchFacade;
  let sharedFacade: SharedFacade;
  const initialState = {
    books: {},
    search: {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [provideMockStore({ initialState }), SearchFacade, SharedFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    searchFacade = TestBed.inject(SearchFacade);
    sharedFacade = TestBed.inject(SharedFacade);
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    component.label = 'Search';
    component.value = '';
    component.placeholder = 'Search';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch store event', fakeAsync(() => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    const search = fixture.debugElement.query(By.css('#search'));
    search.nativeElement.value = 'angular';
    search.nativeElement.dispatchEvent(new Event('input'));
    tick(500);
    fixture.detectChanges();
    expect(storeDispatchSpy).toHaveBeenCalled();
  }));
});
