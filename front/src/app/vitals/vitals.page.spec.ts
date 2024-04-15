import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VitalsPage } from './vitals.page';

describe('VitalsPage', () => {
  let component: VitalsPage;
  let fixture: ComponentFixture<VitalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
