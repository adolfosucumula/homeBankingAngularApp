import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogConfirmationComponent } from './alert-dialog-confirmation.component';

describe('AlertDialogConfirmationComponent', () => {
  let component: AlertDialogConfirmationComponent;
  let fixture: ComponentFixture<AlertDialogConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDialogConfirmationComponent]
    });
    fixture = TestBed.createComponent(AlertDialogConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
