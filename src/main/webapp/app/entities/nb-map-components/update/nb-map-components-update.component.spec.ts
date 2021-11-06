jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NBMapComponentsService } from '../service/nb-map-components.service';
import { INBMapComponents, NBMapComponents } from '../nb-map-components.model';

import { NBMapComponentsUpdateComponent } from './nb-map-components-update.component';

describe('NBMapComponents Management Update Component', () => {
  let comp: NBMapComponentsUpdateComponent;
  let fixture: ComponentFixture<NBMapComponentsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nBMapComponentsService: NBMapComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapComponentsUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(NBMapComponentsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NBMapComponentsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nBMapComponentsService = TestBed.inject(NBMapComponentsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nBMapComponents: INBMapComponents = { id: 456 };

      activatedRoute.data = of({ nBMapComponents });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(nBMapComponents));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapComponents>>();
      const nBMapComponents = { id: 123 };
      jest.spyOn(nBMapComponentsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapComponents });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nBMapComponents }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(nBMapComponentsService.update).toHaveBeenCalledWith(nBMapComponents);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapComponents>>();
      const nBMapComponents = new NBMapComponents();
      jest.spyOn(nBMapComponentsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapComponents });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nBMapComponents }));
      saveSubject.complete();

      // THEN
      expect(nBMapComponentsService.create).toHaveBeenCalledWith(nBMapComponents);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NBMapComponents>>();
      const nBMapComponents = { id: 123 };
      jest.spyOn(nBMapComponentsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nBMapComponents });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nBMapComponentsService.update).toHaveBeenCalledWith(nBMapComponents);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
