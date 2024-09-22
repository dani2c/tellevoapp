import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarViajesDisponiblesPage } from './seleccionar-viajes-disponibles.page';

describe('SeleccionarViajesDisponiblesPage', () => {
  let component: SeleccionarViajesDisponiblesPage;
  let fixture: ComponentFixture<SeleccionarViajesDisponiblesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarViajesDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
