import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNavegadorComponent } from './menu-navegador.component';

describe('MenuNavegadorComponent', () => {
  let component: MenuNavegadorComponent;
  let fixture: ComponentFixture<MenuNavegadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNavegadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNavegadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
