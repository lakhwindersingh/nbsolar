import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NBMapComponentAttributesDetailComponent } from './nb-map-component-attributes-detail.component';

describe('NBMapComponentAttributes Management Detail Component', () => {
  let comp: NBMapComponentAttributesDetailComponent;
  let fixture: ComponentFixture<NBMapComponentAttributesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NBMapComponentAttributesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nBMapComponentAttributes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NBMapComponentAttributesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NBMapComponentAttributesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nBMapComponentAttributes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nBMapComponentAttributes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
