import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesDetailComponent } from './estudiantes-detail.component';

describe('EstudiantesDetailComponent', () => {
  let component: EstudiantesDetailComponent;
  let fixture: ComponentFixture<EstudiantesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
