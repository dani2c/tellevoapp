import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSimulacionPage } from './home-simulacion.page';

describe('HomeSimulacionPage', () => {
  let component: HomeSimulacionPage;
  let fixture: ComponentFixture<HomeSimulacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSimulacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
