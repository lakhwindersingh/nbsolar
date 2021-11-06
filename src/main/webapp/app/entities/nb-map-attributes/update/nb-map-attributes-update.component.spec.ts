jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NBMapAttributesService } from '../service/nb-map-attributes.service';
import { INBMapAttributes, NBMapAttributes } from '../nb-map-attributes.model';

import { NBMapAttributesUpdateComponent } from './nb-map-attributes-update.component';

describe('NBMapAttributes Management Update Component', () => {
  let comp: NBMapAttributesUpdateComponent;
  let fixture: ComponentFixture<NBMapAttributesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nBMapAttributesService: NBMapAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapAttributesUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(NBMapAttributesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NBMapAttributesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nBMapAttributesService = TestBed.inject(NBMapAttributesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nBMapAttributes: INBMapAttributes = { id: 456 };

      activatedRoute.data = of({ nBMapAttributes });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(nBMapAttributes));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapAttributes>>();
      const nBMapAttributes = { id: 123 };
      jest.spyOn(nBMapAttributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapAttributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nBMapAttributes }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(nBMapAttributesService.update).toHaveBeenCalledWith(nBMapAttributes);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapAttributes>>();
      const nBMapAttributes = new NBMapAttributes();
      jest.spyOn(nBMapAttributesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapAttributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nBMapAttributes }));
      saveSubject.complete();

      // THEN
      expect(nBMapAttributesService.create).toHaveBeenCalledWith(nBMapAttributes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapAttributes>>();
      const nBMapAttributes = { id: 123 };
      jest.spyOn(nBMapAttributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapAttributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nBMapAttributesService.update).toHaveBeenCalledWith(nBMapAttributes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
