import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../src/app/shared/material.module';

import { CollectionCardComponent } from './collection-card.component';

describe('CollectionCardComponent', () => {
  let component: CollectionCardComponent;
  let fixture: ComponentFixture<CollectionCardComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionCardComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      providers: [
        {provide: Router, useValue: router}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect book details page', () => {
    component.viewItem('bookId');
    expect(router.navigate).toHaveBeenCalledTimes(1);
  })
});
