jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';
import { INBMapComponentAttributes, NBMapComponentAttributes } from '../nb-map-component-attributes.model';

import { NBMapComponentAttributesUpdateComponent } from './nb-map-component-attributes-update.component';

describe('NBMapComponentAttributes Management Update Component', () => {
  let comp: NBMapComponentAttributesUpdateComponent;
  let fixture: ComponentFixture<NBMapComponentAttributesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nBMapComponentAttributesService: NBMapComponentAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapComponentAttributesUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(NBMapComponentAttributesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NBMapComponentAttributesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nBMapComponentAttributesService = TestBed.inject(NBMapComponentAttributesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nBMapComponentAttributes: INBMapComponentAttributes = { id: 456 };

      activatedRoute.data = of({ nBMapComponentAttributes });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(nBMapComponentAttributes));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapComponentAttributes>>();
      const nBMapComponentAttributes = { id: 123 };
      jest.spyOn(nBMapComponentAttributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapComponentAttributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nBMapComponentAttributes }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(nBMapComponentAttributesService.update).toHaveBeenCalledWith(nBMapComponentAttributes);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapComponentAttributes>>();
      const nBMapComponentAttributes = new NBMapComponentAttributes();
      jest.spyOn(nBMapComponentAttributesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapComponentAttributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nBMapComponentAttributes }));
      saveSubject.complete();

      // THEN
      expect(nBMapComponentAttributesService.create).toHaveBeenCalledWith(nBMapComponentAttributes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapComponentAttributes>>();
      const nBMapComponentAttributes = { id: 123 };
      jest.spyOn(nBMapComponentAttributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapComponentAttributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nBMapComponentAttributesService.update).toHaveBeenCalledWith(nBMapComponentAttributes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
