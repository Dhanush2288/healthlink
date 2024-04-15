import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryPartnerPage } from './delivery-partner.page';

describe('DeliveryPartnerPage', () => {
  let component: DeliveryPartnerPage;
  let fixture: ComponentFixture<DeliveryPartnerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliveryPartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
