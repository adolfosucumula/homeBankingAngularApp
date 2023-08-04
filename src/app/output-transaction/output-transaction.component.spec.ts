import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTransactionComponent } from './output-transaction.component';

describe('OutputTransactionComponent', () => {
  let component: OutputTransactionComponent;
  let fixture: ComponentFixture<OutputTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputTransactionComponent]
    });
    fixture = TestBed.createComponent(OutputTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
