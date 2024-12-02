import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeRetornoPage } from './viaje-retorno.page';

describe('ViajeRegresoPage', () => {
  let component: ViajeRetornoPage;
  let fixture: ComponentFixture<ViajeRetornoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeRetornoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
