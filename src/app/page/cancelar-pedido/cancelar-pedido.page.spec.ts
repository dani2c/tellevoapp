import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelarPedidoPage } from './cancelar-pedido.page';

describe('CancelarPedidoPage', () => {
  let component: CancelarPedidoPage;
  let fixture: ComponentFixture<CancelarPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
