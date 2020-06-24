import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCentrosComponent } from './gestionar-centros.component';

describe('GestionarCentrosComponent', () => {
  let component: GestionarCentrosComponent;
  let fixture: ComponentFixture<GestionarCentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCentrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
