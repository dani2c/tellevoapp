import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PidiendoAutoPage } from './pidiendo-auto.page';

describe('PidiendoAutoPage', () => {
  let component: PidiendoAutoPage;
  let fixture: ComponentFixture<PidiendoAutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PidiendoAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
