import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { mockBooks } from '../../../../src/test/mocks';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { AppFacade } from '../../store/app.facade';

import { CollectionComponent } from './collection.component';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let store: MockStore;
  let appFacade: AppFacade;
  let commonUtilService: CommonUtilService;
  const initialState = {
    user: {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionComponent, ItemCardComponent],
      imports: [MaterialModule],
      providers: [provideMockStore({ initialState }), AppFacade, CommonUtilService],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    appFacade = TestBed.inject(AppFacade);
    commonUtilService = TestBed.inject(CommonUtilService);
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the state', () => {
    const state = {
      user: {
        collections: [
          {
            orderId: 'ORDER-12345',
            user: {
              firstName: 'Vikas',
              lastName: 'Pulluri',
              email: 'vik@gmail.com',
              address: 'Some street',
            },
            items: [
              {
                quantity: 1,
                product: mockBooks[0],
              },
            ],
          },
        ],
      }
    };
    store.setState(state);
    expect(state.user.collections.length).toEqual(1);
  });
});
