import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeCanceladoPage } from './viaje-cancelado.page';

describe('ViajeCanceladoPage', () => {
  let component: ViajeCanceladoPage;
  let fixture: ComponentFixture<ViajeCanceladoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeCanceladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
