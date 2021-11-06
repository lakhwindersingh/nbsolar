import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NBMapAttributesDetailComponent } from './nb-map-attributes-detail.component';

describe('NBMapAttributes Management Detail Component', () => {
  let comp: NBMapAttributesDetailComponent;
  let fixture: ComponentFixture<NBMapAttributesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NBMapAttributesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nBMapAttributes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NBMapAttributesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NBMapAttributesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nBMapAttributes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nBMapAttributes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
