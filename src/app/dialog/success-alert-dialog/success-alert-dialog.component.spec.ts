import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningAlertDialogComponent } from './success-alert-dialog.component';

describe('WarningAlertDialogComponent', () => {
  let component: WarningAlertDialogComponent;
  let fixture: ComponentFixture<WarningAlertDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningAlertDialogComponent]
    });
    fixture = TestBed.createComponent(WarningAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
