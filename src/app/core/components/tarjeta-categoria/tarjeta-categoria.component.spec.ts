import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCategoriaComponent } from './tarjeta-categoria.component';

describe('TarjetaCategoriaComponent', () => {
  let component: TarjetaCategoriaComponent;
  let fixture: ComponentFixture<TarjetaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
