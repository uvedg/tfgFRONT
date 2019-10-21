import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerPistaComponent } from './obtener-pista.component';

describe('ObtenerPistaComponent', () => {
  let component: ObtenerPistaComponent;
  let fixture: ComponentFixture<ObtenerPistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerPistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerPistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
