import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistradoPage } from './registrado.page';

describe('RegistradoPage', () => {
  let component: RegistradoPage;
  let fixture: ComponentFixture<RegistradoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
