import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealizadoPage } from './realizado.page';

describe('RealizadoPage', () => {
  let component: RealizadoPage;
  let fixture: ComponentFixture<RealizadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
