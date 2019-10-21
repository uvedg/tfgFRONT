import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPistaComponent } from './mostrar-pista.component';

describe('MostrarPistaComponent', () => {
  let component: MostrarPistaComponent;
  let fixture: ComponentFixture<MostrarPistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarPistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
