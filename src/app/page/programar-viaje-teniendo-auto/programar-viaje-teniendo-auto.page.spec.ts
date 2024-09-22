import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarViajeTeniendoAutoPage } from './programar-viaje-teniendo-auto.page';

describe('ProgramarViajeTeniendoAutoPage', () => {
  let component: ProgramarViajeTeniendoAutoPage;
  let fixture: ComponentFixture<ProgramarViajeTeniendoAutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarViajeTeniendoAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
