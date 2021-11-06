import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NBMapComponentsDetailComponent } from './nb-map-components-detail.component';

describe('NBMapComponents Management Detail Component', () => {
  let comp: NBMapComponentsDetailComponent;
  let fixture: ComponentFixture<NBMapComponentsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NBMapComponentsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nBMapComponents: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NBMapComponentsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NBMapComponentsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nBMapComponents on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nBMapComponents).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
