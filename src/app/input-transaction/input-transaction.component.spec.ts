import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTransactionComponent } from './input-transaction.component';

describe('InputTransactionComponent', () => {
  let component: InputTransactionComponent;
  let fixture: ComponentFixture<InputTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTransactionComponent]
    });
    fixture = TestBed.createComponent(InputTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
