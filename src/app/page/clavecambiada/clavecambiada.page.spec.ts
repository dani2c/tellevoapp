import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClavecambiadaPage } from './clavecambiada.page';

describe('ClavecambiadaPage', () => {
  let component: ClavecambiadaPage;
  let fixture: ComponentFixture<ClavecambiadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClavecambiadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
