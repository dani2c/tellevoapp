import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeNotificaremosPage } from './le-notificaremos.page';

describe('LeNotificaremosPage', () => {
  let component: LeNotificaremosPage;
  let fixture: ComponentFixture<LeNotificaremosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeNotificaremosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
