import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicecompatabilityComponent } from './devicecompatability.component';

describe('DevicecompatabilityComponent', () => {
  let component: DevicecompatabilityComponent;
  let fixture: ComponentFixture<DevicecompatabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicecompatabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicecompatabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
