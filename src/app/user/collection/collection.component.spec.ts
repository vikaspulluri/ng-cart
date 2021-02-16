import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { mockBooks } from 'src/test/mocks';

import { CollectionComponent } from './collection.component';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let store: MockStore;

  let initialState = {
    user: {
      collections: [
        {
          orderId: 'ORDER-12345',
          user: {
            firstName: 'Vikas',
            lastName: 'Pulluri',
            email: 'vik@gmail.com',
            address: 'Some street'
          },
          items: [
            {
              quantity: 1,
              product: mockBooks[0]
            }
          ]
        }
      ]
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionComponent ],
      imports: [MaterialModule],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
