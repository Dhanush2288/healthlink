import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrderPage } from './create-order.page';

describe('CreateOrderPage', () => {
  let component: CreateOrderPage;
  let fixture: ComponentFixture<CreateOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
