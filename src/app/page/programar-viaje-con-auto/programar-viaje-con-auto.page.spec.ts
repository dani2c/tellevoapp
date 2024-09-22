import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarViajeConAutoPage } from './programar-viaje-con-auto.page';

describe('ProgramarViajeConAutoPage', () => {
  let component: ProgramarViajeConAutoPage;
  let fixture: ComponentFixture<ProgramarViajeConAutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarViajeConAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
