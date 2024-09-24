import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoclavePage } from './codigoclave.page';

describe('CodigoclavePage', () => {
  let component: CodigoclavePage;
  let fixture: ComponentFixture<CodigoclavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoclavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
